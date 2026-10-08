""" Facade class to obfuscate back-end from presentation"""
from sqlalchemy.orm import Session
from app.models.user import UserOrm
from app.schemas.user import UserCreate, UserRead
from app.core.auth import hash_password, verify_password, create_token
from fastapi import HTTPException
from app.persistence.user import UserRepository

class Facade:

    def __init__(self):
        self.UserRepo = UserRepository()

    # User queries ----------

    def get_user_id(self, id):
        try:
            return self.UserRepo.get(id)
        except KeyError:
            raise HTTPException(
                status_code=404,
                detail="User not found")

    def get_username(self, username):
        u = self.UserRepo.get_by_attribute(UserOrm.username, username)
        if u == None or len(u) == 0:
            raise HTTPException(
                status_code=404,
                detail="User not found")
        return u

    def get_user_email(self, email):
        u = self.UserRepo.get_by_attribute(UserOrm.email, email)
        if u == None or len(u) == 0:
            raise HTTPException(
                status_code=404,
                detail="User not found")
        return u

    def get_all_users(self):
        return self.UserRepo.get_all()

    def create_user(self, payload: UserCreate):
        # Validating existing account
        try:
            self.get_username(payload.username)
            print("----Username already exists")
            raise HTTPException(
                status_code=422,
                detail="Username already exists")
        except:
            pass

        try:
            self.get_user_email(payload.email)
            print("----Email already exists")
            raise HTTPException(
                status_code=422,
                detail="Email already exists")
        except:
            pass

        # ORM instance
        user = UserOrm(
            username=payload.username,
            password=hash_password(payload.password),
            email=payload.email
            )

        # Add to DB, the .duckDB file
        self.UserRepo.add(user)

        # Refresh generated fields like id
        #db.refresh(user)
        return user

    def update_user(self, payload, db: Session):
        pass

    def delete_user(self, id):
        self.get_user_id(id)
        self.UserRepo.delete(id)
        pass

    def login_user(self, username: str, password: str):
        """ Issue a JWT for a user logging in"""
        u = self.get_username(username)[0]
        if verify_password(password, u.password) == False:
            raise HTTPException(
                status_code=401,
                detail="Incorrect password")

        payload = {
            "sub": u.username,
            }
        return create_token(payload)

    # Plan queries ----------

    def get_plan(self, payload, db: Session):
        pass

    def get_plans_by_user(self, payload, db: Session):
        pass

    def create_plan(self, payload, db: Session):
        pass

    def update_plan(self, payload, db: Session):
        pass

    # Consumable queries ----------
