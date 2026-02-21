#!/bin/bash

# Production Entrypoint for Full-stack Container
# Manages FastAPI (Uvicorn) and Next.js processes

# Handle termination signals
cleanup() {
    echo "Shutting down..."
    kill -TERM "$BACKEND_PID" 2>/dev/null
    kill -TERM "$FRONTEND_PID" 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

echo "--- Starting Services ---"

# 1. Start Backend (FastAPI)
BACKEND_PORT=8000
echo "🚀 Starting Backend on 0.0.0.0:${BACKEND_PORT}..."
cd /app/backend
uvicorn app.main:app --host 0.0.0.0 --port ${BACKEND_PORT} --proxy-headers --forwarded-allow-ips='*' &
BACKEND_PID=$!

# Wait briefly for backend to start up - reduced for faster port binding
echo "⏳ Waiting for backend to bind port..."
sleep 2

# 2. Start Frontend (Next.js)
# Render provides the port in the PORT environment variable (default 10000)
# Next.js standalone server.js respects the PORT env var.
FINAL_PORT=${PORT:-10000}
echo "🚀 Starting Frontend on 0.0.0.0:${FINAL_PORT}..."
cd /app/frontend
export PORT=$FINAL_PORT
export HOSTNAME="0.0.0.0"
node server.js &
FRONTEND_PID=$!

echo "✅ Services are running. Monitoring..."

# Wait for processes
wait "$BACKEND_PID" "$FRONTEND_PID"
