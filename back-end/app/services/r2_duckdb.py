import os
import duckdb
from dotenv import load_dotenv

load_dotenv()

account_id = os.getenv("ACCOUNT_ID")
access_key = os.getenv("ACCESS_KEY_ID")
secret_key = os.getenv("SECRET_ACCESS_KEY")

# Raw DuckDB connection (not SQLAlchemy)
conn = duckdb.connect()

# Enable HTTPFS for S3/R2
conn.execute("INSTALL httpfs")
conn.execute("LOAD httpfs")

# Create Cloudflare R2 secret
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
# ︾ Creating the database as an index for performence ︾
conn.execute("""
    CREATE OR REPLACE TABLE nutriment_index AS
    SELECT
        code,
        product_name,
        item.name AS nutriments_name,
        item."100g" AS value_100g,
        item.value AS nutrient_amount,
        item.unit AS unit,
        item.serving as serving_size
    FROM read_parquet('s3://dietplan/food.parquet'),
    UNNEST(nutriments) AS t(item)
""")
def getDataFromFoodFile(limit: int, offset: int):
    result = conn.execute(f"""
                SELECT product_name, code, ingredients_text, nutriments, ingredients
                FROM read_parquet('s3://dietplan/food.parquet')
                LIMIT {limit} OFFSET {offset}
            """).fetchdf()
    return result
# product_name, code, ingredients_text, nutriments, ingredients


# For filtering. Checkboxes, dropdown filtering functions (all the visual logic is of course in the frontend)
def filterBoxes(trait: str):
# Filter Logic based on nutriments properties
    result = conn.execute(f"""
            SELECT *
            FROM nutriment_index
            WHERE code IN (
                SELECT code
                FROM nutriment_index
                WHERE nutriments_name ILIKE '%{trait}%'
                )
                LIMIT 50;    
        """).fetchdf()
    return result

def searchField(string: str):
# Search Logic based on product_name text
    res = conn.execute(f"""
        SELECT *
        FROM nutriment_index
        WHERE code IN (
        SELECT code
        FROM nutriment_index,
        UNNEST(product_name) AS p(product)
        WHERE product.text ILIKE '%{string}%'
        )
        LIMIT 50
    """).fetchdf()
    return res

def testFilterBoxes():
# Filter Logic based on nutriments properties
    result = conn.execute("""
            SELECT *
            FROM nutriment_index
            WHERE code IN (
                SELECT code
                FROM nutriment_index
                WHERE nutriments_name ILIKE '%sugars%'
                )
                LIMIT 50;    
    """).fetchdf()

    return result