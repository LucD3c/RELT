import { useState, useEffect } from "react"
import { getDevices, createDevice, updateDevice, deleteDevice } from "../utils/api"
import DeviceCard from "../components/DeviceCard"
import DeviceForm from "../components/DeviceForm"
import { DEVICE_TYPES } from "../utils/constants"
import { exportToExcel } from "../utils/export"
import toast from "react-hot-toast"
import { Plus, Search, FileDown } from "lucide-react"

export default function Dashboard() {
  const [devices, setDevices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("")
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const res = await getDevices({ search, device_type: filterType })
      setDevices(res.data)
    } catch { toast.error("Error al cargar dispositivos") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [search, filterType])

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await updateDevice(editing.id, data)
        toast.success("Dispositivo actualizado")
      } else {
        await createDevice(data)
        toast.success("Dispositivo creado")
      }
      setShowForm(false)
      setEditing(null)
      load()
    } catch { toast.error("Error al guardar") }
  }

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este dispositivo?")) return
    try {
      await deleteDevice(id)
      toast.success("Eliminado")
      load()
    } catch { toast.error("Error al eliminar") }
  }

  const handleEdit = (device) => {
    setEditing(device)
    setShowForm(true)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>RELT — Relevamiento IT</h1>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => exportToExcel(devices)}>
            <FileDown size={16} /> Exportar Excel
          </button>
          <button className="btn-primary" onClick={() => { setEditing(null); setShowForm(true) }}>
            <Plus size={16} /> Nuevo dispositivo
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Buscar por nombre, IP, MAC, usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Todos los tipos</option>
          {DEVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editing ? "✏️ Editar dispositivo" : "➕ Nuevo dispositivo"}</h2>
            <DeviceForm
              initial={editing}
              onSubmit={handleSubmit}
              onCancel={() => { setShowForm(false); setEditing(null) }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p className="loading">Cargando...</p>
      ) : devices.length === 0 ? (
        <div className="empty">
          <p>No hay dispositivos registrados.</p>
          <p>Hacé click en <b>Nuevo dispositivo</b> para comenzar.</p>
        </div>
      ) : (
        <div className="device-grid">
          {devices.map(d => (
            <DeviceCard
              key={d.id}
              device={d}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={load}
            />
          ))}
        </div>
      )}

      <div className="dashboard-footer">
        <span>{devices.length} dispositivo{devices.length !== 1 ? "s" : ""} registrado{devices.length !== 1 ? "s" : ""}</span>
      </div>
    </div>
  )
}
