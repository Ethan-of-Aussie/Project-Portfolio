import uuid
from datetime import datetime
from sqlalchemy import String, DateTime
from sqlalchemy.orm import declarative_base, Mapped, mapped_column

Base = declarative_base()


class BaseModel(Base):
    __abstract__ = True

    id: Mapped[str] = mapped_column(
        String(),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
        )
    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=datetime.utcnow)
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime,
        default=datetime.utcnow)
