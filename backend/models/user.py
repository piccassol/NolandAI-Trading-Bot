from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    access_token: str
