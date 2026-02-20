
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.api import deps
from app.models.forms import ContactSubmission, AdmissionSubmission
from app.schemas.forms import (
    ContactSubmissionCreate, ContactSubmissionRead,
    AdmissionSubmissionCreate, AdmissionSubmissionRead
)
from app.models.user import User

router = APIRouter()

# Contact Forms
@router.post("/contact", response_model=ContactSubmissionRead)
def submit_contact(
    *, db: Session = Depends(deps.get_db), submission_in: ContactSubmissionCreate
):
    submission = ContactSubmission.from_orm(submission_in)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission

@router.get("/contact", response_model=List[ContactSubmissionRead])
def read_contact_submissions(
    skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_superuser)
):
    return db.exec(select(ContactSubmission).offset(skip).limit(limit)).all()

# Admission Forms
@router.post("/admission", response_model=AdmissionSubmissionRead)
def submit_admission(
    *, db: Session = Depends(deps.get_db), submission_in: AdmissionSubmissionCreate
):
    submission = AdmissionSubmission.from_orm(submission_in)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission

@router.get("/admission", response_model=List[AdmissionSubmissionRead])
def read_admission_submissions(
    skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_superuser)
):
    return db.exec(select(AdmissionSubmission).offset(skip).limit(limit)).all()

@router.delete("/contact/{id}", response_model=ContactSubmissionRead)
def delete_contact_submission(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    submission = db.get(ContactSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    db.delete(submission)
    db.commit()
    return submission

@router.delete("/admission/{id}", response_model=AdmissionSubmissionRead)
def delete_admission_submission(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_superuser),
):
    submission = db.get(AdmissionSubmission, id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    db.delete(submission)
    db.commit()
    return submission
