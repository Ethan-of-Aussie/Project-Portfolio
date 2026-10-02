import os
from flask_restx import Namespace, Resource, fields, marshal
from app.services import facade
from flask_jwt_extended import jwt_required, get_jwt_identity
import duckdb
import pandas as pd
from dotenv import load_dotenv

load_dotenv()
conn = duckdb.connect()

account_id = os.getenv("ACCOUNT_ID")
access_key = os.getenv("ACCESS_KEY_ID")
secret_key = os.getenv("SECRET_ACCESS_KEY")

conn.execute("INSTALL httpfs")
conn.execute("LOAD httpfs")

conn.execute("""
    CREATE SECRET r2_secret (
        TYPE S3,
        KEY_ID ?,
        SECRET ?,
        REGION 'auto',
        ENDPOINT ?
    )
""", [
    access_key,
    secret_key,
    f"{account_id}.r2.cloudflarestorage.com"
])

api = Namespace('users', description='User operations')

@api.route("/")
class User(Resource):
    def get(self):
        result = conn.execute("""
            SELECT *
            FROM read_parquet('s3://dietplan/food.parquet')
            LIMIT 10
        """).fetchdf()
        print(f"result {result}")
        # data = duckdb.sql("SELECT * FROM 'analytical-data/en.openfoodfacts.org.products.csv.gz' LIMIT 100 OFFSET 99")
        print(result)
        return "Cat is not a user", 200