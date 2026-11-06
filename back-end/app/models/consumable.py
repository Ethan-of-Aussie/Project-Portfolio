"""Model for expected rows in consumables table"""
from sqlalchemy import String, JSON, Float, Integer, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from app.models.base_model import BaseModel
from typing import Any
from app.schemas.consumable import Nutriments

class ConsumableOrm(BaseModel):
    __tablename__ = 'consumables'

    product: Mapped[str] = mapped_column(
        String)

    code: Mapped[str] = mapped_column(
        String,
        nullable=False)
    
    nutriments: Mapped[list[dict[str, Any]]] = mapped_column(
        JSON,
        nullable=True,
        default=list)

    weight: Mapped[float] = mapped_column(
        Float,
        nullable=True,
        default=0)

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
        default=0)
    

    allergies: Mapped[list[str]] = mapped_column(
        JSON,
        default=list)
