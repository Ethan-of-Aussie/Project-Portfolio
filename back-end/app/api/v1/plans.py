from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Header, HTTPException
from app.schemas.plan import PlanCreate, PlanModel

router = APIRouter(tags=["Plan methods"])


@router.post("/create")
def create_plan(user_id: str, payload: PlanCreate, auth: str = Header()):
    print("---Creating plan")
    return facade.create_plan(payload, auth)


@router.get("/{plan_id}", response_model=PlanModel)
def get_plan(plan_id: str):
    return facade.get_plan(plan_id)


@router.patch("/{plan_id}", response_model=PlanModel)
def update_plan(plan_id: str, auth: str = Header()):  # Not sure if we need a new pydantic schema for a payload: schema
    return facade.update_plan(plan_id, auth)


@router.delete("/{plan_id}")
def delete_plan(plan_id: str, auth: str = Header()):
    return facade.delete_plan(plan_id, auth)
