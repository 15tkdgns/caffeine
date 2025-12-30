import asyncio
from app.db.database import get_db
from app.db.model.transaction import Transaction
from sqlalchemy import select, desc
import pandas as pd
import joblib
import os

async def test_predict_next():
    # Load model
    model_path = "/app/ml_models/model_xgboost_acc_73.47.joblib"
    if not os.path.exists(model_path):
        print(f"Model not found: {model_path}")
        return
    
    model = joblib.load(model_path)
    print("Model loaded OK")
    
    # Get user transactions
    async for db in get_db():
        result = await db.execute(
            select(Transaction)
            .where(Transaction.user_id == 53)
            .order_by(desc(Transaction.transaction_time))
            .limit(10)
        )
        txs = result.scalars().all()
        print(f"\n=== 최근 거래 10건 ===")
        for tx in txs[:5]:
            print(f"  {tx.transaction_time}: {tx.merchant_name} - {tx.amount}원")
        
        # Prepare data for prediction
        data = []
        for tx in txs:
            data.append({
                'hour': tx.transaction_time.hour if tx.transaction_time else 12,
                'day_of_week': tx.transaction_time.weekday() if tx.transaction_time else 0,
                'amount': float(tx.amount) if tx.amount else 0
            })
        
        if data:
            df = pd.DataFrame(data)
            # Ensure correct column order
            if hasattr(model, 'feature_names_in_'):
                print(f"\nModel features: {model.feature_names_in_}")
            
            # Simple prediction with available features
            try:
                prediction = model.predict(df[['hour', 'day_of_week', 'amount']])
                print(f"\n=== 다음 소비 예측 결과 ===")
                print(f"  예측 카테고리 코드: {prediction[0]}")
                print("\n=== PREDICTION TEST PASSED ===")
            except Exception as e:
                print(f"Prediction error: {e}")
                # Try with different features
                print("Trying alternative approach...")
        break

asyncio.run(test_predict_next())
