from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from app.schemas.consumable import ConsumableModel, ConsumableCreate


class PlanCreate(BaseModel):
    name: str
    consumables: list[ConsumableCreate]
    nutrients: dict[str, float] = Field(default_factory=dict)

    class Config:
        from_attributes = True

class PlanUpdate(BaseModel):
    name: str | None = None
    consumables: list[ConsumableCreate] | None = None
    nutrients: dict[str, float] | None = None

    class Config:
        from_attributes = True


class PlanModel(BaseModel):
    owner: UUID
    name: str
    consumables: list[ConsumableModel]
    nutrients: dict[str, float]

    class Config:
        from_attributes = True
