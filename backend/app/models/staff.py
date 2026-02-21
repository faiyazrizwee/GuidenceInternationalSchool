from sqlalchemy import Column, String, Boolean
from typing import Optional
from sqlmodel import Field, SQLModel

class StaffMember(SQLModel, table=True):
    __tablename__ = "staffmember"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column("name", String))
    role: str = Field(sa_column=Column("role", String))
    qualification: Optional[str] = Field(default=None, sa_column=Column("qualification", String, nullable=True))
    experience: Optional[str] = Field(default=None, sa_column=Column("experience", String, nullable=True))
    students_handled: Optional[str] = Field(default=None, sa_column=Column("students_handled", String, nullable=True))
    image_url: Optional[str] = Field(default=None, sa_column=Column("image_url", String, nullable=True))
    phone: Optional[str] = Field(default=None, sa_column=Column("phone", String, nullable=True))
    email: Optional[str] = Field(default=None, sa_column=Column("email", String, nullable=True))
    is_active: bool = Field(default=True, sa_column=Column("is_active", Boolean))
