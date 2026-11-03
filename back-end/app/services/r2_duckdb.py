import os
import duckdb
import shutil
from dotenv import load_dotenv

load_dotenv()

account_id = os.getenv("ACCOUNT_ID")
access_key = os.getenv("ACCESS_KEY_ID")
secret_key = os.getenv("SECRET_ACCESS_KEY")

# Raw DuckDB connection (not SQLAlchemy)
conn = duckdb.connect()
conn.execute("SET memory_limit='12GB'")
conn.execute("SET temp_directory='./tmp'")
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
if not os.path.exists("nutriment_index.parquet"):
    print("Generating nutriment_index")
    conn.execute("""
        COPY (
        SELECT
            code,
            product_name[1].text AS product,
            allergens_tags AS allergies,
            item.name AS nutriments_name,
            item."100g" AS value_100g,
            item.value AS nutrient_amount,
            item.unit AS unit,
            item.serving as serving_size
        FROM read_parquet('s3://dietplan/food.parquet'),
        UNNEST(nutriments) AS t(item),
        )
        TO 'nutriment_index.parquet'
        (FORMAT PARQUET)
    """
    )

print(
    conn.execute(
        "SELECT current_setting('memory_limit')"
    ).fetchall()
)
def getDataFromFoodFile(limit: int, offset: int):
    result = conn.execute(f"""
                SELECT product_name, code, ingredients_text, nutriments, ingredients
                FROM read_parquet('nutriment_index.parquet')
                LIMIT {limit} OFFSET {offset}
            """).fetchdf()
    return result
# product_name, code, ingredients_text, nutriments, ingredients


# For filtering. Checkboxes, dropdown filtering functions (all the visual logic is of course in the frontend)
def filterBoxes(trait: str, limit: int, offset: int):
# Filter Logic based on nutriments properties
    result = conn.execute(f"""
            SELECT *
            FROM read_parquet('nutriment_index.parquet')
            WHERE code IN (
                SELECT code
                FROM read_parquet('nutriment_index.parquet')
                WHERE nutriments_name ILIKE '%{trait}%'
                )
            LIMIT {limit} OFFSET {offset}    
        """).fetchdf()
    return result

def searchField(string: str, limit: int, offset: int):
# Search Logic based on product_name text
    res = conn.execute(f"""
        SELECT *
        FROM read_parquet('nutriment_index.parquet')
        WHERE product ILIKE '%{string}%'
        LIMIT {limit} OFFSET {offset}
    """).fetchdf()
    return res

def testFilterBoxes(limit: int, offset: int):
# Filter Logic based on nutriments properties
    result = conn.execute(f"""
        SELECT *
        FROM read_parquet('nutriment_index.parquet')
        WHERE code IN (
            SELECT code
            FROM read_parquet('nutriment_index.parquet')
            WHERE nutriments_name ILIKE '%sugars%'
            )
        LIMIT {limit} OFFSET {offset}    
    """).fetchdf()

    return result