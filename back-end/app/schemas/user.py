from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr
    height: int = 0
    weight: int = 0
    allergies: list[str] = Field(default_factory=list)
    favFood: list[str] = Field(default_factory=list)

    class Config:
        from_attributes = True


class UserRead(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    Height: int
    Weight: int
    allergies: list[str]
    FavFood: list[str]

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str
