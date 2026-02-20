
from typing import List
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
    _DATABASE_URL: str | None = None

    @property
    def DATABASE_URL(self) -> str:
        if self._DATABASE_URL:
            # SQLAlchemy requires postgresql:// instead of postgres://
            if self._DATABASE_URL.startswith("postgres://"):
                return self._DATABASE_URL.replace("postgres://", "postgresql://", 1)
            return self._DATABASE_URL
        return f"sqlite:///./sql_app.db"

    @DATABASE_URL.setter
    def DATABASE_URL(self, value: str):
        self._DATABASE_URL = value

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
