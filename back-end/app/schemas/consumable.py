from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


class ConsumableCreate(BaseModel):
    id: UUID | None = None
    diet_plan_id: str
    name: str
    nutrients: dict[str, float] = Field(default_factory=dict)
    weight: float
    quantity: int
    allergies: list[str] = Field(default_factory=[])
   
    class Config:
        orm_mode = True

class ConsumableModel(BaseModel):
    id: UUID
    diet_plan_id: str
    name: str
    nutrients: dict[str, float]
    weight: float
    quantity: int
    allergies: list[str]
   
    class Config:
        orm_mode = True
