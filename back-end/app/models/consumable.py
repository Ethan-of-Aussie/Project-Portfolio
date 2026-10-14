"""Model for expected rows in consumables table"""
from sqlalchemy import String, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from app.models.base_model import BaseModel


class ConsumableOrm(BaseModel):
    __tablename__ = 'consumables'

    diet_plan_id: Mapped[str] = mapped_column(
        String,
        nullable=False)

    name: Mapped[str] = mapped_column(
        String,
        nullable=False)

    nutrients: Mapped[dict[str, float]] = mapped_column(
        JSON,
        nullable=False,
        default=dict)

    weight: Mapped[float] = mapped_column(
        float,
        nullable=False,
        default=0)

    quantity: Mapped[int] = mapped_column(
        int,
        nullable=False,
        default=0)

    allergies: Mapped[list[str]] = mapped_column(
        JSON,
        default=list)
