from typing import Annotated

from app.services.facade import Facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Header, HTTPException, Security
from app.schemas.plan import PlanCreate, PlanModel
from app.core.auth import oauth2_scheme, decode_token
import json

router = APIRouter(tags=["Consumables methods"])

@router.get("/sciencedata")
def getExternalConsumable(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    facade = Facade(db)
    consumables = facade.get_consumable_from_external_file()
    display_consumables = json.loads(
        consumables.to_json(orient="records")
    )
    return {"consumables": display_consumables}

@router.get("/sciencedata/filter")
def getFilteredExternalConsumable(trait: str, limit: int, offset: int, db: Session = Depends(get_db)):
    print("trait:", trait)
    facade = Facade(db)
    consumables = facade.get_filtered_consumable_from_external_file(trait, limit, offset)
    display_consumables = json.loads(
        consumables.to_json(orient="records")
    )
    return {"consumables": display_consumables}

@router.get("/sciencedata/search")
def getSearchedExternalConsumable(string: str, limit: int, offset: int, db: Session = Depends(get_db)):
    print("Product Name:", string)
    facade = Facade(db)
    consumables = facade.get_searched_consumable_from_external_file(string, limit, offset)
    display_consumables = json.loads(
        consumables.to_json(orient="records")
    )
    return {"consumables": display_consumables}

@router.get("/sciencedata/filtertest")
def testGetExternalConsumable(limit: int, offset: int, db: Session = Depends(get_db)):
    facade = Facade(db)
    consumables = facade.test_get_filtered_consumable_from_external_file(limit, offset)
    display_consumables = json.loads(
        consumables.to_json(orient="records")
    )
    return {"consumables": display_consumables}
