
from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel

class ContactSubmission(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

class AdmissionSubmission(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    student_name: str
    date_of_birth: str  # Storing as string for simplicity, or could use date
    grade_applying_for: str
    parent_name: str
    contact_number: str
    email: Optional[str] = None
    address: str
    previous_school: Optional[str] = None
    status: str = Field(default="pending") # pending, reviewed, accepted, rejected
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
