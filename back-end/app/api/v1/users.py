""" Route management for user related requests"""
from app.services import facade
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError
from app.schemas.user import UserCreate, UserLogin, UserRead


router = APIRouter(tags=["User methods"])


# Create user
@router.post("/create")
def create_user(payload: UserCreate):
    print("---Creating user")
    user = facade.create_user(payload)
    return user


# Get all users testing only
@router.get("/")
def get_all_users():
    print("---Retrieving all users")
    return facade.get_all_users()


# Login user
@router.post("/login")
def login_user(payload: UserLogin):
    print("---Authenticating user")
    return facade.login_user(payload.username, payload.password)


# Get user by id
@router.get("/{user_id}")
def get_user(user_id: str):
    print("---Retrieving user")
    return facade.get_user_id(user_id)


# Delete user
@router.delete("/{user_id}")
def delete_user(user_id: str):
    print("---Deleting user")
    return facade.delete_user(user_id)


# View UserPlans
@router.get("/{user_id}/plans")
def UserPlans(user_id: str):

    pass
