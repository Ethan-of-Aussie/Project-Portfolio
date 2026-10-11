from typing import Annotated

from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Header, HTTPException, Security
from app.schemas.plan import PlanCreate, PlanModel
from app.core.auth import oauth2_scheme, decode_token

router = APIRouter(tags=["Plan methods"])


@router.post("/create")
def create_plan(
                token: Annotated[str, Depends(oauth2_scheme)]
                ,user_id: str, 
                payload: PlanCreate
                ):
    id = decode_token(token=token).get("id")
    print("---Creating plan")
    # return {"test plan": f"plan is created {id}"}
    return facade.create_plan(payload)


@router.get("/{plan_id}", response_model=PlanModel)
def get_plan(plan_id: str):
    return facade.get_plan(plan_id)


@router.patch("/{plan_id}", response_model=PlanModel)
def update_plan(plan_id: str, auth: str = Header()):  # Not sure if we need a new pydantic schema for a payload: schema
    return facade.update_plan(plan_id, auth)


@router.delete("/{plan_id}")
def delete_plan(plan_id: str, auth: str = Header()):
    return facade.delete_plan(plan_id, auth)
