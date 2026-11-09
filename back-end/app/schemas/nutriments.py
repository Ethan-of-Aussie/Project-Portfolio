from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Any

class NutrimentModel(BaseModel):
    name: str | None
    value: Any
    value_100g: Any
    serving: Any
    unit: str | None
    prepared_value: Any
    prepared_100g: Any
    prepared_serving: Any
    prepared_unit: Any

    class Config:
        from_attributes = True
