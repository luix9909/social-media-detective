# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build frontend
COPY client ./client
WORKDIR /app/client
RUN npm ci && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install Playwright system dependencies
RUN apk add --no-cache \
    chromium \
    firefox \
    noto-fonts \
    ttf-dejavu \
    freetype \
    harfbuzz \
    ca-certificates

# Install Node.js dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built frontend
COPY --from=builder /app/client/build ./client/build

# Copy backend
COPY server ./server
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 5000

CMD ["npm", "start"]
