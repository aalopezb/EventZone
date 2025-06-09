from sqlalchemy.orm import Session
from .models import User

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_name(db: Session, name: str):
    return db.query(User).filter(User.name == name).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
