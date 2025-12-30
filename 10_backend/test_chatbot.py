import asyncio
import os
os.environ['GEMINI_API_KEY'] = os.environ.get('GEMINI_API_KEY', '')

from app.routers.chatbot import call_llm_api

async def test_chatbot():
    try:
        result = await call_llm_api("안녕", "중", "", False)
        print(f"Chatbot Response: {result[:100]}...")
        print("=== CHATBOT TEST PASSED ===")
    except Exception as e:
        print(f"Chatbot Error: {e}")

asyncio.run(test_chatbot())
