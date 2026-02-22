from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlmodel import Session, select
from app.api import deps
from app.models.subscriber import Subscriber, SubscriberCreate, SubscriberRead
from pydantic import BaseModel

router = APIRouter()

class NotificationRequest(BaseModel):
    subject: str
    message: str
    type: str  # fees, holiday, exam, announcement

@router.post("", response_model=SubscriberRead)
def create_subscriber(
    *,
    db: Session = Depends(deps.get_db),
    subscriber_in: SubscriberCreate,
) -> Any:
    """
    Create new subscriber.
    """
    # Check if subscriber already exists
    statement = select(Subscriber).where(Subscriber.email == subscriber_in.email)
    existing_subscriber = db.exec(statement).first()
    if existing_subscriber:
        raise HTTPException(
            status_code=400,
            detail="The subscriber with this email already exists in the system",
        )
    
    subscriber = Subscriber.from_orm(subscriber_in)
    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)
    return subscriber

@router.get("", response_model=List[SubscriberRead])
def read_subscribers(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve subscribers.
    """
    subscribers = db.exec(select(Subscriber).offset(skip).limit(limit)).all()
    return subscribers

@router.post("/broadcast", response_model=dict)
async def broadcast_notification(
    *,
    db: Session = Depends(deps.get_db),
    notification: NotificationRequest,
    background_tasks: BackgroundTasks,
) -> Any:
    """
    Send notification to all active subscribers.
    """
    subscribers = db.exec(select(Subscriber).where(Subscriber.is_active == True)).all()
    
    # Mock sending email
    # print(f"📢 BROADCASTING '{notification.type.upper()}' UPDATE: {notification.subject}")
    # print(f"📝 Message: {notification.message}")
    # print(f"📧 Recipients ({len(subscribers)}): {[s.email for s in subscribers]}")
    
    from app.utils.email import send_broadcast_email
    
    if subscribers:
        recipients = [s.email for s in subscribers]
        # Send email in background or directly (await)
        # For simplicity in this implementation plan, we await it. 
        # In production, BackgroundTasks is better.
        try:
             # Basic template
            body = f"""
            <html>
                <body>
                    <h2>{notification.subject}</h2>
                    <p>{notification.message}</p>
                    <br>
                    <p>Best Regards,</p>
                    <p>Guidance International School</p>
                </body>
            </html>
            """
            
            # Using FastAPI BackgroundTasks instead of awaiting synchronously
            background_tasks.add_task(
                send_broadcast_email,
                subject=notification.subject,
                recipients=recipients,
                body=body
            )
            
        except Exception as e:
            print(f"Error preparing email task: {e}")
            raise HTTPException(status_code=500, detail=f"Failed to prepare email task: {str(e)}")

    return {"message": f"Broadcast scheduled for {len(subscribers)} subscribers"}

@router.delete("", response_model=dict)
def unsubscribe_subscriber(
    *,
    db: Session = Depends(deps.get_db),
    email: str,
) -> Any:
    """
    Unsubscribe based on email (for users).
    """
    statement = select(Subscriber).where(Subscriber.email == email)
    subscriber = db.exec(statement).first()
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    
    db.delete(subscriber)
    db.commit()
    return {"message": "Successfully unsubscribed"}

@router.delete("/{subscriber_id}", response_model=dict)
def delete_subscriber(
    *,
    db: Session = Depends(deps.get_db),
    subscriber_id: int,
) -> Any:
    """
    Delete a subscriber by ID (for admin).
    """
    subscriber = db.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    
    db.delete(subscriber)
    db.commit()
    return {"message": "Subscriber deleted"}

@router.put("/{subscriber_id}/status", response_model=SubscriberRead)
def toggle_subscriber_status(
    *,
    db: Session = Depends(deps.get_db),
    subscriber_id: int,
) -> Any:
    """
    Toggle active status (block/unblock) for a subscriber.
    """
    subscriber = db.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    
    subscriber.is_active = not subscriber.is_active
    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)
    return subscriber
