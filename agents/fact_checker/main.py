from fastapi import FastAPI
from shared.models import EventPayload

app = FastAPI(title="Fact Checker Agent")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Fact Checker"}

@app.post("/agents/verify/fact-check", response_model=EventPayload)
async def fact_check(payload: EventPayload):
    # Fact-checking logic here
    payload.context.factcheck_passed = True
    return payload
