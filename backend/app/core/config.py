
from typing import List
from pydantic import validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Guidance International School API"
    BACKEND_CORS_ORIGINS: List[str] | str = [
        "http://localhost:3000",
        "http://localhost:8000",
    ]

    # Database
    POSTGRES_SERVER: str = "db"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "app"
    DATABASE_URL: str

    @validator("DATABASE_URL", pre=True)
    def fix_postgres_protocol(cls, v):
        if v and isinstance(v, str) and v.startswith("postgres://"):
            return v.replace("postgres://", "postgresql://", 1)
        return v

    # Email
    MAIL_USERNAME: str | None = None
    MAIL_PASSWORD: str | None = None
    MAIL_FROM: str | None = None
    MAIL_PORT: int = 587
    MAIL_SERVER: str | None = None
    MAIL_FROM_NAME: str = "Guidance International School"
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
