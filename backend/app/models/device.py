from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Device(Base):
    __tablename__ = "devices"

    id           = Column(Integer, primary_key=True, index=True)
    name         = Column(String(100), nullable=False)
    device_type  = Column(String(50), nullable=False)
    brand        = Column(String(50))
    model        = Column(String(100))
    serial       = Column(String(100))
    ip_address   = Column(String(45))
    mac_address  = Column(String(17))
    location     = Column(String(100))
    assigned_to  = Column(String(100))
    status       = Column(String(20), default="activo")
    notes        = Column(Text)

    # Hardware
    cpu          = Column(String(150))
    ram_gb       = Column(String(20))
    storage_gb   = Column(String(20))
    storage_type = Column(String(10))   # SSD, HDD, NVMe, eMMC
    gpu          = Column(String(150))
    os           = Column(String(100))
    screen_size  = Column(String(20))
    battery      = Column(String(50))

    created_at   = Column(DateTime(timezone=True), server_default=func.now())
    updated_at   = Column(DateTime(timezone=True), onupdate=func.now())
