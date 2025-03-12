import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
import requests
import psycopg2

# Load environment variables
load_dotenv()

app = FastAPI()

# GMGN Solana Trading API Endpoint (No API Key Required)
GMGN_SWAP_URL = 
"https://gmgn.ai/defi/router/v1/sol/tx/get_swap_route?token_in_address={inputToken}&token_out_address={outputToken}&in_amount={amount}&from_address={fromAddress}&slippage={slippage}"

# Dexscreener API URL for Solana token info
DEXSCREENER_URL = "https://api.dexscreener.com//token-profiles/latest/v1"

# Database connection URL for PostgreSQL
DB_URL = os.getenv("DATABASE_URL")

# Database connection
def get_db_connection():
    try:
        conn = psycopg2.connect(DB_URL)
        return conn
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection 
error: {str(e)}")

@app.get("/status")
def read_root():
    return {"message": "GMGN Trading API Server is Running!"}

# Endpoint to fetch swap route
@app.get("/swap")
def get_swap_route(inputToken: str, outputToken: str, amount: int, 
fromAddress: str, slippage: float):
    url = GMGN_SWAP_URL.format(
        inputToken=inputToken,
        outputToken=outputToken,
        amount=amount,
        fromAddress=fromAddress,
        slippage=slippage
    )
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, 
detail="Error fetching swap route")
    return response.json()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

