from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base_model import Base

def duckdb_engine():
    return create_engine(
    "duckdb:///local.duckdb",
    connect_args={"read_only": False},
    echo=True
    )

def get_db():
    engine = duckdb_engine()
    print("here")
    Base.metadata.create_all(bind=engine)
    engine.dispose()

    engine = duckdb_engine()
    SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    db = SessionLocal()
    try:
        yield db

    finally:
        db.close()
