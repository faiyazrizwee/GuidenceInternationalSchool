from sqlalchemy import Column, String, Boolean
from typing import Optional
from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    __tablename__ = "user"
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(sa_column=Column("username", String, index=True, unique=True))
    hashed_password: str = Field(sa_column=Column("hashed_password", String))
    is_active: bool = Field(default=True, sa_column=Column("is_active", Boolean))
    is_superuser: bool = Field(default=False, sa_column=Column("is_superuser", Boolean))
