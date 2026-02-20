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

echo "--- Initializing Database ---"
cd /app/backend
# Initialize database tables if they don't exist
python3 -m app.db.init_db
if [ $? -ne 0 ]; then
    echo "❌ Database initialization failed. Continuing anyway..."
fi

echo "--- Starting Services ---"

# 1. Start Backend (FastAPI)
echo "Starting Backend on 0.0.0.0:8000..."
cd /app/backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 2. Start Frontend (Next.js)
echo "Starting Frontend on 0.0.0.0:${PORT:-3000}..."
cd /app/frontend
# Next.js standalone server handles the PORT env var automatically
# But we ensure it's bound to 0.0.0.0
HOSTNAME="0.0.0.0" node server.js &
FRONTEND_PID=$!

echo "--- Services are running ---"

# Wait for processes
wait "$BACKEND_PID" "$FRONTEND_PID"
