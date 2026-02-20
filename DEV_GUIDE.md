# Development Guide

Your project uses **Next.js** (Frontend) and **FastAPI** (Backend).

**Since `docker` command was not found on your system, please use the Manual Setup below.**

## Manual Setup (Recommended)

### 1. Frontend Setup (Next.js)

The frontend is likely already running if you executed `npm run dev`.

```bash
cd frontend
npm install
npm run dev
```

- Access at: [http://localhost:3000](http://localhost:3000)

### 2. Backend Setup (FastAPI + SQLite)

This will use a local SQLite database file, so you don't need to install a database server.

**Open a new terminal** and run:

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

- Backend API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- The app will automatically create a `sql_app.db` file in the backend folder.

---

## Docker Setup (Requires Docker)

_Note: You attempted to use this but `docker` is seemingly missing or not in PATH. If you install `docker` later, you can use these steps._

1.  **Start Backend & DB:**

    ```bash
    # Try the modern command first:
    docker compose up --build

    # Or the legacy command if installed:
    docker-compose up --build
    ```
