import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor

# Load environment variables
load_dotenv()

app = FastAPI()

# GMGN Solana Trading API Endpoint (No API Key Required)
GMGN_SWAP_URL = "https://gmgn.ai/defi/router/v1/sol/tx/get_swap_route?token_in_address={inputToken}&token_out_address={outputToken}&in_amount={amount}&from_address={fromAddress}&slippage={slippage}"

# Dexscreener API URL for Solana token info
DEXSCREENER_URL = "https://api.dexscreener.com//token-profiles/latest/v1"

# Database connection URL from environment variables
DB_URL = os.getenv("DATABASE_URL")

# Database connection function
def get_db_connection():
    try:
        conn = psycopg2.connect(DB_URL, options="-c search_path=nolandai_trading", cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")

@app.get("/status")
def read_root():
    return {"message": "GMGN Trading API Server is Running!"}

# Endpoint to fetch swap route
@app.get("/swap")
def get_swap_route(inputToken: str, outputToken: str, amount: int, fromAddress: str, slippage: float):
    url = GMGN_SWAP_URL.format(
        inputToken=inputToken,
        outputToken=outputToken,
        amount=amount,
        fromAddress=fromAddress,
        slippage=slippage
    )
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching swap route")
    return response.json()

# Endpoint to test database connection
@app.get("/db-test")
def test_db():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'nolandai_trading';")
        schema_exists = cur.fetchone()
        cur.close()
        conn.close()

        if schema_exists:
            return {"message": "Connected to PostgreSQL with nolandai_trading schema!"}
        else:
            return {"message": "Schema nolandai_trading does not exist!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")

# =============================
# 🚀 User Management Endpoints 🚀
# =============================

# Create users table if it doesn't exist
@app.on_event("startup")
def create_users_table():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS nolandai_trading.users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL,
                balance DECIMAL DEFAULT 0.0
            );
        """)
        conn.commit()
    except Exception as e:
        print(f"Error creating users table: {str(e)}")
    finally:
        cur.close()
        conn.close()

# ✅ Get all users
@app.get("/users")
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM nolandai_trading.users;")
        users = cur.fetchall()
        return {"users": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")
    finally:
        cur.close()
        conn.close()

# ✅ Create a new user
@app.post("/users")
def create_user(username: str, balance: float = 0.0):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO nolandai_trading.users (username, balance) VALUES (%s, %s) RETURNING id;",
                    (username, balance))
        new_id = cur.fetchone()[0]
        conn.commit()
        return {"id": new_id, "username": username, "balance": balance}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database insert error: {str(e)}")
    finally:
        cur.close()
        conn.close()

# ✅ Get a user by ID
@app.get("/users/{user_id}")
def get_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM nolandai_trading.users WHERE id = %s;", (user_id,))
        user = cur.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")
    finally:
        cur.close()
        conn.close()

# ✅ Update a user's balance
@app.put("/users/{user_id}")
def update_user_balance(user_id: int, balance: float):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("UPDATE nolandai_trading.users SET balance = %s WHERE id = %s RETURNING id;",
                    (balance, user_id))
        updated_id = cur.fetchone()
        if not updated_id:
            raise HTTPException(status_code=404, detail="User not found")
        conn.commit()
        return {"id": user_id, "balance": balance}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database update error: {str(e)}")
    finally:
        cur.close()
        conn.close()

# ✅ Delete a user
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM nolandai_trading.users WHERE id = %s RETURNING id;", (user_id,))
        deleted_id = cur.fetchone()
        if not deleted_id:
            raise HTTPException(status_code=404, detail="User not found")
        conn.commit()
        return {"message": f"User {user_id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database delete error: {str(e)}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
