"""Model for expected rows in plans table"""
from sqlalchemy import String, JSON, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.models.base_model import BaseModel
from app.models.consumable import ConsumableOrm
from app.models.consumable_and_plan import consumableAndPlanOrm
from app.models.consumable import ConsumableOrm


class PlanOrm(BaseModel):
    __tablename__ = 'plans'

    owner: Mapped[str] = mapped_column(ForeignKey("users.id"))
    name: Mapped[str] = mapped_column(String, nullable=False)

    children: Mapped[list[ConsumableOrm]] = relationship(secondary=consumableAndPlanOrm)

    consumables: Mapped[list["ConsumableOrm"]] = relationship(
        back_populates=None,
        cascade="all, delete-orphan"
    )

    nutrients: Mapped[dict[str, float]] = mapped_column(
        JSON,
        nullable=False,
        default=dict)
