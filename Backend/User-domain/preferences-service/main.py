from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud, schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:3009"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/preferences/", response_model=schemas.PreferencesOut)
def create_or_update_preferences(prefs: schemas.PreferencesIn, db: Session = Depends(get_db)):
    return crud.create_or_update_preferences(db, prefs)

@app.get("/preferences/{user_id}", response_model=schemas.PreferencesOut)
def get_preferences(user_id: str, db: Session = Depends(get_db)):
    prefs = crud.get_preferences(db, user_id)
    if not prefs:
        raise HTTPException(status_code=404, detail="Preferences not found")
    return prefs

@app.delete("/preferences/{user_id}")
def delete_preferences(user_id: str, db: Session = Depends(get_db)):
    if not crud.delete_preferences(db, user_id):
        raise HTTPException(status_code=404, detail="Preferences not found")
    return {"message": "Preferences deleted"}
