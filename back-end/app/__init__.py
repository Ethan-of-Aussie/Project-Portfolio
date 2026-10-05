# from flask import Flask
# from flask_restx import Api
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
from fastapi import FastAPI
from app.api.v1.users import router as users_router
from fastapi.middleware.cors import CORSMiddleware
# from flask_cors import CORS


app = FastAPI()

app.include_router(users_router, prefix="/api/v1/users")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# bcrypt = Bcrypt()
# jwt = JWTManager()

#def create_app(config_class="config.DevelopmentConfig"):
 #   app = Flask(__name__)
 #   app.config.from_object(config_class)
 #   api = Api(
  #          app,
  #          version='1.0',
  #          title='Diet App API',
  #          description='Dieting App API',
  #          doc='/api/v1/'
   #         )
   # CORS(app)
    # Register namespaces
    #api.add_namespace(namespace, path='')
   # api.add_namespace(users_ns, path='/api/v1/users')
    # Initialise plugins
   # jwt.init_app(app)
   # bcrypt.init_app(app)

  #  return app
