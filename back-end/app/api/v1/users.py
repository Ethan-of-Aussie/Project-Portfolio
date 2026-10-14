""" Route management for user related requests"""
from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import ValidationError
from app.schemas.user import UserCreate, UserLogin, UserRead, UserUpdate

router = APIRouter(tags=["User methods"])


# Create user
@router.post("/create")
def create_user(payload: UserCreate):
    print("---Creating user")
    return facade.create_user(payload)


# Get all users testing only
@router.get("/")
def get_all_users():
    print("---Retrieving all users")
    return facade.get_all_users()


# Login user
@router.post("/login")
def login_user(payload: UserLogin):
    print("---Authenticating user")
    print(payload)
    return facade.login_user(payload.username, payload.password)

# Get user by id
@router.get("/{user_id}")
def get_user(user_id: str):
    print("---Retrieving user")
    return facade.get_user_id(user_id)


# Update user info
@router.patch("/{user_id}")
def update_user(user_id: str, payload: UserUpdate, auth: str = Header()):
    print("--Updating user")
    return facade.update_user(user_id, payload, auth)


# Delete user
@router.delete("/{user_id}")
def delete_user(user_id: str, auth: str = Header()):
    print("---Deleting user")
    return facade.delete_user(user_id, auth)


# View UserPlans
@router.get("/{user_id}/plans")
def UserPlans(user_id: str):
    print("---Getting user's plans")
    return facade.get_plans_by_user(user_id)
