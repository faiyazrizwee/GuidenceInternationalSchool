import pandas as pd
from sqlmodel import Session, create_engine, select
import os
import sys
from datetime import datetime

# Add the backend directory to sys.path to import app modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from sqlalchemy import text
from app.models.academics import YearPlan
from app.db.session import engine

def import_year_plan():
    excel_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "assets", "files", "Year plan", "UPDATED YEARLY PLAN 24-25.xlsx")
    
    if not os.path.exists(excel_path):
        print(f"Error: File not found at {excel_path}")
        return

    # Read Excel, skip the first row (headers are there, but we will name them manually or use them)
    # The structure we saw:
    # row 0: Unnamed: 0, YEARLY PLAN 2024-25, Unnamed: 2, Unnamed: 3, Unnamed: 4
    # we want to map those to: skip, Month, Date, Class, Occasion
    
    df = pd.read_excel(excel_path, header=0)
    
    # Rename columns based on our analysis
    df.columns = ['skip', 'month', 'date', 'class_name', 'activity']
    
    # Drop rows where everything is NaN
    df = df.dropna(how='all')
    
    # Forward fill the month column
    df['month'] = df['month'].ffill()
    
    # Filter out rows where date or activity is NaN (these are likely header rows or empty spacers)
    df = df.dropna(subset=['date', 'activity'])
    
    # Also ignore the header row itself if it's still there (the one that says "Date", "Class", etc.)
    df = df[df['date'] != 'Date']
    
    records_to_insert = []
    
    with Session(engine) as session:
        # Clear existing data just in case
        session.exec(text("DELETE FROM yearplan"))
        
        import re
        
        for index, row in df.iterrows():
            try:
                # Handle date parsing
                raw_date = row['date']
                parsed_date = None
                
                if isinstance(raw_date, datetime):
                    parsed_date = raw_date.date()
                elif isinstance(raw_date, str):
                    # Try to parse string date if any
                    try:
                        parsed_date = datetime.strptime(raw_date, "%Y-%m-%d").date()
                    except:
                        # Try to find a date in the string if it's a range like "21-5-24 to 30-6-24"
                        # Match something like DD-MM-YY or DD-MM-YYYY
                        match = re.search(r'(\d{1,2})-(\d{1,2})-(\d{2,4})', raw_date)
                        if match:
                            day, month, year = match.groups()
                            if len(year) == 2:
                                year = "20" + year
                            try:
                                parsed_date = datetime.strptime(f"{day}-{month}-{year}", "%d-%m-%Y").date()
                            except:
                                pass
                
                if not parsed_date:
                    print(f"Skipping row {index}: invalid date format {raw_date}")
                    continue
                
                year_plan_entry = YearPlan(
                    date=parsed_date,
                    month=str(row['month']).strip(),
                    class_name=str(row['class_name']).strip(),
                    activity=str(row['activity']).strip()
                )
                session.add(year_plan_entry)
                records_to_insert.append(year_plan_entry)
            except Exception as e:
                print(f"Error processing row {index}: {e}")
        
        session.commit()
        print(f"Successfully imported {len(records_to_insert)} records into YearPlan table.")

if __name__ == "__main__":
    import_year_plan()
