from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from typing import Any

class Nutriments(BaseModel):
    name: str | None
    value: float | None
    value_100g: float | None
    serving: float | None
    unit: str | None
    prepared_value: float | None
    prepared_100g: float | None
    prepared_serving: float | None
    prepared_unit: str | None

class ConsumableCreate(BaseModel):
    # id: UUID | None = None
    product: str
    code: str
    nutriments: list[dict[str, Any]] = Field(default_factory=list)
    # weight: float ""
    # quantity: int ""
    allergies: list[str] = Field(default_factory=list)

    class Config:
        from_attributes = True


class ConsumableModel(BaseModel):
    id: UUID
    product: str
    code: str
    nutriments: list[dict[str, Any]]
    # weight: float ""
    # quantity: int ""
    allergies: list[str]

    class Config:
        from_attributes = True

