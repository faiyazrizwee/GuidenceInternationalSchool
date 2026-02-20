from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_db
from app.models.announcement import Announcement, AnnouncementCreate, AnnouncementRead

router = APIRouter()

@router.post("/", response_model=AnnouncementRead)
def create_announcement(*, session: Session = Depends(get_db), announcement: AnnouncementCreate):
    db_announcement = Announcement.from_orm(announcement)
    session.add(db_announcement)
    session.commit()
    session.refresh(db_announcement)
    return db_announcement

@router.get("/", response_model=List[AnnouncementRead])
def read_announcements(*, session: Session = Depends(get_db), offset: int = 0, limit: int = 100):
    announcements = session.exec(select(Announcement).offset(offset).limit(limit).order_by(Announcement.created_at.desc())).all()
    return announcements

@router.get("/active", response_model=List[AnnouncementRead])
def read_active_announcements(*, session: Session = Depends(get_db)):
    announcements = session.exec(select(Announcement).where(Announcement.is_active == True).order_by(Announcement.created_at.desc())).all()
    return announcements

@router.delete("/{announcement_id}")
def delete_announcement(*, session: Session = Depends(get_db), announcement_id: int):
    announcement = session.get(Announcement, announcement_id)
    if not announcement:
        raise HTTPException(status_code=404, detail="Announcement not found")
    session.delete(announcement)
    session.commit()
    return {"ok": True}
