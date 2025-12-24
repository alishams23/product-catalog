ARG NODE_VERSION=22.14.0-alpine

FROM docker.arvancloud.ir/node:${NODE_VERSION} AS build
WORKDIR /app

# Keep memory usage predictable on small machines; override via build args if needed.
ARG NODE_OPTIONS=--max-old-space-size=1024
ENV NODE_OPTIONS=${NODE_OPTIONS}

# Avoid downloading fonts during build; set to 1 to re-enable.
ARG NUXT_FONTS_DOWNLOAD=0
ENV NUXT_FONTS_DOWNLOAD=${NUXT_FONTS_DOWNLOAD}

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

FROM docker.arvancloud.ir/node:${NODE_VERSION} AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
