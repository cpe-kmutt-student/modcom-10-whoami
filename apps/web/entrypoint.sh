#!/bin/sh

echo "Injecting runtime environment variables..."

# ---------------------------------------------------------------------------
# Load a .env file from the host-mounted path if it exists.
# Mount your env file into the container as /run/secrets/app.env
# e.g. in docker-compose:
#   volumes:
#     - /path/on/host/web.env:/run/secrets/app.env:ro
# ---------------------------------------------------------------------------
ENV_FILE="/run/secrets/app.env"
if [ -f "$ENV_FILE" ]; then
  echo "Loading environment from $ENV_FILE"
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
else
  echo "No env file found at $ENV_FILE — using container environment variables."
fi

# ---------------------------------------------------------------------------
# Auto-replace all NEXT_PUBLIC_* placeholders.
#
# At build time (Dockerfile), each variable is set to a valid placeholder URL
# derived from its own name, e.g.:
#   NEXT_PUBLIC_BACKEND_URL="http://placeholder-next-public-backend-url.invalid"
#
# This ensures libraries that validate URLs at build time (e.g. BetterAuth)
# don't crash during Next.js static page prerendering.
#
# At runtime, we re-derive the same placeholder from the key name and replace
# it with the real value — fully automatic, no hardcoded mappings needed.
#
# To add a new variable: just add it in the Dockerfile as:
#   ENV NEXT_PUBLIC_SOMETHING="http://placeholder-next-public-something.invalid"
# and pass the real value at runtime — nothing here needs to change.
# ---------------------------------------------------------------------------
NEXT_DIR="/app/apps/web/.next"

echo "Scanning for NEXT_PUBLIC_* variables..."

env | grep '^NEXT_PUBLIC_' | while read -r line; do
  key="${line%%=*}"          # everything before the first '='
  value="${line#*=}"         # everything after the first '='

  if [ -z "$value" ]; then
    echo "  WARNING: $key is empty — skipping."
    continue
  fi

  # Derive the same placeholder that was set in the Dockerfile:
  # NEXT_PUBLIC_BACKEND_URL -> http://placeholder-next-public-backend-url.invalid
  placeholder="http://placeholder-$(echo "$key" | tr '[:upper:]_' '[:lower:]-').invalid"

  echo "  Replacing: $key"
  find "$NEXT_DIR" -type f \( -name '*.js' -o -name '*.html' \) \
    -exec sed -i "s#${placeholder}#${value}#g" {} +
done

echo "Environment injection complete."
echo "Starting Next.js..."
exec "$@"
