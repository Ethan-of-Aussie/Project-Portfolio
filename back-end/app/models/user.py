#!/usr/bin/python3


from pydantic import BaseModel, EmailStr, Field
import uuid
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass

class UserOrm(Base):
    __tablename__ = 'users'

    id: Mapped[str] = mapped_column(String,
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        nullable=False
        )
    
    username: Mapped[str] = mapped_column(String, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)

    Height: Mapped[int] = mapped_column(nullable=False, default=0)
    Weight: Mapped[int] = mapped_column(nullable=False, default=0)

    allergies: Mapped[str] = mapped_column(String, default="[]")
    FavFood: Mapped[str] = mapped_column(String, default="[]")
    customPlans: Mapped[str] = mapped_column(String, default="[]")
