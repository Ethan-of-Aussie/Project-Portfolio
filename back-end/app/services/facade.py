""" Facade class to obfuscate back-end from presentation"""
from sqlalchemy.orm import Session
from app.models.user import UserOrm
from app.core.auth import hash_password
from fastapi import HTTPException


class Facade:
    def __init__(self):
        pass

    # User queries ----------

    def get_user_name(payload, db: Session):
        pass

    def get_user_email(payload, db: Session):
        pass

    def get_all_users(db: Session):
        return db.query(UserOrm).all()

    def create_user(payload: UserCreate, db: Session):
        # Validating existing account
        existing_un = db.query(UserOrm).filter(UserOrm.username == payload.username).first()
        if existing_un:
            print("----Username already exists")
            raise HTTPException(status_code=422, detail="Username already exists")

        existing_e = db.query(UserOrm).filter(UserOrm.email == payload.email).first()
        if existing_e:
            print("----Email already exists")
            raise HTTPException(status_code=422, detail="Email already exists")

        # ORM instance
        user = UserOrm(
            username=payload.username,
            password=hash_password(payload.password),
            email=payload.email
            )

        # Add to DB, the .duckDB file
        db.add(user)
        db.commit()

        # Refresh generated fields like id
        db.refresh(user)
        return user

    def update_user(payload, db: Session):
        pass

    def delete_user(payload, db: Session):
        pass

    # Plan queries ----------

    def get_plan(payload, db: Session):
        pass

    def get_plans_by_user(payload, db: Session):
        pass

    def create_plan(payload, db: Session):
        pass

    def update_plan(payload, db: Session):
        pass

    # Consumable queries ----------
