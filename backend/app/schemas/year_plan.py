from datetime import date
from typing import Optional
from pydantic import BaseModel

class YearPlanBase(BaseModel):
    date: date
    month: str
    class_name: str
    activity: str

class YearPlanCreate(YearPlanBase):
    pass

class YearPlanRead(YearPlanBase):
    id: int
    
    class Config:
        from_attributes = True

class YearPlanUpdate(BaseModel):
    date: Optional[date] = None
    month: Optional[str] = None
    class_name: Optional[str] = None
    activity: Optional[str] = None
