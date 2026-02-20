
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

# Contact Schemas
class ContactSubmissionBase(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

class ContactSubmissionCreate(ContactSubmissionBase):
    pass

class ContactSubmissionRead(ContactSubmissionBase):
    id: int
    submitted_at: datetime

# Admission Schemas
class AdmissionSubmissionBase(BaseModel):
    student_name: str
    date_of_birth: str
    grade_applying_for: str
    parent_name: str
    contact_number: str
    email: Optional[EmailStr] = None
    address: str
    previous_school: Optional[str] = None

class AdmissionSubmissionCreate(AdmissionSubmissionBase):
    pass

class AdmissionSubmissionRead(AdmissionSubmissionBase):
    id: int
    status: str
    submitted_at: datetime
