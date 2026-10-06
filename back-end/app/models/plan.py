import uuid
from sqlalchemy import String, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from models.consumable import ConsumableOrm

class Base(DeclarativeBase):
    pass

class PlanOrm(Base):
    __tablename__ = 'plans'

    id: Mapped[str] = mapped_column(String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
        )
    
    name: Mapped[str] = mapped_column(String, nullable=False)
    consumables: Mapped[list["ConsumableOrm"]] = relationship(
        back_populates=None,
        cascade="all, delete-orphan"
    )
    nutrients: Mapped[dict[str, float]] = mapped_column(JSON, nullable=False, default=dict)
