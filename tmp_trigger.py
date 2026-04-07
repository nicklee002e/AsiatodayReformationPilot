import httpx
import asyncio

async def main():
    async with httpx.AsyncClient(timeout=300.0) as client:
        res = await client.post("http://127.0.0.1:8001/events/us-market-trigger")
        print("Status Code:", res.status_code)
        print("Response JSON:", res.json())

asyncio.run(main())
