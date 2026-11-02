from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


class ConsumableCreate(BaseModel):
    # id: UUID | None = None
    name: str
    code: int
    nutrients: dict[str, float] = Field(default_factory=dict)
    weight: float
    quantity: int
    allergies: list[str] = Field(default_factory=[])

    class Config:
        from_attributes = True


class ConsumableModel(BaseModel):
    id: UUID
    name: str
    code: int
    nutrients: dict[str, float]
    weight: float
    quantity: int
    allergies: list[str]

    class Config:
        from_attributes = True
