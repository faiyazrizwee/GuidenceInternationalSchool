
from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from app.api import deps
from app.core import security
from app.models.user import User
from app.schemas.user import Token, UserRead

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

@router.post("/login/access-token", response_model=Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = db.exec(select(User).where(User.username == form_data.username)).first()
    if not user:
        print(f"LOGIN ERROR: User '{form_data.username}' not found in database.")
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if not security.verify_password(form_data.password, user.hashed_password):
        print(f"LOGIN ERROR: Password mismatch for user '{form_data.username}'.")
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    if not user.is_active:
        print(f"LOGIN ERROR: User '{form_data.username}' is inactive.")
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=60) # 1 hour for demo
    return {
        "access_token": security.create_access_token(
            user.username, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }
