from fastapi import APIRouter
from services.exchange import place_order

router = APIRouter()

@router.post("/{symbol}/{order_type}/{amount}")
def execute_trade(symbol: str, order_type: str, amount: float):
    return place_order(symbol, order_type, amount)
