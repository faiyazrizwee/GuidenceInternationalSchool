from sqlmodel import Session, select, text
from app.db.session import engine
from app.models.staff import StaffMember

def fix_db():
    with Session(engine) as session:
        # Drop YearPlan table to allow recreation
        try:
            session.exec(text("DROP TABLE yearplan"))
            print("Dropped yearplan table.")
        except Exception as e:
            print(f"Error dropping yearplan: {e}")

        # Check Staff Data
        staff = session.exec(select(StaffMember)).all()
        print(f"Staff count: {len(staff)}")
        for s in staff[:3]:
            print(f"- {s.name} ({s.role})")

if __name__ == "__main__":
    fix_db()
