from sqlalchemy.orm import Session
from . import models, schemas

def get_schedules_by_event(db: Session, event_id: int):
    return db.query(models.Schedule).filter(models.Schedule.event_id == event_id).all()

def create_schedule(db: Session, schedule: schemas.ScheduleCreate):
    db_schedule = models.Schedule(**schedule.dict())
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule
