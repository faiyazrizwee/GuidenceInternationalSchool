# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
# Ensure Next.js output is standalone
RUN npm run build

# Stage 2: Build Backend & Runtime
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    gettext-base \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Setup Backend
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r ./backend/requirements.txt
COPY backend ./backend

# Setup Frontend (Standalone)
# Next.js standalone output is in .next/standalone
COPY --from=frontend-builder /app/frontend/.next/standalone ./frontend
COPY --from=frontend-builder /app/frontend/public ./frontend/public
COPY --from=frontend-builder /app/frontend/.next/static ./frontend/.next/static

# Note: standalone output structure can be tricky. 
# Usually, it's .next/standalone/server.js
# And we need to copy public and static into the right places within the standalone folder.
# The copy above assumes we are in /app and frontend is /app/frontend.

# Nginx config
COPY nginx.conf.template /etc/nginx/conf.d/default.conf

# Entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Create data directory for SQLite
RUN mkdir -p /data && chmod 777 /data

# Default environment variables
ENV PORT=10000
ENV DATABASE_URL=sqlite:////data/sql_app.db
EXPOSE 10000

CMD ["/app/entrypoint.sh"]
