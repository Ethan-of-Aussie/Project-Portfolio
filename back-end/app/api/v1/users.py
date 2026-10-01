from flask_restx import Namespace, Resource, fields, marshal
from app.services import facade
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Namespace('users', description='User operations')

@api.route("/")
class User(Resource):
    def get(self):
        return "Cat is ok", 200