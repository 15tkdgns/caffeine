import asyncio
from datetime import datetime, timedelta
from app.db.database import get_db
from app.db.model.transaction import UserCoupon, CouponTemplate
from sqlalchemy import select

async def test_coupon():
    async for db in get_db():
        # 1. 쿠폰 템플릿 조회
        result = await db.execute(select(CouponTemplate).limit(3))
        templates = result.scalars().all()
        print("=== 쿠폰 템플릿 조회 ===")
        for t in templates:
            print(f"  ID={t.id}, Title={t.title}, Discount={t.discount_value}")
        
        # 2. 사용자 쿠폰 조회 (user_id=53)
        result = await db.execute(select(UserCoupon).where(UserCoupon.user_id == 53).limit(3))
        user_coupons = result.scalars().all()
        print("\n=== 사용자 쿠폰 (user_id=53) ===")
        for uc in user_coupons:
            print(f"  ID={uc.id}, Code={uc.code}, Status={uc.status}")
        
        # 3. 쿠폰 발급 테스트
        if templates:
            import uuid
            new_coupon = UserCoupon(
                user_id=53,
                template_id=templates[0].id,
                code=f"TEST-{uuid.uuid4().hex[:8].upper()}",
                status="available",
                valid_until=datetime.now() + timedelta(days=30)
            )
            db.add(new_coupon)
            await db.commit()
            await db.refresh(new_coupon)
            print(f"\n=== 쿠폰 발급 테스트 ===")
            print(f"  발급 OK: ID={new_coupon.id}, Code={new_coupon.code}")
            
            # 삭제
            await db.delete(new_coupon)
            await db.commit()
            print(f"  삭제 OK: ID={new_coupon.id}")
        
        print("\n=== COUPON TEST PASSED ===")
        break

asyncio.run(test_coupon())
