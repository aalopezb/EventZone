from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine

# Crear instancia de la app antes de cualquier uso
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3007"],  # frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

# Dependency para inyección de sesión de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoints
@app.post("/roles/", response_model=schemas.Role)
def create_role(role: schemas.RoleCreate, db: Session = Depends(get_db)):
    db_role = crud.get_role_by_name(db, name=role.name)
    if db_role:
        raise HTTPException(status_code=400, detail="Role already registered")
    return crud.create_role(db=db, role=role)

@app.get("/roles/", response_model=list[schemas.Role])
def read_roles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_roles(db, skip=skip, limit=limit)

@app.get("/roles/{role_id}", response_model=schemas.Role)
def read_role(role_id: int, db: Session = Depends(get_db)):
    db_role = crud.get_role(db, role_id=role_id)
    if db_role is None:
        raise HTTPException(status_code=404, detail="Role not found")
    return db_role
