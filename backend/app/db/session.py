
from sqlalchemy import create_engine

from app.core.config import settings

# For now we use the default SQLALCHEMY URL structure for psycopg2
# postgresql://user:password@postgresserver/db

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# Log database connection attempt (obfuscating password)
if SQLALCHEMY_DATABASE_URL:
    from urllib.parse import urlparse
    parsed = urlparse(SQLALCHEMY_DATABASE_URL)
    
    # PERMANENT PRODUCTION FIX: Auto-switch Supabase pooler to port 6543
    # Port 5432 (direct/session) often times out on Render. Port 6543 (transaction) is more stable.
    if parsed.hostname and "pooler.supabase.com" in parsed.hostname and (parsed.port == 5432 or parsed.port is None):
        print("🔧 AUTO-CORRECT: Switching Supabase port from 5432 to 6543 for better stability.")
        # Manual replacement to ensure we don't mess up the rest of the URL
        if ":5432" in SQLALCHEMY_DATABASE_URL:
            SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(":5432", ":6543")
        else:
            # If no port specified, insert 6543
            domain = parsed.hostname
            SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(domain, f"{domain}:6543")
        parsed = urlparse(SQLALCHEMY_DATABASE_URL)

    obfuscated_url = f"{parsed.scheme}://{parsed.username}:****@{parsed.hostname}:{parsed.port}{parsed.path}"
    print(f"DEBUG: Connecting to database: {obfuscated_url}")

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
