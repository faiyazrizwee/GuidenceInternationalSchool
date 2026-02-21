from typing import Optional
from sqlalchemy import Column, String
from sqlmodel import Field, SQLModel

class FeeStructure(SQLModel, table=True):
    __tablename__ = "feestructure"
    id: Optional[int] = Field(default=None, primary_key=True)
    class_group: str = Field(sa_column=Column("Class_group", String))
    registration_fee: str
    admission_fee: str
    annual_charges: str
    tuition_fee: str
    erp_fee: str
    
    # The following are NOT in the database table according to Supabase screenshot.
    # Moving them to schemas or keeping as Optional fields that are NOT columns.
    # By default SQLModel Fields ARE columns. To make them not columns, we should
    # ideally not have them here if they aren't in the DB.
