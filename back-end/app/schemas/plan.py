from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from app.schemas.consumable import ConsumableModel

class PlanCreate(BaseModel):
    id: UUID | None = None
    name: str
    consumables: list[ConsumableModel]
    nutrients: dict[str, float] = Field(default_factory=dict)
    
    class Config:
        from_attributes = True

class PlanModel(BaseModel):
    name: str
    consumables: list[ConsumableModel]
    nutrients: dict[str, float]
    
    class Config:
        from_attributes = True
