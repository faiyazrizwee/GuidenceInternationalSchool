from typing import Optional
from pydantic import BaseModel

class FeeBase(BaseModel):
    class_group: str
    registration_fee: str
    admission_fee: str
    annual_charges: str
    tuition_fee: str
    erp_fee: str
    tuition_total: str
    exam_fee: str
    total_fee: str
    description: Optional[str] = None

class FeeCreate(FeeBase):
    pass

class FeeUpdate(FeeBase):
    class_group: Optional[str] = None
    registration_fee: Optional[str] = None
    admission_fee: Optional[str] = None
    annual_charges: Optional[str] = None
    tuition_fee: Optional[str] = None
    erp_fee: Optional[str] = None
    tuition_total: Optional[str] = None
    exam_fee: Optional[str] = None
    total_fee: Optional[str] = None
    description: Optional[str] = None

class FeeRead(FeeBase):
    id: int
