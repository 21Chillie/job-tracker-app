# Stage 1: Install all dependencies (including dev tools for building)
FROM oven/bun:1.3-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build the frontend assets
FROM deps AS build
WORKDIR /app
COPY . .
# ARG is required here to bake the Backend URL into the JS bundle during build
ARG VITE_BACKEND_URL=http://localhost:3001
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN bun run build

# Stage 3: Install only production dependencies (reduces final image size)
FROM oven/bun:1.3-alpine AS prod-deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Stage 4: Production runner
FROM oven/bun:1.3-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install Node.js: React Router 7's 'serve' CLI requires a Node runtime to execute
RUN apk add --no-cache nodejs

# Copy only the minimal files needed to run the app
COPY --from=prod-deps --chown=bun:bun /app/node_modules ./node_modules
COPY --from=build --chown=bun:bun /app/build ./build
COPY --from=build --chown=bun:bun /app/package.json ./package.json

USER bun
EXPOSE 3000
# Run using the React Router CLI handler
CMD ["./node_modules/.bin/react-router-serve", "./build/server/index.js"]
