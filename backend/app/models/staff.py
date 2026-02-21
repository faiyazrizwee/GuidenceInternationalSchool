from typing import Optional
from sqlmodel import Field, SQLModel

class StaffMember(SQLModel, table=True):
    __tablename__ = "staffmember"
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    role: str
    qualification: Optional[str] = None
    experience: Optional[str] = None
    students_handled: Optional[str] = None
    image_url: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    is_active: bool = True
