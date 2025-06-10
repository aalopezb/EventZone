from sqlalchemy.orm import Session
import models, schemas

def get_preferences(db: Session, user_id: str):
    return db.query(models.Preferences).filter(models.Preferences.user_id == user_id).first()

def create_or_update_preferences(db: Session, prefs: schemas.PreferencesIn):
    db_prefs = get_preferences(db, prefs.user_id)
    if db_prefs:
        for key, value in prefs.dict().items():
            setattr(db_prefs, key, value)
    else:
        db_prefs = models.Preferences(**prefs.dict())
        db.add(db_prefs)
    db.commit()
    db.refresh(db_prefs)
    return db_prefs

def delete_preferences(db: Session, user_id: str):
    db_prefs = get_preferences(db, user_id)
    if db_prefs:
        db.delete(db_prefs)
        db.commit()
        return True
    return False
