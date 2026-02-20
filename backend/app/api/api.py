
from fastapi import APIRouter

from app.api.v1.endpoints import auth, content, forms, fees, academics, staff, gallery, year_plan, announcement, subscriber

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(forms.router, prefix="/forms", tags=["forms"])
api_router.include_router(fees.router, prefix="/fees", tags=["fees"])
api_router.include_router(academics.router, prefix="/academics", tags=["academics"])
api_router.include_router(staff.router, prefix="/staff", tags=["staff"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["gallery"])
api_router.include_router(year_plan.router, prefix="/year-plan", tags=["year-plan"])
api_router.include_router(announcement.router, prefix="/announcement", tags=["announcement"])
api_router.include_router(subscriber.router, prefix="/subscriber", tags=["subscriber"])
