from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel

class SubscriberBase(SQLModel):
    email: str = Field(index=True, unique=True)
    is_active: bool = True

class Subscriber(SubscriberBase, table=True):
    __tablename__ = "subscriber"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SubscriberCreate(SubscriberBase):
    pass

class SubscriberRead(SubscriberBase):
    id: int
    created_at: datetime
