#!/usr/bin/env python3
from app.database import SessionLocal
from app.models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
db = SessionLocal()

# Check if user exists
existing = db.query(User).filter(User.email == 'test@test.com').first()
if existing:
    print('User already exists:', existing.email)
else:
    # Create test user
    new_user = User(
        name='TestUser',
        email='test@test.com',
        hashed_password=pwd_context.hash('test123')
    )
    db.add(new_user)
    db.commit()
    print('Created test user: test@test.com')
db.close()
