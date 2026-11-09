# from flask import Flask
# from flask_restx import Api
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
import shutil
import os
from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.api.v1.users import router as users_router
from app.api.v1.plans import router as plans_router
from app.api.v1.consumables import router as consumables_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine
from app.models.base_model import Base

""" FastAPI way for startup and shutdown for the engine through lifespan."""
@asynccontextmanager
async def lifespan(app: FastAPI): # supposedly dont need to use app but needs to be in parameter regardless. 
    if os.path.exists("./tmp"):
        shutil.rmtree("./tmp")
    os.makedirs("./tmp", exist_ok=True)
    Base.metadata.create_all(bind=engine)

    yield
    if os.path.exists("./tmp"):
        shutil.rmtree("./tmp")
    engine.dispose()

def create_app():

    app = FastAPI(lifespan=lifespan)
 
    app.include_router(users_router, prefix="/api/v1/users")
    app.include_router(plans_router, prefix="/api/v1/plans")
    app.include_router(consumables_router, prefix="/api/v1/consumables")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
