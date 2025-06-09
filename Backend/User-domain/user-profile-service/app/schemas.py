from pydantic import BaseModel
from datetime import datetime

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    createdAt: datetime

    class Config:
        orm_mode = True
