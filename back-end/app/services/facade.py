""" Facade class to obfuscate back-end from presentation"""
from sqlalchemy.orm import Session
from app.models.user import UserOrm
from app.schemas.user import UserCreate, UserRead
from app.schemas.plan import PlanCreate
from app.core.auth import hash_password, verify_password
from app.core.auth import create_token, decode_token
from fastapi import HTTPException
from app.persistence.user import UserRepository
from app.persistence.plan import PlanRepository
from jose.exceptions import JWTError

class Facade:

    def __init__(self):
        self.UserRepo = UserRepository()
        self.PlanRepo = PlanRepository()

    # Auth queries ----------

    def get_JWT_user(self, auth):
        try:
            id = decode_token(auth)["sub"]
            return self.get_user_id(id)
        except JWTError, KeyError:
            raise HTTPException(
                status_code=401,
                detail="Invalid token")

    # User queries ----------

    def get_user_id(self, id):
        try:
            return self.UserRepo.get(id)
        except KeyError:
            raise HTTPException(
                status_code=404,
                detail="User not found")

    def get_user_name(self, username):
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
            self.get_user_name(payload.username)
            print("----Username already exists")
            raise HTTPException(
                status_code=422,
                detail="Username already exists")
        except:
            pass

        try:
            self.get_user_id_email(payload.email)
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

    def update_user(self, payload, auth):
        pass

    def delete_user(self, auth):
        self.UserRepo.delete(self.get_JWT_user(auth))

    def login_user(self, username: str, password: str):
        """ Issue a JWT for a user logging in"""
        u = self.get_username(username)[0]
        if verify_password(password, u.password) == False:
            raise HTTPException(
                status_code=401,
                detail="Incorrect password")

        payload = {
            "sub": u.id,
            }
        return create_token(payload)

    # Plan queries ----------

    def get_plan(self, id):
        try:
            return self.PlanRepo.get(id)
        except KeyError:
            raise HTTPException(
                status_code=404,
                detail="Plan not found")

    def get_plans_by_user(self, payload):
        pass

    def create_plan(self, payload, auth):
        pass

    def update_plan(self, payload, auth):
        pass

    def delete_plan(self, id, auth):
        user_id = self.get_JWT_user(auth).id
        plan = self.get_plan(id)
        if user_id is not plan.owner:
            raise HTTPException(
                status_code=403,
                detail="User not permitted to edit this")
        self.PlanRepo.delete(id)
        return 200

    # Consumable queries ----------
