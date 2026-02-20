from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class GalleryBase(BaseModel):
    title: Optional[str] = None
    image_url: str
    category: Optional[str] = "General"

class GalleryCreate(GalleryBase):
    pass

class GalleryUpdate(GalleryBase):
    title: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None

class GalleryRead(GalleryBase):
    id: int
    created_at: datetime
