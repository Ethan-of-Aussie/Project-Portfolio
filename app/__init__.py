from flask import Flask
from flask_restx import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class="config.DevelopmentConfig"):
    app = Flask(__name__)
    app.config.from_object(config_class)
    api = Api(
            app,
            version='1.0',
            title='Diet App API',
            description='Dieting App API',
            doc='/api/v1/'
            )

    # Register namespaces
    #api.add_namespace(namespace, path='')
    # Initialise plugins
    jwt.init_app(app)
    bcrypt.init_app(app)

    # add website routes
    from app.website import website
    app.register_blueprint(website)

    return app
