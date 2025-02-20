from fastapi import APIRouter, Depends, HTTPException, Header
from app.services import send_tweet  # Import tweet function
from app.config import API_KEY

router = APIRouter()

def verify_api_key(x_api_key: str = Header(None)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return x_api_key

@router.post("/tweet/")
def tweet(message: str, api_key: str = Depends(verify_api_key)):
    """Secured endpoint to send a tweet"""
    return send_tweet(message)
