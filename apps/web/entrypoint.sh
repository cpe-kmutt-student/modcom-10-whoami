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
# At build time, each variable is set to its own name as the placeholder
# (e.g. NEXT_PUBLIC_BACKEND_URL="NEXT_PUBLIC_BACKEND_URL").
# At runtime, we read every NEXT_PUBLIC_* env var and replace that name
# with the real value inside the compiled Next.js output.
#
# To add a new variable: just add it in the Dockerfile as
#   ENV NEXT_PUBLIC_SOMETHING="NEXT_PUBLIC_SOMETHING"
# and pass the real value at runtime — nothing else needs to change here.
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

  echo "  Replacing: $key"
  find "$NEXT_DIR" -type f \( -name '*.js' -o -name '*.html' \) \
    -exec sed -i "s#${key}#${value}#g" {} +
done

echo "Environment injection complete."
echo "Starting Next.js..."
exec "$@"
