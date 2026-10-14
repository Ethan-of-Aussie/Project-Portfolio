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
                token: Annotated[str, Depends(oauth2_scheme)],
                payload: PlanCreate
                ):
    id = decode_token(token=token).get("id")
    print("---Creating plan")
    return facade.create_plan(payload, id)

@router.get("/userplans", response_model=list[PlanModel])
def get_user_plan(
    token: Annotated[str, Depends(oauth2_scheme)]
):
    id = decode_token(token=token).get("id")
    return facade.get_plans_by_user(id)

@router.get("/{plan_id}", response_model=PlanModel)
def get_plan(plan_id: str):
    return facade.get_plan(plan_id)


@router.patch("/{plan_id}", response_model=PlanModel)
def update_plan(plan_id: str, auth: str = Header()):  # Not sure if we need a new pydantic schema for a payload: schema
    return facade.update_plan(plan_id, auth)


@router.delete("/{plan_id}")
def delete_plan(plan_id: str, auth: str = Header()):
    return facade.delete_plan(plan_id, auth)
