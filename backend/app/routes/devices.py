from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.device import Device
from app.models.schemas import DeviceCreate, DeviceUpdate, DeviceOut

router = APIRouter(prefix="/devices", tags=["devices"])

@router.get("/", response_model=List[DeviceOut])
def get_devices(
    device_type: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Device)
    if device_type:
        query = query.filter(Device.device_type == device_type)
    if status:
        query = query.filter(Device.status == status)
    if search:
        query = query.filter(
            Device.name.contains(search) |
            Device.ip_address.contains(search) |
            Device.mac_address.contains(search) |
            Device.assigned_to.contains(search)
        )
    return query.all()

@router.get("/{device_id}", response_model=DeviceOut)
def get_device(device_id: int, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado")
    return device

@router.post("/", response_model=DeviceOut)
def create_device(device: DeviceCreate, db: Session = Depends(get_db)):
    db_device = Device(**device.model_dump())
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

@router.put("/{device_id}", response_model=DeviceOut)
def update_device(device_id: int, device: DeviceUpdate, db: Session = Depends(get_db)):
    db_device = db.query(Device).filter(Device.id == device_id).first()
    if not db_device:
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado")
    for key, value in device.model_dump(exclude_unset=True).items():
        setattr(db_device, key, value)
    db.commit()
    db.refresh(db_device)
    return db_device

@router.delete("/{device_id}")
def delete_device(device_id: int, db: Session = Depends(get_db)):
    db_device = db.query(Device).filter(Device.id == device_id).first()
    if not db_device:
        raise HTTPException(status_code=404, detail="Dispositivo no encontrado")
    db.delete(db_device)
    db.commit()
    return {"message": "Dispositivo eliminado correctamente"}
