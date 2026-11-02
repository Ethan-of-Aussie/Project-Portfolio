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
    height: int
    weight: int
    allergies: list[str]
    favFood: list[str]

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    username: str | None = None
    password: str | None = None
    email: EmailStr | None = None
    height: int | None = None
    weight: int | None = None
    allergies: list[str] | None = None
    favFood: list[str] | None = None

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str
