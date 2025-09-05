# backend/main.py (updated)
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import requests
import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()
app = FastAPI()

GMGN_SWAP_URL = "https://gmgn.ai/defi/router/v1/sol/tx/get_swap_route?token_in_address={inputToken}&token_out_address={outputToken}&in_amount={amount}&from_address={fromAddress}&slippage={slippage}"
DEXSCREENER_URL = "https://api.dexscreener.com/token-profiles/latest/v1"
DB_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    try:
        conn = psycopg2.connect(DB_URL, options="-c search_path=nolandai_trading", cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")

def create_tables():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            CREATE SCHEMA IF NOT EXISTS nolandai_trading;
            CREATE TABLE IF NOT EXISTS nolandai_trading.users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL,
                balance DECIMAL DEFAULT 0.0
            );
            CREATE TABLE IF NOT EXISTS nolandai_trading.trades (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES nolandai_trading.users(id),
                symbol TEXT NOT NULL,
                order_type TEXT NOT NULL,
                amount FLOAT NOT NULL,
                price FLOAT NOT NULL,
                timestamp TIMESTAMP NOT NULL
            );
        """)
        conn.commit()
    except Exception as e:
        print(f"Error creating tables: {e}")
    finally:
        cur.close()
        conn.close()

@app.on_event("startup")
def startup():
    create_tables()

@app.get("/db-test")
def db_test():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        cur.close()
        conn.close()
        return {"message": "Connected to PostgreSQL with nolandai_trading schema!"}
    except Exception as e:
        return {"error": f"Database test failed: {str(e)}"}

@app.get("/users")
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM nolandai_trading.users;")
        users = cur.fetchall()
        return {"users": users}
    except Exception as e:
        print(f"Database query error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")
    finally:
        cur.close()
        conn.close()

@app.post("/users")
def create_user(username: str, balance: float = 0.0):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO nolandai_trading.users (username, balance) VALUES (%s, %s) RETURNING id;",
                    (username, balance))
        new_id = cur.fetchone()
        if not new_id:
            raise HTTPException(status_code=500, detail="Failed to retrieve inserted user ID")
        conn.commit()
        return {"id": new_id['id'], "username": username, "balance": balance}
    except Exception as e:
        print(f"Database insert error: {e}")
        raise HTTPException(status_code=500, detail=f"Database insert error: {str(e)}")
    finally:
        cur.close()
        conn.close()

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
        print(f"Database delete error: {e}")
        raise HTTPException(status_code=500, detail=f"Database delete error: {str(e)}")
    finally:
        cur.close()
        conn.close()

@app.get("/")
def home():
    return {"message": "FastAPI is running on Render!"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
