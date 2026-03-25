# RELT — Relevamiento IT

Herramienta local para relevamiento de dispositivos tecnológicos. Sin nubes, sin servidores externos. Tus datos quedan en tu máquina.

## ¿Qué podés registrar?

- Computadoras, Notebooks, Servidores
- Impresoras, Scanners
- Teléfonos, Celulares
- Televisores, Monitores
- Mouse, Teclados
- Switches, Routers, Access Points
- UPS y más

Cada dispositivo guarda: nombre, tipo, marca, modelo, número de serie, IP, MAC, ubicación, usuario asignado, estado y notas.

---

## Requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Git](https://git-scm.com/) instalado

---

## Instalación y uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/LucD3c/RELT.git
cd RELT
```

### 2. Configurar el archivo de entorno
```bash
cp .env.example .env
```

Editá el archivo `.env` y reemplazá el valor de `SECRET_KEY` con una clave generada por vos:
```bash
# Generar una clave segura (ejecutá esto y copiá el resultado)
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Pegá ese valor en el `.env`:
```
SECRET_KEY=tu-clave-generada-aqui
```

### 3. Levantar la aplicación
```bash
docker compose up --build
```

### 4. Abrir en el navegador
```
http://localhost
```

¡Listo! RELT está corriendo con tus datos guardados localmente.

---

## Detener la aplicación
```bash
docker compose down
```

## Actualizar a una nueva versión
```bash
git pull origin main
docker compose up --build
```

---

## ¿Dónde se guardan los datos?

En un volumen de Docker llamado `relt-data`, en tu máquina local. Nunca salen de tu equipo.

---

## Tecnologías

- **Backend:** Python + FastAPI + SQLite
- **Frontend:** React + Vite
- **Contenedor:** Docker + Nginx

---

## Autor

Desarrollado por [LucD3c](https://github.com/LucD3c)
