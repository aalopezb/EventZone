from pydantic import BaseModel

class PreferencesIn(BaseModel):
    user_id: str
    language: str = "es"
    timezone: str = "UTC"
    theme: str = "light"
    notifications_enabled: bool = True

class PreferencesOut(PreferencesIn):
    pass
