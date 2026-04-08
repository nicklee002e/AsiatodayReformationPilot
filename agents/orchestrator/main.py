import asyncio
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from shared.models import EventPayload

app = FastAPI(title="Manager Hub Agent")

# CORS Setup for Frontend integration (Port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In MVP, allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EVENT_STORE_LIMIT = 100
event_store = []

import os
import json
if os.path.exists("latest_events.json"):
    try:
        with open("latest_events.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            if "events" in data:
                event_store.extend(data["events"])
                print(f"Loaded {len(data['events'])} events from latest_events.json")
    except Exception as e:
        print(f"Failed to load latest_events.json: {e}")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Manager Hub"}

@app.get("/manager/events/latest")
def get_latest_events(limit: int = 10):
    """
    Returns latest `limit` events in reverse chronological order
    so the newest appears first in the dashboard.
    """
    recent_events = event_store[-limit:]
    return {"events": list(reversed(recent_events))}

from fastapi import HTTPException

@app.get("/manager/events/{task_id}")
def get_event_by_id(task_id: str):
    for event in event_store:
        if event.get("task_id") == task_id:
            return event
    raise HTTPException(status_code=404, detail="Event not found")

@app.post("/manager/events/new-dart", response_model=EventPayload)
async def new_dart_event(payload: EventPayload):
    endpoints = [
        "http://127.0.0.1:8003/agents/article/draft-straight",
        "http://127.0.0.1:8002/ontology/analyze",
        # TODO: "http://127.0.0.1:8007/frontend/viz/generate-chart"
    ]
    
    async with httpx.AsyncClient(timeout=300.0) as client:
        # Pydantic v2 호환을 위한 데이터 준비
        data = payload.model_dump() if hasattr(payload, "model_dump") else payload.dict()
        
        tasks = []
        for url in endpoints:
            tasks.append(client.post(url, json=data))
            
        # 오류 발생 시 시스템 중단을 막기 위해 return_exceptions=True 적용
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # 결과값 합산 로직
        for res in results:
            if isinstance(res, Exception):
                print(f"Error calling endpoint: {res}")
            else:
                print(f"Success from {res.url} with status: {res.status_code}")
                # Article Writer (8003 포트)의 결과 파싱
                if "8003" in str(res.url):
                    try:
                        res_data = res.json()
                        draft = res_data.get("context", {}).get("article_draft")
                        if draft:
                            payload.context.article_draft = draft
                    except Exception as e:
                        print(f"Failed to parse article draft from response: {e}")
                
                # Ontology Agent (8002 포트)의 결과 파싱
                if "8002" in str(res.url):
                    try:
                        res_data = res.json()
                        onto = res_data.get("context", {}).get("ontology_result")
                        if onto:
                            if payload.context.ontology_result is None:
                                payload.context.ontology_result = {}
                            payload.context.ontology_result.update(onto)
                    except Exception as e:
                        print(f"Failed to parse ontology result from response: {e}")
                
    payload.status = "processed_phase_1"
    
    # Store event in memory with capacity limit
    event_store.append(payload.model_dump() if hasattr(payload, "model_dump") else payload.dict())
    if len(event_store) > EVENT_STORE_LIMIT:
        event_store.pop(0)

    try:
        with open("latest_events.json", "w", encoding="utf-8") as f:
            json.dump({"events": event_store}, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Failed to dump to latest_events.json: {e}")

    return payload
