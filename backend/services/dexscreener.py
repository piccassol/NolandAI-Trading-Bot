import requests
from ..config import DEXSCREENER_URL

def get_token_info(token_address: str):
    url = f"{DEXSCREENER_URL}{token_address}"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else None
