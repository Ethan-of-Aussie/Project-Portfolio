"""Class defining behaviours for CRUDing user data"""
from app.persistence.repository import DuckDBRepository
from app.models.user import UserOrm

class UserRepository(DuckDBRepository):

    def __init__(self):
        super().__init__(UserOrm)
