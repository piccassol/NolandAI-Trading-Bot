import requests
from ..config import GMGN_API_KEY, GMGN_API_SECRET

GMGN_API_URL = "https://api.gmgn.ai/v1"

def place_order(symbol, order_type, amount):
    url = f"{GMGN_API_URL}/orders"
    headers = {
        "Authorization": f"Bearer {GMGN_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "symbol": symbol,
        "order_type": order_type,  # "market" or "limit"
        "amount": amount
    }
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to place order", "details": response.json()}
