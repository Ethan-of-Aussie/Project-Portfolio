"""Model for expected rows in plans table"""
from sqlalchemy import String, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.models.base_model import BaseModel
from models.consumable import ConsumableOrm


class PlanOrm(BaseModel):
    __tablename__ = 'plans'

    name: Mapped[str] = mapped_column(
        String,
        nullable=False)

    consumables: Mapped[list["ConsumableOrm"]] = relationship(
        back_populates=None,
        cascade="all, delete-orphan"
    )

    nutrients: Mapped[dict[str, float]] = mapped_column(
        JSON,
        nullable=False,
        default=dict)
