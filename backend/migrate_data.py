import os
import sys
from typing import List, Type
from sqlmodel import Session, SQLModel, create_engine, select

# Ensure we can import from app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from app.core.config import settings
# Import all models to ensure they are registered in SQLModel.metadata
from app.models.user import User
from app.models.content import Event
from app.models.forms import ContactSubmission, AdmissionSubmission
from app.models.staff import StaffMember
from app.models.gallery import GalleryImage
from app.models.fee import FeeStructure
from app.models.academics import YearPlan, ClassTestSchedule, AcademicCalendar
from app.models.announcement import Announcement
from app.models.subscriber import Subscriber

def migrate():
    # Source: SQLite (default path)
    sqlite_path = "backend/sql_app.db"
    sqlite_url = f"sqlite:///{sqlite_path}"
    
    if not os.path.exists(sqlite_path):
        # Try local path if called from backend directory
        if os.path.exists("sql_app.db"):
            sqlite_url = "sqlite:///sql_app.db"
        else:
            print(f"❌ SQLite database not found at {sqlite_path}")
            return

    # Destination: PostgreSQL (from settings)
    postgres_url = settings.DATABASE_URL
    if "sqlite" in postgres_url:
        print("❌ DATABASE_URL is still pointing to SQLite. Please set it to your PostgreSQL URL.")
        print("Example: export DATABASE_URL=postgres://user:pass@host:5432/dbname")
        return

    print(f"🚀 Migrating from SQLite to PostgreSQL...")
    print(f"Target: {postgres_url.split('@')[-1]}") # Print host only for security

    source_engine = create_engine(sqlite_url)
    target_engine = create_engine(postgres_url)

    # Create tables in target if they don't exist
    print("🛠️  Ensuring tables exist in target database...")
    SQLModel.metadata.create_all(target_engine)

    models: List[Type[SQLModel]] = [
        User, StaffMember, Event, ContactSubmission, AdmissionSubmission,
        GalleryImage, FeeStructure, YearPlan, ClassTestSchedule, 
        AcademicCalendar, Announcement, Subscriber
    ]

    with Session(source_engine) as source_session, Session(target_engine) as target_session:
        for model in models:
            model_name = model.__name__
            print(f"📦 Migrating {model_name}...")
            
            # Fetch all from source
            items = source_session.exec(select(model)).all()
            if not items:
                print(f"  (No data to migrate for {model_name})")
                continue
            
            # Clear target for this model to avoid duplicates if re-running
            # target_session.exec(delete(model)) # Optional: but might be risky
            
            count = 0
            for item in items:
                # Create a fresh object from the existing data
                data = item.model_dump()
                new_item = model(**data)
                target_session.add(new_item)
                count += 1
            
            try:
                print(f"  ⏳ Committing {count} items for {model_name}...")
                target_session.commit()
                print(f"  ✅ Successfully migrated {count} items for {model_name}.")
            except Exception as e:
                target_session.rollback()
                print(f"  ❌ Error migrating {model_name}: {e}")

    print("\n🎉 Migration process finished!")

if __name__ == "__main__":
    migrate()
