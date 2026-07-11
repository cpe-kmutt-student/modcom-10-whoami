FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/mentor ./apps/mentor
COPY packages ./packages

RUN pnpm install --frozen-lockfile

# Use placeholders for Next.js build-time env vars so they can be replaced at runtime
ENV NEXT_PUBLIC_BACKEND_URL=http://placeholder.backend.url
ENV NEXT_PUBLIC_SERVER_URL=http://placeholder.server.url
ENV NEXT_PUBLIC_BACKEND_BASE_URL=http://placeholder.backend.base.url
ENV NEXT_PUBLIC_USE_MOCK=false_placeholder
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL=http://placeholder.betterauth.callback.url
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL=http://placeholder.betterauth.server.url

RUN pnpm --filter @repo/config run build
RUN pnpm --filter @repo/database run generate
RUN pnpm --filter @repo/database run build
RUN pnpm --filter @repo/auth run build
RUN pnpm --filter mentor run build



FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g dotenv-cli 

COPY --from=builder /app/apps/mentor/.next/standalone ./
COPY --from=builder /app/apps/mentor/.next/static ./apps/mentor/.next/static
COPY --from=builder /app/apps/mentor/public ./apps/mentor/public
COPY apps/mentor/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENV PORT=3005

ENTRYPOINT ["./entrypoint.sh"]
CMD ["dotenv", "-e", "../.env", "--", "node", "apps/mentor/server.js"]
