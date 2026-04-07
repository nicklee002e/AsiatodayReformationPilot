from fastapi import FastAPI
from shared.models import EventPayload

app = FastAPI(title="Security Agent")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Security"}

@app.post("/security/verify", response_model=EventPayload)
async def security_verify(payload: EventPayload):
    # Security checking logic here
    return payload
