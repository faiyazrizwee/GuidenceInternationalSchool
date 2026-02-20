from typing import Optional
from datetime import datetime
from pydantic import BaseModel

# Year Plan
class YearPlanBase(BaseModel):
    title: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    is_active: bool = True

class YearPlanCreate(YearPlanBase):
    pass

class YearPlanUpdate(YearPlanBase):
    title: Optional[str] = None
    is_active: Optional[bool] = None

class YearPlanRead(YearPlanBase):
    id: int
    created_at: datetime

# Test Schedule
class TestScheduleBase(BaseModel):
    class_name: str
    subject: str
    topic: str
    test_date: datetime

class TestScheduleCreate(TestScheduleBase):
    pass

class TestScheduleUpdate(TestScheduleBase):
    class_name: Optional[str] = None
    subject: Optional[str] = None
    topic: Optional[str] = None
    test_date: Optional[datetime] = None

class TestScheduleRead(TestScheduleBase):
    id: int
    created_at: datetime

# Academic Calendar
class CalendarBase(BaseModel):
    event_name: str
    event_date: datetime
    event_type: str
    description: Optional[str] = None

class CalendarCreate(CalendarBase):
    pass

class CalendarUpdate(CalendarBase):
    event_name: Optional[str] = None
    event_date: Optional[datetime] = None
    event_type: Optional[str] = None

class CalendarRead(CalendarBase):
    id: int
