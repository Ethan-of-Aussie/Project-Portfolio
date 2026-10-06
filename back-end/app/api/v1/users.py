""" Route management for user related requests"""
from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError
from app.schemas.user import UserCreate, UserLogin, UserRead


router = APIRouter(tags=["User methods"])


# Create user
@router.post("/")
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    print("---Creating user")
    user = facade.create_user(payload, db)
    return user

# Get all users testing only
@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    return facade.get_all_users(db)

# Login user
@router.post("/login")
def login_user(payload: UserLogin, db: Session = Depends(get_db)):

    pass


# Get user by id
@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: str, db: Session = Depends(get_db)):

    pass


# Delete user
@router.delete("/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):

    pass


# View UserPlans
@router.get("/{user_id}/plans")
def UserPlans(user_id: str, db: Session = Depends(get_db)):

    pass
