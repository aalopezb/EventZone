from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas
from ..database import get_db

router = APIRouter()

@router.get("/event/{event_id}", response_model=List[schemas.Schedule])
def read_schedules_by_event(event_id: int, db: Session = Depends(get_db)):
    try:
        schedules = crud.get_schedules_by_event(db, event_id)
        return schedules
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")

@router.post("/", response_model=schemas.Schedule, status_code=status.HTTP_201_CREATED)
def create_schedule(schedule: schemas.ScheduleCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_schedule(db, schedule)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")
