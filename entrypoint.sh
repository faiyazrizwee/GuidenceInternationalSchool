#!/bin/bash

# Replace ${PORT} with the actual PORT environment variable in nginx config
# Using sed to be safe as envsubst might not be available or might replace too much
sed -i "s/\${PORT}/${PORT:-10000}/g" /etc/nginx/conf.d/default.conf

echo "Starting Backend on port 8000..."
cd /app/backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 &

echo "Starting Frontend on port 3000..."
cd /app/frontend
# Next.js standalone server runs on 3000 by default
HOSTNAME="0.0.0.0" PORT=3000 node server.js &

echo "Starting Nginx on port ${PORT}..."
# Nginx will proxy to 8000 (backend) and 3000 (frontend)
nginx -g "daemon off;"
