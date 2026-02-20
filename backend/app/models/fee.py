from typing import Optional
from sqlmodel import Field, SQLModel

class FeeStructure(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    class_group: str  # e.g. "Nursery - KG"
    registration_fee: str
    admission_fee: str
    annual_charges: str
    tuition_fee: str
    erp_fee: str
    tuition_total: str
    exam_fee: str
    total_fee: str
    description: Optional[str] = None
