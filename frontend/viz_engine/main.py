from fastapi import FastAPI
from shared.models import EventPayload

app = FastAPI(title="Viz Engine Agent")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Viz Engine"}

@app.post("/frontend/viz/generate-chart", response_model=EventPayload)
async def generate_chart(payload: EventPayload):
    # Chart generation logic here
    payload.context.viz_chart_url = "http://assets.asiatoday/chart_mock.png"
    return payload
