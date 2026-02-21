from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.api import deps
from app.models.fee import FeeStructure
from app.schemas.fee import FeeCreate, FeeRead, FeeUpdate

router = APIRouter()

@router.get("", response_model=List[FeeRead])
def read_fees(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve fee structures.
    """
    fees = db.exec(select(FeeStructure).offset(skip).limit(limit)).all()
    return fees

@router.post("", response_model=FeeRead)
def create_fee(
    *,
    db: Session = Depends(deps.get_db),
    fee_in: FeeCreate,
    current_user: Any = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new fee structure.
    """
    fee = FeeStructure.from_orm(fee_in)
    db.add(fee)
    db.commit()
    db.refresh(fee)
    return fee

@router.put("/{id}", response_model=FeeRead)
def update_fee(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    fee_in: FeeUpdate,
    current_user: Any = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a fee structure.
    """
    fee = db.get(FeeStructure, id)
    if not fee:
        raise HTTPException(status_code=404, detail="Fee structure not found")
    
    fee_data = fee_in.dict(exclude_unset=True)
    for key, value in fee_data.items():
        setattr(fee, key, value)
        
    db.add(fee)
    db.commit()
    db.refresh(fee)
    return fee

@router.delete("/{id}", response_model=FeeRead)
def delete_fee(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: Any = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a fee structure.
    """
    fee = db.get(FeeStructure, id)
    if not fee:
        raise HTTPException(status_code=404, detail="Fee structure not found")
    
    db.delete(fee)
    db.commit()
    return fee
