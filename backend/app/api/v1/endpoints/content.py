
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.api import deps
from app.models.content import Event
from app.schemas.content import (
    EventCreate, EventRead, EventUpdate
)
from app.models.user import User

router = APIRouter()


# Events
@router.get("/events", response_model=List[EventRead])
def read_events(
    skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)
):
    events = db.exec(select(Event).offset(skip).limit(limit)).all()
    return events

@router.post("/events", response_model=EventRead)
def create_event(
    *, db: Session = Depends(deps.get_db), event_in: EventCreate,
    current_user: User = Depends(deps.get_current_active_superuser)
):
    event = Event.from_orm(event_in)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

@router.delete("/events/{id}", response_model=EventRead)
def delete_event(
    *, db: Session = Depends(deps.get_db), id: int,
    current_user: User = Depends(deps.get_current_active_superuser)
):
    event = db.get(Event, id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()
    return event
