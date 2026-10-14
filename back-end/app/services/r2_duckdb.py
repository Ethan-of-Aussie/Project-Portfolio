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
