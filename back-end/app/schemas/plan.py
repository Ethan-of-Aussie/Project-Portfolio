from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from app.schemas.consumable import ConsumableModel, ConsumableCreate
from app.schemas.nutriments import NutrimentModel

class PlanCreate(BaseModel):
    name: str
    consumables: list[ConsumableCreate]
    #nutriments: list[NutrimentModel] = Field(default_factory=list)
    #allergies: list[str] = Field(default_factory=list)
    #weight: int
    #quantity: int

    class Config:
        from_attributes = True

class PlanUpdate(BaseModel):
    name: str | None = None
    consumables: list[ConsumableCreate] | None = None
    #nutriments: list[NutrimentModel] | None = None
    #allergies: list[str] | None = None
    #weight: int | None = None
    #quantity: int | None = None

    class Config:
        from_attributes = True


class PlanModel(BaseModel):
    owner: UUID
    name: str
    consumables: list[ConsumableModel]
    #nutriments: list[NutrimentModel] = Field(default_factory=list)
    #allergies: list[str]
    #weight: int
    #quantity: int

    class Config:
        from_attributes = True
