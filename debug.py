from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)
try:
    response = client.post("/events/dart-trigger")
    print("STATUS", response.status_code)
    print("TEXT", response.text)
except Exception as e:
    import traceback
    traceback.print_exc()
