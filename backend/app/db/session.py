
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
    if "pooler.supabase.com" in SQLALCHEMY_DATABASE_URL and ":5432" in SQLALCHEMY_DATABASE_URL:
        print("⚠️ WARNING: You are using port 5432 with a Supabase Pooler. This often causes timeouts.")
        print("👉 PLEASE CHANGE PORT 5432 TO 6543 IN YOUR DATABASE_URL ENVIRONMENT VARIABLE!")

connect_args = {}
if SQLALCHEMY_DATABASE_URL.startswith("postgresql"):
    # SSL is required for Supabase
    connect_args["sslmode"] = "require"
    # Prevent hanging on connection - increased for production
    connect_args["connect_timeout"] = 20
    # Enable TCP Keepalive for long-lived pool connections
    connect_args["keepalives"] = 1
    connect_args["keepalives_idle"] = 30
    connect_args["keepalives_interval"] = 10
    connect_args["keepalives_count"] = 5
    # detect dead connections faster (30s)
    connect_args["tcp_user_timeout"] = 30000 
elif SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    pool_pre_ping=True,      # Check connection health before use
    pool_recycle=300,        # Recycle connections every 5 mins
    pool_size=10,            # Increased pool size for production
    max_overflow=20,         # Allow more overflow
    connect_args=connect_args
)
from sqlmodel import Session

def get_db():
    with Session(engine) as session:
        yield session
