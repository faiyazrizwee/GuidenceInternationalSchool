
from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel



class Event(SQLModel, table=True):
    __tablename__ = "event"
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    event_date: datetime
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
