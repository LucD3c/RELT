from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Device(Base):
    __tablename__ = "devices"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(100), nullable=False)
    device_type = Column(String(50), nullable=False)   # PC, Impresora, Scanner, Telefono, TV, Mouse, Teclado, Otro
    brand       = Column(String(50))
    model       = Column(String(100))
    serial      = Column(String(100))
    ip_address  = Column(String(45))
    mac_address = Column(String(17))
    location    = Column(String(100))
    assigned_to = Column(String(100))
    status      = Column(String(20), default="activo")  # activo, inactivo, en reparacion
    notes       = Column(Text)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    updated_at  = Column(DateTime(timezone=True), onupdate=func.now())
