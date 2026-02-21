# Syntax=docker/dockerfile:1
# --- Stage 1: Frontend Build ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
RUN apk add --no-cache libc6-compat

# Install dependencies based on preferred package manager
COPY frontend/package*.json ./
RUN npm ci

# Build the app
COPY frontend .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# --- Stage 2: Final Runtime ---
FROM python:3.11-slim AS runtime

# Install Node.js runtime and production essentials
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Setup Security: Create non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -s /bin/sh -m appuser

# Setup Backend
ENV VIRTUAL_ENV=/app/backend/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r ./backend/requirements.txt
COPY backend ./backend

# Setup Frontend (Standalone mode)
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy standalone output and static assets
COPY --from=frontend-builder /app/frontend/.next/standalone ./frontend
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/.next/static ./frontend/.next/static

# Permissions
RUN chown -R appuser:nodejs /app
USER appuser

# Environment defaults
ENV PORT 10000
ENV DATABASE_URL=""
EXPOSE 10000

# Entrypoint
COPY --chown=appuser:nodejs entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
