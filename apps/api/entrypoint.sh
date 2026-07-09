#!/bin/sh
set -e

echo "Running Database Migrations..."
pnpm --filter @repo/database run db:migrate:deploy

# echo "Generating Prisma Client..."
# pnpm --filter @repo/database run generate

echo "Starting API..."
exec "$@"
