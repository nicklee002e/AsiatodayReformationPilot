import os
from dotenv import load_dotenv
from polygon import RESTClient

load_dotenv()
US_MARKET_API_KEY = os.getenv("US_MARKET_API_KEY")
print("Key length:", len(str(US_MARKET_API_KEY)))

try:
    client = RESTClient(api_key=US_MARKET_API_KEY)
    news_iter = client.list_ticker_news(limit=1)
    for n in news_iter:
        print("Success!", n.title)
        break
except Exception as e:
    import traceback
    traceback.print_exc()
