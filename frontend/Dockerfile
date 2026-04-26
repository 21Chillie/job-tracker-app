# /frontend/Dockerfile

FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Expose Vite variable to the build process
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN bun run build

# Stage 3: Production runner
FROM base AS runner
ENV NODE_ENV=production

# Install only production dependencies to keep the image small
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY --from=builder /app/build ./build

# Run as a non-root user for security
USER bun

EXPOSE 3000
CMD ["bun", "run", "start"]
