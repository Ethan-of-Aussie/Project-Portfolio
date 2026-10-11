"""Class defining behaviours for CRUDing user data"""
from app.persistence.repository import SQLAlchemyRepository
from app.models.plan import PlanOrm

class PlanRepository(SQLAlchemyRepository):

    def __init__(self, db):
        super().__init__(PlanOrm, db)
