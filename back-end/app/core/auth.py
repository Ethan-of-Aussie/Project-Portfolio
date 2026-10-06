from fastapi import APIRouter
import bcrypt
from jose import jwt

router = APIRouter(prefix='/auth', tags=['auth'])

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = "your-secret"  # REPLACE IT BEFORE PRODUCTION
ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def verify_password(plain: str, hashed: str):
    return bcrypt.checkpw(password.encode('utf-8'), hashed)


def create_token(data: dict):
    return jwt.encode(data, SECRET, algorithm=ALGORITHM)


def decode_token(token: str):
    return jwt.decode(token, SECRET, algorithms=[ALGORITHM])
