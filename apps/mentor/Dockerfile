FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/mentor ./apps/mentor
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# Use placeholder values at build time so Next.js can compile.
# Real values are injected at runtime via entrypoint.sh.
# Use the variable name itself as the build-time placeholder.
# The entrypoint will replace these names with real values at runtime.
ENV NEXT_PUBLIC_BACKEND_URL="NEXT_PUBLIC_BACKEND_URL"
ENV NEXT_PUBLIC_SERVER_URL="NEXT_PUBLIC_SERVER_URL"
ENV NEXT_PUBLIC_BACKEND_BASE_URL="NEXT_PUBLIC_BACKEND_BASE_URL"
ENV NEXT_PUBLIC_USE_MOCK="NEXT_PUBLIC_USE_MOCK"
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL="NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL"
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL="NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL"

RUN pnpm --filter @repo/config run build
RUN pnpm --filter @repo/database run generate
RUN pnpm --filter @repo/database run build
RUN pnpm --filter @repo/auth run build
RUN pnpm --filter mentor run build



FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/mentor/.next/standalone ./
COPY --from=builder /app/apps/mentor/.next/static ./apps/mentor/.next/static
COPY --from=builder /app/apps/mentor/public ./apps/mentor/public

COPY apps/mentor/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV PORT=3005

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "apps/mentor/server.js"]
