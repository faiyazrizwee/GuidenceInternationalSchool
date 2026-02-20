import pandas as pd
import json

file_path = 'frontend/public/assets/files/Year plan/UPDATED YEARLY PLAN 24-25.xlsx'

try:
    # Read the Excel file
    # reading all sheets to see what we have
    xls = pd.ExcelFile(file_path)
    sheet_names = xls.sheet_names
    
    print(f"Sheet names: {sheet_names}")
    
    # print(df_clean[['Date', 'Class', 'Activity']].to_json(orient='records'))
    print(df.to_markdown(index=False))

except Exception as e:
    print(f"Error reading Excel file: {e}")
