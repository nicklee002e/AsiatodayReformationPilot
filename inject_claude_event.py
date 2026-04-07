import httpx
import asyncio

news_text = """Claude subscribers just lost access to OpenClaw and other third-party tools—unless they pay more
claude assistant home page on a laptop
4
By 
Simon Batt
Published Apr 4, 2026, 6:41 AM EDT
Simon is a Computer Science BSc graduate who has been writing about technology since 2014, and using Windows machines since 3.1. After working for an indie game studio and acting as the family's go-to technician for all computer issues, he found his passion for writing and decided to use his skill set to write about all things tech.

Since beginning his writing career, he has written for many different publications such as WorldStart, Listverse, and MakeTechEasier. However, after finding his home at MakeUseOf in February 2019, he would eventually move on to its sister site, XDA, to bring the latest and greatest in Windows, Linux, and DIY electronics.

Summary
Claude subscriptions no longer cover third-party tools (like OpenClaw) starting April 4th at 12pm PT.
To use Claude on OpenClaw, you'll need extra usage bundles or a Claude API key.
Anthropic blames surging demand, but subscribers get a one-time credit equal to one month.
As AI has begun to take off, we're seeing the rise of services that let you attach your favorite AI model to them. Such is the case of OpenClaw, which allows you to use your API of choice to create a digital assistant that can help you perform tasks that a regular LLM can only dream of doing.

For a while, using OpenClaw and Claude was a dream combination, using the utility of the former with the smarts of the latter to help people get stuff done. Unfortunately, Anthropic has just announced that if you want to continue using Claude on third-party services like OpenClaw, you're going to have to pay more.

Claude code 
Related
Claude can now automate your entire desktop, but with a serious limitation
It's likely a temporary one, though.

7
By 
Simon Batt
Mar 23, 2026
Using Claude on OpenClaw is getting more expensive
But Anthropic is giving everyone some credit
claude code voice mode on mac
In a post on X, Boris Cherny, head of Claude Code at Anthropic, announced the change in plans. Once 3pm ET/12pm PT arrives on April 4th, 2026, anyone with a Claude subscription won't have their OpenClaw usage covered by their plan. You'll need to either purchase an extra usage bundle or use a Claude API key.

Cherny says the change is because Claude has been seeing a ton of demand lately (as is evident by the multiple times it went down in March), and Anthropic hadn't properly built third-party tool usage into the Claude subscription plans. Fortunately, Anthropic is offering up to a 30% discount on pre-purchased extra usage bundles to make the transition less painful. Plus, if you are a subscriber, Anthropic will give you a one-time credit to your account equal to the amount you've been paying each month. You'll need to redeem it by April 17th, so don't waste time grabbing it.

Cherny also mentions in the replies that using OpenClaw on a Claude subscription plan wasn't allowed in the first place under the Terms of Service. As such, Cherny feels this is less about restricting people based on what they're using Claude for and more about enforcing the rules they had already set up."""

async def inject():
    payload = {
        "task_id": "us_news_claude_1",
        "company_code": "ANTH",
        "company_name": "Anthropic (Claude)",
        "event_type": "US_MARKET_UPDATE",
        "raw_data": {
            "title": "Claude subscribers just lost access to OpenClaw and other third-party tools—unless they pay more",
            "content": news_text
        },
        "context": {
            "ontology_result": {"market": "US"},
            "article_draft": None,
            "factcheck_passed": None,
            "viz_chart_url": None
        },
        "status": "pending"
    }

    async with httpx.AsyncClient(timeout=300.0) as client:
        res = await client.post("http://127.0.0.1:8000/manager/events/new-dart", json=payload)
        print("Status:", res.status_code)
        
        try:
            print("Manager Result JSON:")
            data = res.json()
            if data['context'].get('article_draft'):
                print("Draft successfully generated.")
            if data['context'].get('ontology_result'):
                print("Ontology successfully inferred.")
        except Exception as e:
            print("Could not parse JSON:", e)

if __name__ == "__main__":
    asyncio.run(inject())
