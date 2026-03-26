import { useState } from "react"
import { Trash2, Pencil, Wifi, WifiOff, Loader, Cpu, HardDrive, Monitor } from "lucide-react"
import axios from "axios"
import { updateDevice } from "../utils/api"
import toast from "react-hot-toast"

const statusColor = {
  "activo":        "#22c55e",
  "inactivo":      "#ef4444",
  "en reparacion": "#f59e0b"
}

export default function DeviceCard({ device, onEdit, onDelete, onRefresh }) {
  const [pingResult, setPingResult] = useState(null)
  const [pinging, setPinging] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(device.status)

  const handlePing = async () => {
    if (!device.ip_address) {
      toast.error("Este dispositivo no tiene IP asignada")
      return
    }
    setPinging(true)
    setPingResult(null)
    try {
      const res = await axios.get(`/api/ping/${device.ip_address}`)
      const alive = res.data.alive
      setPingResult(alive)
      if (alive) {
        await updateDevice(device.id, { ...device, status: "activo" })
        setCurrentStatus("activo")
        toast.success(`${device.name} responde — marcado como activo`)
      } else {
        await updateDevice(device.id, { ...device, status: "inactivo" })
        setCurrentStatus("inactivo")
        toast.error(`${device.name} sin respuesta — marcado como inactivo`)
      }
      if (onRefresh) onRefresh()
    } catch {
      setPingResult(false)
      toast.error("Error al realizar ping")
    } finally {
      setPinging(false)
    }
  }

  const hasHardware = device.cpu || device.ram_gb || device.storage_gb || device.gpu || device.os || device.screen_size || device.battery

  return (
    <div className="device-card">
      <div className="card-header">
        <span className="device-type">{device.device_type}</span>
        <span className="device-status" style={{ color: statusColor[currentStatus] }}>
          ● {currentStatus}
        </span>
      </div>
      <h3>{device.name}</h3>
      {device.brand && <p><b>Marca:</b> {device.brand} {device.model}</p>}
      {device.serial && <p><b>Serie:</b> {device.serial}</p>}

      {device.ip_address && (
        <p className="ip-row">
          <b>IP:</b> {device.ip_address}
          <button
            className={`btn-ping ${pingResult === true ? "ping-ok" : pingResult === false ? "ping-fail" : ""}`}
            onClick={handlePing}
            disabled={pinging}
          >
            {pinging ? <Loader size={13} className="spinning" /> :
             pingResult === true ? <Wifi size={13} /> :
             pingResult === false ? <WifiOff size={13} /> :
             <Wifi size={13} />}
            {pinging ? "Probando..." : pingResult === true ? "Online" : pingResult === false ? "Sin respuesta" : "Ping"}
          </button>
        </p>
      )}
      {device.mac_address && <p><b>MAC:</b> {device.mac_address}</p>}
      {device.location && <p><b>Ubicación:</b> {device.location}</p>}
      {device.assigned_to && <p><b>Asignado a:</b> {device.assigned_to}</p>}

      {hasHardware && (
        <div className="hardware-section">
          <div className="hardware-title">🔧 Hardware</div>
          {device.cpu && <p><Cpu size={12} /> {device.cpu}</p>}
          {device.ram_gb && <p><b>RAM:</b> {device.ram_gb}</p>}
          {device.storage_gb && <p><HardDrive size={12} /> {device.storage_gb} {device.storage_type ? `— ${device.storage_type}` : ""}</p>}
          {device.gpu && <p><Monitor size={12} /> {device.gpu}</p>}
          {device.os && <p><b>OS:</b> {device.os}</p>}
          {device.screen_size && <p><b>Pantalla:</b> {device.screen_size}</p>}
          {device.battery && <p><b>Batería:</b> {device.battery}</p>}
        </div>
      )}

      <div className="card-actions">
        <button onClick={() => onEdit(device)} className="btn-icon" title="Editar"><Pencil size={16} /></button>
        <button onClick={() => onDelete(device.id)} className="btn-icon danger" title="Eliminar"><Trash2 size={16} /></button>
      </div>
    </div>
  )
}
