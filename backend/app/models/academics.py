from typing import Optional
from datetime import datetime, date
from sqlmodel import Field, SQLModel

class YearPlan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    date: date
    month: str
    class_name: str
    activity: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ClassTestSchedule(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    class_name: str
    subject: str
    topic: str
    test_date: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AcademicCalendar(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    event_name: str
    event_date: datetime
    event_type: str # e.g. "Holiday", "Exam", "Event"
    description: Optional[str] = None
