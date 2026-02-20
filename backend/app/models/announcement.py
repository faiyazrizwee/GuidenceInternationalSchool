from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel

class AnnouncementBase(SQLModel):
    text: str
    is_active: bool = True

class Announcement(AnnouncementBase, table=True):
    __table_args__ = {'extend_existing': True}
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementRead(AnnouncementBase):
    id: int
    created_at: datetime
