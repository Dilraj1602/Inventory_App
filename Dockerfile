# Use Node.js 16 as base image (more stable for React 18)
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files for frontend and backend
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Remove existing lock files and install dependencies with legacy peer deps
RUN cd backend && rm -f package-lock.json && npm cache clean --force && npm install --legacy-peer-deps
RUN cd frontend && rm -f package-lock.json && npm cache clean --force && npm install --legacy-peer-deps

# Copy source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Update browserslist database and build frontend with proper environment
RUN cd frontend && \
    npx update-browserslist-db@latest && \
    GENERATE_SOURCEMAP=false CI=false npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

# Copy built frontend and backend
COPY --from=builder /app/frontend/build ./frontend/build
COPY --from=builder /app/backend ./backend

# Install only production dependencies for backend
RUN cd backend && npm install --only=production --legacy-peer-deps

# Create start script with proper Unix line endings
RUN printf '#!/bin/sh\ncd backend && npm start\n' > /app/start.sh && chmod +x /app/start.sh

# Expose ports
EXPOSE 3000 5000

# Default command
CMD ["/app/start.sh"] 