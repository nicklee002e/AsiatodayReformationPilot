import asyncio
import os
from backend.main import trigger_us_market_fetch

async def test():
    try:
        res = await trigger_us_market_fetch()
        print(res)
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(test())
