
from typing import Optional
from datetime import datetime
from pydantic import BaseModel



# Event Schemas
class EventBase(BaseModel):
    title: str
    description: str
    event_date: datetime
    image_url: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    title: Optional[str] = None
    description: Optional[str] = None
    event_date: Optional[datetime] = None
    image_url: Optional[str] = None

class EventRead(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime
