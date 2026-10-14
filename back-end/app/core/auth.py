from fastapi import APIRouter
import bcrypt
from jose import jwt
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from fastapi import HTTPException, Depends, status, Security
from typing import Annotated
from pydantic import BaseModel as PBaseModel

router = APIRouter(prefix='/auth', tags=['auth'])

class TokenData(PBaseModel):
    username: str | None = None
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = "your-secret"  # REPLACE IT BEFORE PRODUCTION
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(password: str, hashed: str):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))


def create_token(data: dict):
    print(f"testing authhh {oauth2_scheme}")
    return jwt.encode(data, SECRET, algorithm=ALGORITHM)


def decode_token(token: str):
    return jwt.decode(token, SECRET, algorithms=[ALGORITHM])
