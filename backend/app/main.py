
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.api import api_router
print("DATABASE_URL =", settings.DATABASE_URL)
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
def on_startup():
    from sqlmodel import SQLModel, Session
    from app.db.session import engine
    from app import models # Import models to register them with SQLModel
    from app.db.init_db import init_db
    
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        init_db(session)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    # If using "*", credentials cannot be True in FastAPI
    allow_origins = [str(origin) for origin in settings.BACKEND_CORS_ORIGINS]
    allow_credentials = True
    if "*" in allow_origins:
        allow_credentials = False
        
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allow_origins,
        allow_credentials=allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get("/api/v1/debug/tables")
def debug_tables():
    from sqlalchemy import inspect
    from app.db.session import engine
    inspector = inspect(engine)
    tables = {}
    for table_name in inspector.get_table_names():
        columns = [c["name"] for c in inspector.get_columns(table_name)]
        tables[table_name] = columns
    return {"tables": tables}

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Welcome to Guidance International School API"}
