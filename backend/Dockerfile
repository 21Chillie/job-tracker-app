# Stage 1: Install only production dependencies
FROM oven/bun:1.3-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Stage 2: Final runner image (minimizes final image size)
FROM oven/bun:1.3-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy pre-installed node_modules from the 'deps' stage
COPY --from=deps --chown=bun:bun /app/node_modules ./node_modules
# Copy source and config files; chown ensures the 'bun' user can access them
COPY --chown=bun:bun package.json bun.lock tsconfig.json ./
COPY --chown=bun:bun src ./src

# Create log directory and set ownership before switching to non-root user
RUN mkdir -p /app/logs /app/src/db && chown -R bun:bun /app

# Security: run the process as the built-in 'bun' user (not root)
USER bun
EXPOSE 3001
CMD ["bun", "run", "src/index.ts"]
