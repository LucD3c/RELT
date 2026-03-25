import { Trash2, Pencil } from "lucide-react"

const statusColor = {
  "activo": "#22c55e",
  "inactivo": "#ef4444",
  "en reparacion": "#f59e0b"
}

export default function DeviceCard({ device, onEdit, onDelete }) {
  return (
    <div className="device-card">
      <div className="card-header">
        <span className="device-type">{device.device_type}</span>
        <span className="device-status" style={{ color: statusColor[device.status] }}>
          ● {device.status}
        </span>
      </div>
      <h3>{device.name}</h3>
      {device.brand && <p><b>Marca:</b> {device.brand} {device.model}</p>}
      {device.ip_address && <p><b>IP:</b> {device.ip_address}</p>}
      {device.mac_address && <p><b>MAC:</b> {device.mac_address}</p>}
      {device.location && <p><b>Ubicación:</b> {device.location}</p>}
      {device.assigned_to && <p><b>Asignado a:</b> {device.assigned_to}</p>}
      <div className="card-actions">
        <button onClick={() => onEdit(device)} className="btn-icon"><Pencil size={16} /></button>
        <button onClick={() => onDelete(device.id)} className="btn-icon danger"><Trash2 size={16} /></button>
      </div>
    </div>
  )
}
