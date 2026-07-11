#!/bin/sh

echo "Injecting runtime environment variables..."

# Replace placeholders with actual environment variables
# We use # as delimiter for sed to avoid issues with slashes in URLs
find /app/apps/web/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#__NEXT_PUBLIC_BACKEND_URL__#${NEXT_PUBLIC_BACKEND_URL}#g" {} +
find /app/apps/web/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#__NEXT_PUBLIC_SERVER_URL__#${NEXT_PUBLIC_SERVER_URL}#g" {} +
find /app/apps/web/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#__NEXT_PUBLIC_BACKEND_BASE_URL__#${NEXT_PUBLIC_BACKEND_BASE_URL}#g" {} +
find /app/apps/web/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#__NEXT_PUBLIC_USE_MOCK__#${NEXT_PUBLIC_USE_MOCK}#g" {} +
find /app/apps/web/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#__NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL__#${NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL}#g" {} +
find /app/apps/web/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#__NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL__#${NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL}#g" {} +

echo "Starting Next.js..."
exec "$@"
