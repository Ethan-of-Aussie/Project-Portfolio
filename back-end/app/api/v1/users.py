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
# api = Namespace('users', description='User operations')

#@api.route("/")
#class User(Resource):
    #def get(self):
        #result = conn.execute("""
          #  SELECT *
         #   FROM read_parquet('s3://dietplan/food.parquet')
         #   LIMIT 10
       # """).fetchdf()
       # print(f"result {result}")
       # data = duckdb.sql("SELECT * FROM 'analytical-data/en.openfoodfacts.org.products.csv.gz' LIMIT 100 OFFSET 99")
       # print(result)
       # return "Cat is not a user", 200