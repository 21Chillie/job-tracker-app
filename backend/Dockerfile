# /backend/Dockerfile
FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# Stage 1: Install ALL dependencies (needed for Bun to execute TS files)
FROM base AS deps
COPY package.json bun.lock ./
# Remove --production to ensure Hono and TS utilities are available
RUN bun install --frozen-lockfile

# Stage 2: Production runner
FROM base AS release
# Copy the full node_modules
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure the database directory exists and has correct permissions for the 'bun' user
# Only needed if you are using SQLite/Local file storage
USER root
RUN mkdir -p /app/data && chown -R bun:bun /app/data
USER bun

EXPOSE 3001

# Using bun to run the TS file directly is fine with the full node_modules
CMD ["bun", "run", "src/index.ts"]
