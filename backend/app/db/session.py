
from sqlalchemy import create_engine

from app.core.config import settings

# For now we use the default SQLALCHEMY URL structure for psycopg2
# postgresql://user:password@postgresserver/db

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# Log database connection attempt (obfuscating password)
if SQLALCHEMY_DATABASE_URL:
    from urllib.parse import urlparse
    parsed = urlparse(SQLALCHEMY_DATABASE_URL)
    obfuscated_url = f"{parsed.scheme}://{parsed.username}:****@{parsed.hostname}:{parsed.port}{parsed.path}"
    print(f"DEBUG: Connecting to database: {obfuscated_url}")

connect_args = {}
if SQLALCHEMY_DATABASE_URL.startswith("postgresql"):
    # SSL is required for Supabase
    connect_args["sslmode"] = "require"
elif SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    connect_args=connect_args
)
from sqlmodel import Session

def get_db():
    with Session(engine) as session:
        yield session
