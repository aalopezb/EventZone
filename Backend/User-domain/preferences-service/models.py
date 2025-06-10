from sqlalchemy import Column, String, Boolean
from database import Base

class Preferences(Base):
    __tablename__ = "preferences"

    user_id = Column(String, primary_key=True, index=True)
    language = Column(String, default="es")
    timezone = Column(String, default="UTC")
    theme = Column(String, default="light")
    notifications_enabled = Column(Boolean, default=True)
