# RELT — Relevamiento IT

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Docker](https://img.shields.io/badge/docker-required-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Herramienta local y completa para relevamiento de dispositivos tecnológicos. Sin nubes, sin servidores externos. Tus datos quedan en tu máquina.

---

## ¿Qué podés relevar?

| Dispositivo | Datos generales | Hardware |
|-------------|----------------|----------|
| Computadora / Notebook | IP, MAC, Serie, Ubicación, Usuario | CPU, RAM, Disco, GPU, OS |
| Servidor | IP, MAC, Serie | CPU, RAM, Disco, OS |
| Teléfono IP | IP, MAC, Modelo | — |
| Celular | Serie, Modelo | RAM, Disco, OS, Pantalla |
| Impresora / Scanner | IP, MAC, Serie | — |
| Switch / Router / AP | IP, MAC, Modelo | — |
| Monitor / Televisor | Serie, Modelo | Pantalla, OS |
| Mouse / Teclado / UPS / NAS | Serie, Modelo | Según aplique |

Campos por dispositivo: nombre, tipo, marca, modelo, número de serie, IP, MAC, ubicación, usuario asignado, estado, notas y hardware específico.

---

## Requisitos

### Windows
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (incluye Docker Compose)
- [Git para Windows](https://git-scm.com/download/win)

### Linux / macOS
- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Git (`sudo apt install git` en Ubuntu/Debian)

---

## Instalación en Windows

### 1. Instalar Docker Desktop
1. Descargá Docker Desktop desde https://www.docker.com/products/docker-desktop/
2. Ejecutá el instalador y seguí los pasos
3. Reiniciá la PC cuando lo solicite
4. Abrí Docker Desktop y esperá a que diga **"Engine running"**

### 2. Instalar Git
1. Descargá Git desde https://git-scm.com/download/win
2. Instalá con todas las opciones por defecto
3. Abrí **Git Bash** o **PowerShell**

### 3. Clonar y configurar RELT

Abrí **PowerShell** o **Git Bash** y ejecutá:
```bash
git clone https://github.com/LucD3c/RELT.git
cd RELT
copy .env.example .env
```

Generá tu clave secreta ejecutando esto en PowerShell:
```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

> Si no tenés Python instalado en Windows, podés generar la clave en https://generate-secret.vercel.app/64

Abrí el archivo `.env` con el Bloc de notas y reemplazá el valor de `SECRET_KEY`:
```
SECRET_KEY=pega-aqui-tu-clave-generada
```

### 4. Levantar RELT
```powershell
docker compose up --build
```

### 5. Abrir en el navegador
```
http://localhost
```

---

## Instalación en Linux (Ubuntu/Debian)

### 1. Instalar dependencias
```bash
sudo apt update && sudo apt install -y git curl

# Instalar Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Clonar y configurar RELT
```bash
git clone https://github.com/LucD3c/RELT.git
cd RELT
cp .env.example .env
```

Generá tu clave secreta:
```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Editá el `.env` y pegá la clave:
```bash
nano .env
# Reemplazá el valor de SECRET_KEY con la clave generada
# Guardá con Ctrl+O y salí con Ctrl+X
```

### 3. Levantar RELT
```bash
docker compose up --build
```

O en segundo plano:
```bash
docker compose up --build -d
```

### 4. Abrir en el navegador
```
http://localhost
```

---

## Uso con el script automático (Linux/macOS)
```bash
git clone https://github.com/LucD3c/RELT.git
cd RELT
./start.sh
```

El script genera la clave secreta automáticamente y levanta todo.

---

## Comandos útiles
```bash
# Detener RELT
docker compose down

# Ver logs en tiempo real
docker compose logs -f

# Actualizar a nueva versión
git pull origin main
docker compose up --build -d

# Reiniciar sin reconstruir
docker compose restart
```

---

## ¿Dónde se guardan los datos?

En un volumen de Docker llamado `relt-data`, almacenado localmente en tu máquina. Nunca salen de tu equipo. Para hacer una copia de seguridad:
```bash
# Exportar base de datos
docker run --rm -v relt_relt-data:/data -v $(pwd):/backup alpine tar czf /backup/relt-backup.tar.gz /data
```

---

## Funcionalidades

- ✅ Registro completo de dispositivos IT
- ✅ Hardware detallado (CPU, RAM, disco, GPU, OS)
- ✅ Ping en tiempo real con actualización de estado
- ✅ Búsqueda por nombre, IP, MAC, usuario
- ✅ Filtro por tipo de dispositivo
- ✅ Exportar inventario a Excel (.xlsx)
- ✅ Datos 100% locales, sin nubes
- ✅ Compatible con Windows, Linux y macOS

---

## Tecnologías

- **Backend:** Python 3.12 + FastAPI + SQLite
- **Frontend:** React + Vite + Nginx
- **Contenedor:** Docker + Docker Compose

---

## Autor

Desarrollado por [LucD3c](https://github.com/LucD3c)

---

## ⚠️ Nota sobre el Ping

La función de ping requiere que el dispositivo destino tenga habilitada la respuesta a solicitudes ICMP en su firewall.

**Windows:** Por defecto bloquea el ping. Para habilitarlo, ejecutar en PowerShell como Administrador:
```powershell
netsh advfirewall firewall add rule name="Allow ICMPv4" protocol=icmpv4:8,any dir=in action=allow
```

**Linux:** El ping funciona por defecto sin configuración adicional.

**macOS:** El ping funciona por defecto sin configuración adicional.
