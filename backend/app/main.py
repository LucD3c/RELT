from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.routes import devices

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RELT API",
    description="Herramienta de relevamiento de dispositivos IT",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(devices.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "RELT API corriendo", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "ok"}
