from fastapi import APIRouter
import subprocess
import platform

router = APIRouter(prefix="/ping", tags=["ping"])

@router.get("/{ip}")
def ping_device(ip: str):
    # Validación básica de IP
    parts = ip.split(".")
    if len(parts) != 4 or not all(p.isdigit() and 0 <= int(p) <= 255 for p in parts):
        return {"ip": ip, "alive": False, "error": "IP inválida"}

    param = "-n" if platform.system().lower() == "windows" else "-c"
    try:
        result = subprocess.run(
            ["ping", param, "3", "-W", "1", ip],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=5
        )
        alive = result.returncode == 0
    except Exception as e:
        return {"ip": ip, "alive": False, "error": str(e)}

    return {"ip": ip, "alive": alive}
