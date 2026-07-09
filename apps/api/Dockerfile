FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/api ./apps/api
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# Build the environment 
# will move to entrypoint package and API
RUN pnpm --filter @repo/config run build
RUN pnpm --filter @repo/database run generate
RUN pnpm --filter @repo/database run build
RUN pnpm --filter @repo/auth run build
RUN pnpm --filter @repo/storage run build
RUN pnpm --filter @repo/email run build
RUN pnpm --filter api run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# For run entrypoint
RUN corepack enable

# Copy necessary files for NestJS
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/api ./apps/api

ENTRYPOINT ["/app/apps/api/entrypoint.sh"]
CMD ["node", "apps/api/dist/main"]
