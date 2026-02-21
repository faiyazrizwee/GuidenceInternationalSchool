from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.api import deps
from app.models.gallery import GalleryImage
from app.schemas.gallery import GalleryCreate, GalleryRead, GalleryUpdate

router = APIRouter()

@router.get("", response_model=List[GalleryRead])
def read_gallery_images(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    return db.exec(select(GalleryImage).offset(skip).limit(limit)).all()

@router.post("", response_model=GalleryRead)
def create_gallery_image(
    *,
    db: Session = Depends(deps.get_db),
    image_in: GalleryCreate,
    current_user: Any = Depends(deps.get_current_active_superuser),
):
    image = GalleryImage.from_orm(image_in)
    db.add(image)
    db.commit()
    db.refresh(image)
    return image

@router.delete("/{id}", response_model=GalleryRead)
def delete_gallery_image(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: Any = Depends(deps.get_current_active_superuser),
):
    image = db.get(GalleryImage, id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    db.delete(image)
    db.commit()
    return image
