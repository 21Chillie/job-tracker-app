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
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN bun run build

# Stage 3: Production runner - minimal
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Only install react-router for the serve binary
RUN npm install -g @react-router/serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["react-router-serve", "./build/server/index.js"]
