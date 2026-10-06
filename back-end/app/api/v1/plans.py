from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.plan import PlanCreate, PlanModel

router = APIRouter()

@router.post("/{user_id}", response_model=PlanModel)
def create_plan(user_id: str, payload: PlanCreate, db: Session = Depends(get_db)):
    pass

@router.get("/{plan_id}", response_model=PlanModel)
def get_plan(plan_id: str, db: Session = Depends(get_db)):
    pass

@router.patch("/{plan_id}", response_model=PlanModel)
def update_plan(plan_id: str, db: Session = Depends(get_db)): # Not sure if we need a new pydantic schema for a payload: schema
    pass

@router.delete("/{plan_id}")
def delete_plan(plan_id: str, db: Session = Depends(get_db)):
    pass
