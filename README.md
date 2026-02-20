# Guidance International School

A modern, responsive school website and administrative dashboard built with **Next.js**, **FastAPI**, and **SQLite/PostgreSQL**.

## 🌟 Features

- **Public Website**: Information about the school, vision, principles, and academic goals.
- **Mandatory Disclosure**: Structured presentation of school information (Teaching Staff, Infrastructure, etc.) as per regulatory requirements.
- **Staff Directory**: Categorized list of teaching and non-teaching staff.
- **Academic Information**: Academic calendar, year plans, and fee structures.
- **Forms**: Online Admission and Contact forms with administrative review capabilities.
- **Admin Dashboard**: Secure management of announcements, staff, gallery, fees, and more.
- **Newsletter**: Subscription system with email broadcasting (configurable).

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Vanilla CSS & Tailwind CSS (for admin)
- **State Management**: React Hooks
- **Icons**: Font Awesome

### Backend

- **Framework**: FastAPI (Python)
- **Database**: SQLite (Default) / PostgreSQL (Supported)
- **Data Modeling**: SQLModel (SQLAlchemy + Pydantic)
- **Deployment**: Render (Blueprint support)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

_API docs available at: http://localhost:8000/docs_

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

_Website available at: http://localhost:3000_

---

## 🌐 Deployment

### Hosting on Render (Recommended)

This project is pre-configured for **Render** using the [render.yaml](render.yaml) blueprint.

1. Push your code to GitHub.
2. Go to Render Dashboard -> New -> Blueprint.
3. Select your repository.
4. Render will automatically provision:
   - **Web Service** for the FastAPI backend.
   - **Persistent Disk** (1GB) for your SQLite database.
   - **Static Site** for the Next.js frontend.

For more details, see the [Hosting Guide](.agent/workflows/host-on-render.md).

---

## 📁 Project Structure

```text
├── backend/            # FastAPI application
│   ├── app/
│   │   ├── api/        # Endpoint routes
│   │   ├── core/       # Configuration & Security
│   │   ├── db/         # Session & Initial Data
│   │   └── models/     # SQLModel classes
│   └── sql_app.db      # Local SQLite database (git-ignored)
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/        # Pages & Routing
│   │   ├── components/ # React Components
│   │   └── config.ts   # Centralized API configuration
│   └── public/         # Static Assets (Images, PDFs)
└── render.yaml         # Render Deployment Blueprint
```

## 🔐 Environment Variables

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_URL`: Backend API endpoint (default: http://localhost:8000/api/v1)

### Backend (`backend/.env`)

- `SECRET_KEY`: Used for JWT authentication
- `BACKEND_CORS_ORIGINS`: Allowed origins for API access

---

## � Credits

Developed for **Guidance International School**.
Managed by **Mahandeo Technologies**.
# GuidenceInternationalSchool
