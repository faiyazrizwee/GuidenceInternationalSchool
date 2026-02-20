from typing import Optional
from pydantic import BaseModel

class StaffBase(BaseModel):
    name: str
    role: str
    qualification: Optional[str] = None
    experience: Optional[str] = None
    students_handled: Optional[str] = None
    image_url: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    is_active: bool = True

class StaffCreate(StaffBase):
    pass

class StaffUpdate(StaffBase):
    name: Optional[str] = None
    role: Optional[str] = None
    qualification: Optional[str] = None
    experience: Optional[str] = None
    students_handled: Optional[str] = None
    image_url: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    is_active: Optional[bool] = None

class StaffRead(StaffBase):
    id: int
