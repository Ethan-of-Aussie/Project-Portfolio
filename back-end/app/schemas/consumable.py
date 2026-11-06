from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from app.schemas.nutriments import NutrimentModel

class ConsumableCreate(BaseModel):
    # id: UUID | None = None
    name: str
    code: str
    nutriments: list[NutrimentModel] = Field(default_factory=list)
    weight: float
    quantity: int
    allergies: list[str] = Field(default_factory=list)

    class Config:
        from_attributes = True


class ConsumableModel(BaseModel):
    id: UUID
    name: str
    code: str
    nutriments: list[NutrimentModel]
    weight: float
    quantity: int
    allergies: list[str]

    class Config:
        from_attributes = True
