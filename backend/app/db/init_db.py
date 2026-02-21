import time
from sqlmodel import Session, select

from app.db.session import engine
from app.models.user import User
from app.models.content import Event
from app.models.forms import ContactSubmission, AdmissionSubmission
from app.models.staff import StaffMember
from app.models.gallery import GalleryImage
from app.models.fee import FeeStructure
from app.models.academics import YearPlan, ClassTestSchedule, AcademicCalendar
from app.core import security
from app.core.config import settings
import os

def init_db(session: Session) -> None:
    # Tables are created by SQLModel automatically via create_all if we used it, 
    # but Alembic is preferred. For this demo, we might rely on SQLModel.metadata.create_all(engine) 
    # in pre-start script if we don't set up full migration flow yet.
    # Here we just create the superuser.
    
    from sqlmodel import SQLModel
    SQLModel.metadata.create_all(engine)

    print("DEBUG: Checking for admin user...")
    try:
        user = session.exec(
            select(User).where(User.username == "admin")
        ).first()
        if not user:
            print("DEBUG: Admin user not found. Creating...")
            user = User(
                username="admin",
                hashed_password=security.get_password_hash("admin123"), # Default pass
                is_superuser=True,
            )
            session.add(user)
            session.commit()
            session.refresh(user)
            print("DEBUG: Admin user created successfully.")
        else:
            print(f"DEBUG: Admin user already exists. ID: {user.id}, Active: {user.is_active}")
            # Always reset admin password to ensure it's valid and using current bcrypt settings
            print("DEBUG: Ensuring admin password is set to 'admin123'...")
            user.hashed_password = security.get_password_hash("admin123")
            user.is_active = True
            user.is_superuser = True
            session.add(user)
            session.commit()
            print("DEBUG: Admin password verified/reset successfully.")
    except Exception as e:
        print(f"ERROR: Failed to check/create admin user: {str(e)}")
        import traceback
        traceback.print_exc()
        session.rollback()

    # Seed Staff Data if empty
    from app.models.staff import StaffMember
    if not session.exec(select(StaffMember)).first():
        staff_data = [
            { "name": "Dr. J. Renukaa", "role": "Principal", "image_url": "/assets/images/principal.jpg", "experience": "20+", "students_handled": "1000+", "phone": "+91 98370 12345" },
            { "name": "Maryam Furqan", "role": "Coordinator", "image_url": None, "experience": "12", "students_handled": "450", "phone": "+91 98370 23456" },
            { "name": "Nimra Anwar", "role": "TGT Science", "image_url": None, "experience": "8", "students_handled": "2000", "phone": "+91 98370 34567" },
            { "name": "Asif Mian", "role": "PE Teacher", "image_url": None, "experience": "15", "students_handled": "All", "phone": "+91 98370 45678" },
            { "name": "Khadija Khan", "role": "TGT SS", "image_url": None, "experience": "7", "students_handled": "1800", "phone": "+91 98370 56789" },
            { "name": "Samiya Kafeel", "role": "PRT", "image_url": None, "experience": "5", "students_handled": "1440", "phone": "+91 98370 67890" },
            { "name": "Aqsa Fahad", "role": "NTT", "image_url": None, "experience": "4", "students_handled": "1230", "phone": "+91 98370 78901" },
            { "name": "Kashish Khan", "role": "NTT", "image_url": None, "experience": "3", "students_handled": "2500", "phone": "+91 98370 89012" },
            { "name": "Daud Khan", "role": "TGT Maths", "image_url": None, "experience": "9", "students_handled": "220", "phone": "+91 98370 90123" },
            { "name": "Samiya Khan", "role": "PRT", "image_url": None, "experience": "6", "students_handled": "450", "phone": "+91 98370 01234" },
            { "name": "Arsh Ur Rehman", "role": "Teacher", "image_url": None, "experience": "4", "students_handled": "120", "phone": "+91 98370 11223" },
            { "name": "Bareera Uzair", "role": "TGT Moral Science", "image_url": None, "experience": "5", "students_handled": "150", "phone": "+91 98370 22334" },
            { "name": "Mohd Naved", "role": "Admin Executive", "image_url": None, "experience": "10", "students_handled": "300", "phone": "+91 98370 33445" },
            { "name": "Hamza Khan", "role": "PRT", "image_url": None, "experience": "3", "students_handled": "350", "phone": "+91 98370 44556" },
            { "name": "Madeeha Khan", "role": "Assistant Teacher", "image_url": None, "experience": "2", "students_handled": "360", "phone": "+91 98370 55667" },
            { "name": "Anamta", "role": "Assistant Teacher", "image_url": None, "experience": "2", "students_handled": "320", "phone": "+91 98370 66778" },
            { "name": "Arsala Suhail", "role": "PRT", "image_url": None, "experience": "4", "students_handled": "400", "phone": "+91 98370 77889" },
            { "name": "Inderdeep Kaur", "role": "TGT Computer Science", "image_url": None, "experience": "11", "students_handled": "300", "phone": "+91 98370 88990" },
            { "name": "Rajat Sharma", "role": "TGT Hindi", "image_url": None, "experience": "14", "students_handled": "250", "phone": "+91 98370 99001" },
            { "name": "Saqib Umar", "role": "Accountant", "image_url": None, "experience": "8", "students_handled": "1150", "phone": "+91 98370 00112" },
        ]
        for staff in staff_data:
            session.add(StaffMember(**staff))
        session.commit()
        print(f"DEBUG: Staff data seeded successfully ({len(staff_data)} members).")
    else:
        # Count existing staff
        count = session.exec(select(StaffMember)).all()
        print(f"DEBUG: Staff data already exists ({len(count)} members).")

    # Seed Year Plan Data if empty
    from app.models.academics import YearPlan
    if not session.exec(select(YearPlan)).first():
        print("DEBUG: Year Plan table is empty. Attempting to seed from Excel...")
        try:
            # We call the import function from import_year_plan.py
            # Note: import_year_plan.py needs to be importable
            from import_year_plan import import_year_plan
            import_year_plan()
            print("DEBUG: Year Plan seeding attempted.")
        except Exception as e:
            print(f"ERROR: Failed to seed Year Plan: {str(e)}")
    else:
        print("DEBUG: Year Plan data already exists.")

def main() -> None:
    max_retries = 5
    retry_delay = 2  # seconds, doubles each retry

    for attempt in range(1, max_retries + 1):
        try:
            print(f"--- Database init attempt {attempt}/{max_retries} ---")
            with Session(engine) as session:
                init_db(session)
            print("✅ Database initialization completed successfully.")
            return
        except Exception as e:
            print(f"⚠️  Attempt {attempt}/{max_retries} failed: {e}")
            if attempt < max_retries:
                wait_time = retry_delay * (2 ** (attempt - 1))
                print(f"   Retrying in {wait_time}s...")
                time.sleep(wait_time)
            else:
                print("❌ All database init attempts failed.")
                raise

if __name__ == "__main__":
    main()
