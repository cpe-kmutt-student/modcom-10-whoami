FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/web ./apps/web
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# Build-time placeholders: each value is a valid URL derived from the variable name.
# Format: http://placeholder-<lowercased-hyphenated-keyname>.invalid
# - Valid URL → passes URL validation in libraries like BetterAuth at prerender time.
# - .invalid TLD is reserved (RFC 2606) — can never be a real URL.
# - The entrypoint re-derives this same string from the key name at runtime
#   and replaces it with the real value automatically.
# To add a new variable: add one ENV line here following the same pattern.
ENV NEXT_PUBLIC_BACKEND_URL="http://placeholder-next-public-backend-url.invalid"
ENV NEXT_PUBLIC_SERVER_URL="http://placeholder-next-public-server-url.invalid"
ENV NEXT_PUBLIC_BACKEND_BASE_URL="http://placeholder-next-public-backend-base-url.invalid"
ENV NEXT_PUBLIC_USE_MOCK="http://placeholder-next-public-use-mock.invalid"
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL="http://placeholder-next-public-mentor-betterauth-callback-url.invalid"
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL="http://placeholder-next-public-mentor-betterauth-server-url.invalid"
ENV NEXT_PUBLIC_MICROSOFT_CLARITY="http://placeholder-next-public-microsoft-clarity.invalid"

ENV NEXT_PUBLIC_UMAMI_URL="http://placeholder-next-public-umami-url.invalid"
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID="http://placeholder-next-public-umami-website-id.invalid"

RUN pnpm --filter @repo/config run build
RUN pnpm --filter @repo/storage run build
RUN pnpm --filter @repo/database run generate
RUN pnpm --filter @repo/database run build
RUN pnpm --filter @repo/redis run build
RUN pnpm --filter @repo/auth run build
RUN pnpm --filter web run build



FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

COPY apps/web/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV PORT=3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "apps/web/server.js"]
