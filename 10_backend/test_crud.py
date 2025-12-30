import asyncio
from app.db.database import get_db
from app.db.model.transaction import Transaction
from sqlalchemy import select

async def test():
    async for db in get_db():
        # Count transactions
        result = await db.execute(select(Transaction).limit(1))
        tx = result.scalar()
        print(f'Sample TX: id={tx.id}, merchant={tx.merchant_name}, amount={tx.amount}')
        
        # Create new transaction
        new_tx = Transaction(user_id=53, category_id=5, amount=9999, merchant_name='API_TEST', currency='KRW', status='completed')
        db.add(new_tx)
        await db.commit()
        await db.refresh(new_tx)
        print(f'CREATE OK: id={new_tx.id}')
        
        # Delete it
        await db.delete(new_tx)
        await db.commit()
        print(f'DELETE OK: id={new_tx.id}')
        
        print('=== CRUD TEST PASSED ===')
        break

asyncio.run(test())
