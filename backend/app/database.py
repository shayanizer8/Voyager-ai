import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ["DATABASE_URL"]

# Establishes connection pool configurations for handling multi-agent async requests
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True  # Automatically checks/reconnects dropped database links
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency injection lifecycle hook to yield database sessions to FastAPI routers."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()