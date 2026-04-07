import httpx
import asyncio

async def inject():
    payload = {
        "task_id": "us_news_wsl_test",
        "company_code": "AAPL",
        "company_name": "Apple Inc.",
        "event_type": "US_MARKET_UPDATE",
        "raw_data": {"title": "Massive SDK Integration Test Successful"},
        "context": {
            "ontology_result": {"market": "US"},
            "article_draft": None,
            "factcheck_passed": None,
            "viz_chart_url": None
        },
        "status": "pending"
    }

    async with httpx.AsyncClient() as client:
        res = await client.post("http://127.0.0.1:8000/manager/events/new-dart", json=payload)
        print("Status:", res.status_code)
        print("Body:", res.text)

asyncio.run(inject())
