FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/mentor ./apps/mentor
COPY packages ./packages

RUN pnpm install --frozen-lockfile

ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL="https://whoami-mentor.cpesu.com/profile"
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL="https://whoami-api.cpesu.com/api/auth"
ENV NEXT_PUBLIC_BACKEND_BASE_URL="https://whoami-api.cpesu.com"
ENV NEXT_PUBLIC_USE_MOCK="false"
ENV NEXT_PUBLIC_BACKEND_URL="https://whoami-api.cpesu.com/api/auth"
ENV NEXT_PUBLIC_SERVER_URL="https://whoami.cpesu.com"

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
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_CALLBACK_URL="https://whoami-mentor.cpesu.com/profile"
ENV NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL="https://whoami-api.cpesu.com/api/auth"
ENV NEXT_PUBLIC_BACKEND_BASE_URL="https://whoami-api.cpesu.com"
ENV NEXT_PUBLIC_USE_MOCK="false"
ENV NEXT_PUBLIC_BACKEND_URL="https://whoami-api.cpesu.com/api/auth"
ENV NEXT_PUBLIC_SERVER_URL="https://whoami.cpesu.com"

ENV PORT=3005

CMD ["node", "apps/mentor/server.js"]
