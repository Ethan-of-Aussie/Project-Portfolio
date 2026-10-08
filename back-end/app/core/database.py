from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base_model import Base

def duckdb_engine():
    return create_engine(
    "duckdb:///local.duckdb",
    connect_args={"read_only": False}
    )

engine = duckdb_engine()
Base.metadata.create_all(engine)
engine.dispose()

engine = duckdb_engine()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db

    finally:
        db.close()
