from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.api import deps
from app.models.academics import YearPlan, ClassTestSchedule, AcademicCalendar
from app.schemas.academics import (
    YearPlanCreate, YearPlanRead, YearPlanUpdate,
    TestScheduleCreate, TestScheduleRead, TestScheduleUpdate,
    CalendarCreate, CalendarRead, CalendarUpdate
)

router = APIRouter()

# Year Plan
@router.get("/year-plans", response_model=List[YearPlanRead])
def read_year_plans(db: Session = Depends(deps.get_db)):
    return db.exec(select(YearPlan)).all()

@router.post("/year-plans", response_model=YearPlanRead)
def create_year_plan(
    year_plan: YearPlanCreate,
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_superuser)
):
    db_obj = YearPlan.from_orm(year_plan)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.delete("/year-plans/{id}", response_model=YearPlanRead)
def delete_year_plan(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_superuser)
):
    obj = db.get(YearPlan, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(obj)
    db.commit()
    return obj

# Test Schedule
@router.get("/test-schedules", response_model=List[TestScheduleRead])
def read_test_schedules(db: Session = Depends(deps.get_db)):
    return db.exec(select(ClassTestSchedule)).all()

@router.post("/test-schedules", response_model=TestScheduleRead)
def create_test_schedule(
    schedule: TestScheduleCreate,
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_superuser)
):
    db_obj = ClassTestSchedule.from_orm(schedule)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

# Academic Calendar
@router.get("/calendar", response_model=List[CalendarRead])
def read_calendar(db: Session = Depends(deps.get_db)):
    return db.exec(select(AcademicCalendar)).all()

@router.post("/calendar", response_model=CalendarRead)
def create_calendar_event(
    event: CalendarCreate,
    db: Session = Depends(deps.get_db),
    current_user: Any = Depends(deps.get_current_active_superuser)
):
    db_obj = AcademicCalendar.from_orm(event)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
