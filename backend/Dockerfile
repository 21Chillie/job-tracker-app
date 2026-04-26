# /backend/Dockerfile

FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Stage 2: Production runner
FROM base AS release
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Run as a non-root user for security
USER bun

EXPOSE 3001
# Adjust 'src/index.ts' to your actual Hono entry point
CMD ["bun", "run", "src/index.ts"]
