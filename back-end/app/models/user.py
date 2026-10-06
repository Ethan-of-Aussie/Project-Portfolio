"""Model for expected rows in users table"""
from sqlalchemy import String, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from app.models.base_model import BaseModel


class UserOrm(BaseModel):
    __tablename__ = 'users'

    username: Mapped[str] = mapped_column(String, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)

    height: Mapped[int] = mapped_column(nullable=False, default=0)
    weight: Mapped[int] = mapped_column(nullable=False, default=0)

    allergies: Mapped[list[str]] = mapped_column(JSON, default=list)
    favFood: Mapped[list[str]] = mapped_column(JSON, default=list)
    customPlans: Mapped[list[str]] = mapped_column(JSON, default=list)

    # Password hashing ----------
    def hash_password(self, password):
        return password

    def verify_password(self, password):
        return password == self.password
