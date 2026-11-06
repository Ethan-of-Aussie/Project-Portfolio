from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from app.schemas.consumable import ConsumableModel, ConsumableCreate
from typing import Any
from app.schemas.consumable import Nutriments


class PlanCreate(BaseModel):
    name: str
    consumables: list[ConsumableCreate]
    nutriments: list[dict[str, Any]] = Field(default_factory=list)

    class Config:
        from_attributes = True

class PlanUpdate(BaseModel):
    name: str | None = None
    consumables: list[ConsumableCreate] | None = None
    nutriments: list[dict[str, Any]] | None = None 

    class Config:
        from_attributes = True


class PlanModel(BaseModel):
    owner: UUID
    name: str
    consumables: list[ConsumableModel]
    nutriments: list[dict[str, Any]]

    class Config:
        from_attributes = True
