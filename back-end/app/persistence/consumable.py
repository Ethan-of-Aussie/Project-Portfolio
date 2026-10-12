"""Class defining behaviours for CRUDing user data"""
from app.persistence.repository import SQLAlchemyRepository
from app.models.consumable import ConsumableOrm

class ConsumableRepository(SQLAlchemyRepository):

    def __init__(self, db):
        super().__init__(ConsumableOrm, db)
