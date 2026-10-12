""" Facade class to obfuscate back-end from presentation"""
from sqlalchemy.orm import Session
from app.models.user import UserOrm
from app.models.plan import PlanOrm
from app.schemas.user import UserCreate, UserRead
from app.schemas.plan import PlanCreate
from app.schemas.consumable import ConsumableCreate
from app.core.auth import hash_password, verify_password
from app.core.auth import create_token, decode_token
from fastapi import HTTPException
from app.persistence.user import UserRepository
from app.persistence.plan import PlanRepository
from app.persistence.consumable import ConsumableRepository
from jose.exceptions import JWTError
from app.core.database import get_db
from app.models.consumable import ConsumableOrm
from app.services.r2_duckdb import getDataFromFoodFile

class Facade:

    def __init__(self):
        db = next(get_db())
        self.UserRepo = UserRepository(db)
        self.PlanRepo = PlanRepository(db)
        self.ConsumableRepo = ConsumableRepository(db)

    # Auth queries ----------

    def get_JWT_user(self, auth):
        try:
            id = decode_token(auth)["id"]
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
        print (u)
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
        except HTTPException as e:
            if e.status_code == 404:
                pass
            else:
                raise e

        try:
            self.get_user_email(payload.email)
            print("----Email already exists")
            raise HTTPException(
                status_code=422,
                detail="Email already exists")
        except HTTPException as e:
            if e.status_code == 404:
                pass
            else:
                raise e

        # ORM instance
        user = UserOrm(
            username=payload.username,
            password=hash_password(payload.password),
            email=payload.email,
            height=payload.height,
            weight=payload.weight,
            allergies=payload.allergies,
            favFood=payload.favFood
            )

        # Add to DB, the .duckDB file
        self.UserRepo.add(user)
        # Grant auth token
        return self.login_user(payload.username, payload.password)

    def update_user(self, payload, auth):
        pass

    def delete_user(self, id, auth):
        self.UserRepo.delete(self.get_JWT_user(auth).id)

    def login_user(self, username: str, password: str):
        """ Issue a JWT for a user logging in"""
        u = self.get_user_name(username)[0]
        if verify_password(password, u.password) == False:
            raise HTTPException(
                status_code=401,
                detail="Incorrect password")

        payload = {
            "id": u.id,
            }
        print(f"uid is {u.id}")
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

    def create_plan(self, payload: PlanCreate, user_id: str):
        owner = self.UserRepo.get(user_id)
        if owner is None:
            return {"error": "user dose not exist"}
        plan = PlanOrm(**payload.model_dump(exclude={"consumables"}))
        plan.owner = user_id
        plan.consumables = []
        try:
            self.PlanRepo.add(plan)
            print(f"plann id {plan.id}")
            self.create_consumables([item for item in payload.consumables], plan_id=plan.id)
            self.get_consumable_from_external_file()
        except Exception as e:
            return {"error": str(e)}
        return {"plan id": plan.id}

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

    def create_consumables(self, consumablesData: list[ConsumableCreate], plan_id):
            plan = self.PlanRepo.get(plan_id)
    
            for item in consumablesData:
                consumable = ConsumableOrm(**item.model_dump())
                plan.consumables.append(consumable)
            try:
                self.PlanRepo.commit()
            except Exception as e:
                raise Exception(e)
            print("all consumables created")
    
    def get_consumable_from_external_file(self):
        result = getDataFromFoodFile(10, 3)
        print("---new data testttt--")
        for index, row in result.iterrows():
            print(row["brands_tags"])
        return result