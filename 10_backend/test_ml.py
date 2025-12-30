import asyncio
from app.routers.ml import predict_next_category
from fastapi import UploadFile
import io

async def test_ml():
    # Create a simple CSV content
    csv_content = """날짜,시간,금액,대분류
2025-12-01,10:00,15000,외식
2025-12-02,12:00,8000,교통
2025-12-03,14:00,25000,쇼핑
2025-12-03,18:00,12000,외식
2025-12-04,09:00,5000,카페
"""
    
    # Create UploadFile
    file = UploadFile(filename="test.csv", file=io.BytesIO(csv_content.encode('utf-8')))
    
    try:
        result = await predict_next_category(file)
        print(f"Predicted Category: {result.get('predicted_category', 'N/A')}")
        print(f"Confidence: {result.get('confidence', 'N/A')}")
        print("=== ML PREDICTION TEST PASSED ===")
    except Exception as e:
        print(f"ML Test Error: {e}")

asyncio.run(test_ml())
