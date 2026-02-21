from typing import Optional
from sqlalchemy import Column, String
from sqlmodel import Field, SQLModel

class FeeStructure(SQLModel, table=True):
    __tablename__ = "feestructure"
    id: Optional[int] = Field(default=None, primary_key=True)
    class_group: str = Field(sa_column=Column("class_group", String))
    registration_fee: str
    admission_fee: str
    annual_charges: str
    tuition_fee: str
    erp_fee: str
    tuition_total: Optional[str] = None
    exam_fee: Optional[str] = None
    total_fee: Optional[str] = None
    description: Optional[str] = None
