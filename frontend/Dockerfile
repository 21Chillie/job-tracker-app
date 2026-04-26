# /frontend/Dockerfile
FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# Stage 1: Install dependencies
FROM base AS deps
COPY package.json bun.lock ./ 
# Note: Use bun.lockb if that's what your project has
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
# Copy everything including the node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# CRITICAL: These must be here for 'bun run build' to bake them in
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN bun run build

# Stage 3: Production runner
# We stick with Bun for the runner to keep it consistent and fast
FROM oven/bun:1.3-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary build output and package file
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# React Router 7 typically uses its own server handler
# If you are using the default RR7 template, it runs via bun/node on the server build
EXPOSE 3000

# Using bun to run the production server
CMD ["bun", "run", "start"]
