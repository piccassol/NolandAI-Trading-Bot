from fastapi import FastAPI
from routes import trading, prices, users

app = FastAPI()

# Include routes
app.include_router(trading.router, prefix="/trade", tags=["Trading"])
app.include_router(prices.router, prefix="/prices", tags=["Prices"])
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
def home():
    return {"message": "Welcome to NolandAI, your Solana trading bot API!"}
