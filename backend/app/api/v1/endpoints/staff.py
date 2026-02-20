from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.api import deps
from app.models.staff import StaffMember
from app.schemas.staff import StaffCreate, StaffRead, StaffUpdate

router = APIRouter()

@router.get("/", response_model=List[StaffRead])
def read_staff(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    staff = db.exec(select(StaffMember).offset(skip).limit(limit)).all()
    return staff

@router.post("/", response_model=StaffRead)
def create_staff(
    *,
    db: Session = Depends(deps.get_db),
    staff_in: StaffCreate,
    current_user: Any = Depends(deps.get_current_active_superuser),
) -> Any:
    staff = StaffMember.from_orm(staff_in)
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff

@router.put("/{id}", response_model=StaffRead)
def update_staff(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    staff_in: StaffUpdate,
    current_user: Any = Depends(deps.get_current_active_superuser),
) -> Any:
    staff = db.get(StaffMember, id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    
    staff_data = staff_in.dict(exclude_unset=True)
    for key, value in staff_data.items():
        setattr(staff, key, value)
        
    db.add(staff)
    db.commit()
    db.refresh(staff)
    return staff

@router.delete("/{id}", response_model=StaffRead)
def delete_staff(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: Any = Depends(deps.get_current_active_superuser),
) -> Any:
    staff = db.get(StaffMember, id)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    
    db.delete(staff)
    db.commit()
    return staff
