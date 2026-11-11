"""Model for expected rows in consumables table"""
from sqlalchemy import String, JSON, Float, Integer, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from app.models.base_model import BaseModel
from typing import Any


class ConsumableOrm(BaseModel):
    __tablename__ = 'consumables'

    name: Mapped[str] = mapped_column(
        String,
        nullable=False)

    code: Mapped[str] = mapped_column(
        String,
        nullable=False,
        default=0)
    
    nutriments: Mapped[dict[str, Any]] = mapped_column(
        JSON,
        nullable=True,
        default=dict)

    weight: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=0)

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0)
    

    allergies: Mapped[list[str]] = mapped_column(
        JSON,
        default=list)
