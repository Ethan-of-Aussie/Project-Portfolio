from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserCreate, UserLogin, UserRead



router = APIRouter()


# Create user
@router.post("/", response_model=UserRead)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):

    pass

# Login user
@router.post("/login")
def login_user(payload: UserLogin, db: Session = Depends(get_db)):

    pass

# Get user by id
@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: str, db: Session = Depends(get_db)):

    pass

# Delete user
@router.delete("/user_id")
def delete_user(user_id: str, db: Session = Depends(get_db)):
   
    pass

# View UserPlans
@router.get("/{user_id}/plans")
def UserPlans(user_id: str, db: Session = Depends(get_db)):

    pass
