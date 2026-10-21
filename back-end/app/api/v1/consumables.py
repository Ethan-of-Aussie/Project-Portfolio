from typing import Annotated

from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Header, HTTPException, Security
from app.schemas.plan import PlanCreate, PlanModel
from app.core.auth import oauth2_scheme, decode_token
import json

router = APIRouter(tags=["Consumables methods"])

@router.get("/sciencedata")
def getExternalConsumable(token: Annotated[str, Depends(oauth2_scheme)]):
    consumables = facade.get_consumable_from_external_file()
    display_consumables = json.loads(
        consumables.to_json(orient="records")
    )
    return {"consumables": display_consumables}

@router.get("/sciencedata/filter")
def getFilteredExternalConsumable(trait: str):
    print("trait:", trait)
    consumables = facade.get_filtered_consumable_from_external_file(trait)
    display_consumables = json.loads(
        consumables.to_json(orient="records")
    )
    return {"consumables": display_consumables}

@router.get("/sciencedata/filtertest")
def testGetExternalConsumable():
    consumables = facade.test_get_filtered_consumable_from_external_file()
    display_consumables = json.loads(
        consumables.to_json(orient="records")
    )
    return {"consumables": display_consumables}
