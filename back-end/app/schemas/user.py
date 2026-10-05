
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID

class UserCreate(BaseModel):
    id: UUID | None = None
    username: str
    password: str
    email: EmailStr
    Height: int = 0
    Weight: int = 0
    allergies: list[str] = Field(default_factory=list)
    FavFood: list[str] = Field(default_factory=list)
    customPlans: list[str] = Field(default_factory=list)  

    class Config:
        orm_mode = True

class UserRead(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    Height: int
    Weight: int
    allergies: list[str]
    FavFood: list[str]
    customPlans: list[str] 

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str