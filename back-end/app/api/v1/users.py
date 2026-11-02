""" Route management for user related requests"""
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import ValidationError
from app.schemas.user import UserCreate, UserLogin, UserRead, UserUpdate
from app.services.facade import Facade



router = APIRouter(tags=["User methods"])


# Create user
@router.post("/create")
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    print("---Creating user")
    facade = Facade(db)
    return facade.create_user(payload)


# Get all users testing only
@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    print("---Retrieving all users")
    facade = Facade(db)
    return facade.get_all_users()


# Login user
@router.post("/login")
def login_user(payload: UserLogin, db: Session = Depends(get_db)):
    print("---Authenticating user")
    print(payload)
    facade = Facade(db)
    return facade.login_user(payload.username, payload.password)

# Get user by id
@router.get("/{user_id}")
def get_user(user_id: str, db: Session = Depends(get_db)):
    print("---Retrieving user")
    facade = Facade(db)
    return facade.get_user_id(user_id)


# Update user info
@router.patch("/{user_id}")
def update_user(user_id: str, payload: UserUpdate, auth: str = Header(), db: Session = Depends(get_db)):
    print("--Updating user")
    facade = Facade(db)
    return facade.update_user(user_id, payload, auth)


# Delete user
@router.delete("/{user_id}")
def delete_user(user_id: str, auth: str = Header(), db: Session = Depends(get_db)):
    print("---Deleting user")
    facade = Facade(db)
    return facade.delete_user(user_id, auth)


# View UserPlans
@router.get("/{user_id}/plans")
def UserPlans(user_id: str, db: Session = Depends(get_db)):
    print("---Getting user's plans")
    facade = Facade(db)
    return facade.get_plans_by_user(user_id)
