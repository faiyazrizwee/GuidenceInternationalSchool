from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.api.deps import get_db, get_current_user
from app.models.academics import YearPlan
from app.schemas.year_plan import YearPlanCreate, YearPlanUpdate, YearPlanRead
from app.models.user import User

router = APIRouter()

@router.get("", response_model=List[YearPlanRead])
def read_year_plans(
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_db)
):
    year_plans = session.exec(select(YearPlan).offset(skip).limit(limit).order_by(YearPlan.date)).all()
    return year_plans

@router.post("", response_model=YearPlanRead)
def create_year_plan(
    *,
    session: Session = Depends(get_db),
    year_plan: YearPlanCreate,
    current_user: User = Depends(get_current_user)
):
    db_year_plan = YearPlan.from_orm(year_plan)
    session.add(db_year_plan)
    session.commit()
    session.refresh(db_year_plan)
    return db_year_plan

@router.put("/{year_plan_id}", response_model=YearPlanRead)
def update_year_plan(
    *,
    session: Session = Depends(get_db),
    year_plan_id: int,
    year_plan_in: YearPlanUpdate,
    current_user: User = Depends(get_current_user)
):
    year_plan = session.get(YearPlan, year_plan_id)
    if not year_plan:
        raise HTTPException(status_code=404, detail="Year Plan not found")
    
    year_plan_data = year_plan_in.dict(exclude_unset=True)
    for key, value in year_plan_data.items():
        setattr(year_plan, key, value)
        
    session.add(year_plan)
    session.commit()
    session.refresh(year_plan)
    return year_plan

@router.delete("/{year_plan_id}")
def delete_year_plan(
    *,
    session: Session = Depends(get_db),
    year_plan_id: int,
    current_user: User = Depends(get_current_user)
):
    year_plan = session.get(YearPlan, year_plan_id)
    if not year_plan:
        raise HTTPException(status_code=404, detail="Year Plan not found")
        
    session.delete(year_plan)
    session.commit()
    return {"ok": True}
