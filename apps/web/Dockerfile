FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/web ./apps/web
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# Use placeholders for Next.js build-time env vars so they can be replaced at runtime
ENV NEXT_PUBLIC_BACKEND_URL=__NEXT_PUBLIC_BACKEND_URL__
ENV NEXT_PUBLIC_SERVER_URL=__NEXT_PUBLIC_SERVER_URL__
ENV NEXT_PUBLIC_BACKEND_BASE_URL=__NEXT_PUBLIC_BACKEND_BASE_URL__
ENV NEXT_PUBLIC_USE_MOCK=__NEXT_PUBLIC_USE_MOCK__
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL=__NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL__
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL=__NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL__

RUN pnpm --filter @repo/config run build
RUN pnpm --filter @repo/database run generate
RUN pnpm --filter @repo/database run build
RUN pnpm --filter @repo/auth run build
RUN pnpm --filter web run build



FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g dotenv-cli

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY apps/web/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENV PORT=3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["dotenv", "-e", "../.env", "--", "node", "apps/web/server.js"]
