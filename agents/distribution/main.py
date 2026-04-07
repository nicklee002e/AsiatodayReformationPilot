from fastapi import FastAPI
from shared.models import EventPayload

app = FastAPI(title="Distribution (GEO) Agent")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Distribution (GEO)"}

@app.post("/agents/distribution/distribute", response_model=EventPayload)
async def distribute_article(payload: EventPayload):
    # Distribution logic here
    payload.status = "distributed"
    return payload
