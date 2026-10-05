from fastapi import APIRouter
from passlib.context import CryptContext
from jose import jwt

router = APIRouter(prefix='/auth', tags=['auth'])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = "your-secret" # REPLACE IT BEFORE PRODUCTION
ALGORITHM = "HS256"

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_token(data: dict):
    return jwt.encode(data, SECRET, algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, SECRET, algorithms=[ALGORITHM])