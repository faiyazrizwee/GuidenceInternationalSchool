from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel

class GalleryImage(SQLModel, table=True):
    __tablename__ = "galleryimage"
    id: Optional[int] = Field(default=None, primary_key=True)
    title: Optional[str] = None
    image_url: str
    category: Optional[str] = "General"  # e.g., "Events", "Campus", "Sports"
    created_at: datetime = Field(default_factory=datetime.utcnow)
