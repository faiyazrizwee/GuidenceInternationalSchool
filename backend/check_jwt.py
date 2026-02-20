from datetime import timedelta
from app.core import security

def check_jwt():
    try:
        token = security.create_access_token("admin", expires_delta=timedelta(minutes=5))
        print(f"✅ JWT Token generation passed. Token: {token[:10]}...")
    except Exception as e:
        print(f"❌ JWT Token generation FAILED: {e}")

if __name__ == "__main__":
    check_jwt()
