"""Class defining behaviours for CRUDing user data"""
from app.persistence.repository import SQLAlchemyRepository
from app.models.user import UserOrm

class UserRepository(SQLAlchemyRepository):

    def __init__(self, db):
        super().__init__(UserOrm, db)
