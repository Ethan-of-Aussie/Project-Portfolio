# from flask import Flask
# from flask_restx import Api
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
from fastapi import FastAPI
from app.core.database import get_db

duckDB = next(get_db())

from app.api.v1.users import router as users_router
from app.api.v1.plans import router as plans_router
from fastapi.middleware.cors import CORSMiddleware



def create_app():

    app = FastAPI()

    app.include_router(users_router, prefix="/api/v1/users")
    app.include_router(plans_router, prefix="/api/v1/plans")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
