from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, JSON, Float, Integer, ForeignKey, Table, Column
from app.models.base_model import BaseModel

consumableAndPlanOrm = Table(
    "consumable_and_plan",
    BaseModel.metadata,
    Column("plan_id", ForeignKey("plans.id")),
    Column("consumable_id", ForeignKey("consumables.id")),
)