from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DeviceBase(BaseModel):
    name:        str
    device_type: str
    brand:       Optional[str] = None
    model:       Optional[str] = None
    serial:      Optional[str] = None
    ip_address:  Optional[str] = None
    mac_address: Optional[str] = None
    location:    Optional[str] = None
    assigned_to: Optional[str] = None
    status:      Optional[str] = "activo"
    notes:       Optional[str] = None

class DeviceCreate(DeviceBase):
    pass

class DeviceUpdate(DeviceBase):
    pass

class DeviceOut(DeviceBase):
    id:         int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
