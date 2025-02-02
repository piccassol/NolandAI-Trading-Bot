from fastapi import APIRouter
from services.dexscreener import get_token_info

router = APIRouter()

@router.get("/{token_address}")
def get_price(token_address: str):
    return get_token_info(token_address)
