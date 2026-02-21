from sqlmodel import Session, select, create_engine
from app.models.user import User
from app.core import security
from app.core.config import settings

db_url = settings.DATABASE_URL
connect_args = {}
if db_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(db_url, connect_args=connect_args)

def check_admin():
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == "admin")).first()
        if not user:
            print("❌ User 'admin' NOT FOUND in database.")
            return

        print(f"✅ User 'admin' found. ID: {user.id}")
        
        # Check password
        if security.verify_password("admin123", user.hashed_password):
            print("✅ Password 'admin123' is CORRECT.")
        else:
            print("❌ Password mismatch. The stored hash does NOT match 'admin123'.")
            print(f"   Stored Hash: {user.hashed_password}")
            
            # Reset password
            print("🔄 Resetting password to 'admin123'...")
            user.hashed_password = security.get_password_hash("admin123")
            session.add(user)
            session.commit()
            print("✅ Password reset successfully.")

if __name__ == "__main__":
    check_admin()
