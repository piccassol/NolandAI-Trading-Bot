from pydantic import BaseModel
from datetime import datetime

class Trade(BaseModel):
    user_id: int
    symbol: str
    order_type: str
    amount: float
    price: float
    timestamp: datetime
