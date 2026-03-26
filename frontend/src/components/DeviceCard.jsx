import { useState } from "react"
import { Trash2, Pencil, Wifi, WifiOff, Loader } from "lucide-react"
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

      if (!alive && currentStatus === "activo") {
        await updateDevice(device.id, { ...device, status: "inactivo" })
        setCurrentStatus("inactivo")
        toast.error(`${device.name} sin respuesta — marcado como inactivo`)
        if (onRefresh) onRefresh()
      } else if (alive && currentStatus === "inactivo") {
        await updateDevice(device.id, { ...device, status: "activo" })
        setCurrentStatus("activo")
        toast.success(`${device.name} responde — marcado como activo`)
        if (onRefresh) onRefresh()
      }
    } catch {
      setPingResult(false)
      toast.error("Error al realizar ping")
    } finally {
      setPinging(false)
    }
  }

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
      {device.ip_address && (
        <p className="ip-row">
          <b>IP:</b> {device.ip_address}
          <button
            className={`btn-ping ${pingResult === true ? "ping-ok" : pingResult === false ? "ping-fail" : ""}`}
            onClick={handlePing}
            disabled={pinging}
            title="Hacer ping"
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
      <div className="card-actions">
        <button onClick={() => onEdit(device)} className="btn-icon" title="Editar"><Pencil size={16} /></button>
        <button onClick={() => onDelete(device.id)} className="btn-icon danger" title="Eliminar"><Trash2 size={16} /></button>
      </div>
    </div>
  )
}
