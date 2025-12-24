ARG NODE_VERSION=20-bookworm-slim

FROM node:${NODE_VERSION} AS build
WORKDIR /app

# Keep memory usage predictable on small machines; override via build args if needed.
ARG NODE_OPTIONS=--max-old-space-size=512
ENV NODE_OPTIONS=${NODE_OPTIONS}

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:${NODE_VERSION} AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
