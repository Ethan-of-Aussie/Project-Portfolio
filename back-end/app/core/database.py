from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.base_model import Base

engine = create_engine(
    "duckdb:///local.duckdb",
    connect_args={"read_only": False}
    )
Base.metadata.create_all(engine) 
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
    db = SessionLocal()
    try:
        yield db

    finally:
        db.close()
