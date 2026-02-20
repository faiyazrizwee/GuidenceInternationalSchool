
from sqlalchemy import create_engine

from app.core.config import settings

# For now we use the default SQLALCHEMY URL structure for psycopg2
# postgresql://user:password@postgresserver/db

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

connect_args = {}
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    pool_pre_ping=True,
    connect_args=connect_args
)
from sqlmodel import Session

def get_db():
    with Session(engine) as session:
        yield session
