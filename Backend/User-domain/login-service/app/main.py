from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas, crud, database, auth

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Login Service")

origins = [
    "http://localhost:3016",
    "http://localhost:5000",
    "http://100.29.129.153:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/login", response_model=schemas.LoginResponse)
def login(login_req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, login_req.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    if not auth.verify_password(login_req.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token}
