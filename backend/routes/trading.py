from fastapi import APIRouter, HTTPException
from ..services.exchange import place_order
import psycopg2
from psycopg2.extras import RealDictCursor
from ..config import DB_URL
from datetime import datetime

router = APIRouter()

def get_db_connection():
    try:
        conn = psycopg2.connect(DB_URL, options="-c search_path=nolandai_trading", cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")

@router.post("/{symbol}/{order_type}/{amount}")
def execute_trade(symbol: str, order_type: str, amount: float):
    result = place_order(symbol, order_type, amount)
    if "error" not in result:
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            cur.execute(
                """
                INSERT INTO nolandai_trading.trades (user_id, symbol, order_type, amount, price, timestamp)
                VALUES (%s, %s, %s, %s, %s, %s);
                """,
                (1, symbol, order_type, amount, result.get("price", 0.0), datetime.utcnow())
            )
            conn.commit()
        except Exception as e:
            print(f"Database insert error: {e}")
            raise HTTPExceptionlt(status_code=500, detail=f"Database insert error: {str(e)}")
        finally:
            cur.close()
            conn.close()
    return result

@router.get("/history")
def get_trade_history():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM nolandai_trading.trades ORDER BY timestamp DESC LIMIT 50;")
        trades = cur.fetchall()
        return {"trades": trades}
    except Exception as e:
        print(f"Database query error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")
    finally:
        cur.close()
        conn.close()
