import httpx
import asyncio

async def test():
    async with httpx.AsyncClient() as client:
        res = await client.post("http://127.0.0.1:8001/events/us-market-trigger")
        print(res.status_code)
        print(res.text)

asyncio.run(test())
