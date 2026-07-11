#!/bin/sh

echo "Injecting runtime environment variables..."

# Replace placeholders with actual environment variables
# We use # as delimiter for sed to avoid issues with slashes in URLs
find /app/apps/mentor/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#http://placeholder.backend.url#${NEXT_PUBLIC_BACKEND_URL}#g" {} +
find /app/apps/mentor/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#http://placeholder.server.url#${NEXT_PUBLIC_SERVER_URL}#g" {} +
find /app/apps/mentor/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#http://placeholder.backend.base.url#${NEXT_PUBLIC_BACKEND_BASE_URL}#g" {} +
find /app/apps/mentor/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#false_placeholder#${NEXT_PUBLIC_USE_MOCK}#g" {} +
find /app/apps/mentor/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#http://placeholder.betterauth.callback.url#${NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL}#g" {} +
find /app/apps/mentor/.next -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s#http://placeholder.betterauth.server.url#${NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL}#g" {} +

echo "Starting Next.js..."
exec "$@"
