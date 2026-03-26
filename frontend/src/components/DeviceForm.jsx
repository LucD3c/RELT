import { useState, useEffect } from "react"
import { DEVICE_TYPES, DEVICE_STATUS, BRANDS_BY_TYPE, ALL_BRANDS } from "../utils/constants"

const empty = {
  name: "", device_type: "", brand: "", model: "",
  serial: "", ip_address: "", mac_address: "",
  location: "", assigned_to: "", status: "activo", notes: "",
  cpu: "", ram_gb: "", storage_gb: "", storage_type: "",
  gpu: "", os: "", screen_size: "", battery: ""
}

// Qué campos de hardware aplican a cada tipo
const HARDWARE_FIELDS = {
  "Computadora":  ["cpu", "ram_gb", "storage_gb", "storage_type", "gpu", "os"],
  "Notebook":     ["cpu", "ram_gb", "storage_gb", "storage_type", "gpu", "os", "screen_size", "battery"],
  "Servidor":     ["cpu", "ram_gb", "storage_gb", "storage_type", "os"],
  "Teléfono IP":  [],
  "Celular":      ["ram_gb", "storage_gb", "os", "screen_size", "battery"],
  "Televisor":    ["screen_size", "os"],
  "Monitor":      ["screen_size"],
  "Impresora":    [],
  "Scanner":      [],
  "Mouse":        [],
  "Teclado":      [],
  "Switch":       [],
  "Router":       [],
  "Access Point": [],
  "UPS":          [],
  "Cámara IP":    [],
  "NAS":          ["ram_gb", "storage_gb", "storage_type", "os"],
  "Otro":         ["cpu", "ram_gb", "storage_gb", "storage_type", "os"]
}

const HARDWARE_LABELS = {
  cpu:          "Procesador (CPU)",
  ram_gb:       "RAM",
  storage_gb:   "Almacenamiento",
  storage_type: "Tipo de almacenamiento",
  gpu:          "Placa de video (GPU)",
  os:           "Sistema operativo",
  screen_size:  "Tamaño de pantalla",
  battery:      "Batería"
}

const STORAGE_TYPES = ["SSD", "HDD", "NVMe", "eMMC", "Otro"]

export default function DeviceForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty)
  const [brands, setBrands] = useState(ALL_BRANDS)
  const [hwFields, setHwFields] = useState([])

  useEffect(() => { setForm(initial || empty) }, [initial])

  useEffect(() => {
    if (form.device_type) {
      setBrands(BRANDS_BY_TYPE[form.device_type] || ALL_BRANDS)
      setHwFields(HARDWARE_FIELDS[form.device_type] || [])
      if (!BRANDS_BY_TYPE[form.device_type]?.includes(form.brand)) {
        setForm(f => ({ ...f, brand: "" }))
      }
    }
  }, [form.device_type])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.device_type) return alert("Nombre y tipo son obligatorios")
    onSubmit(form)
  }

  const field = (label, name, placeholder = "") => (
    <div className="field">
      <label>{label}</label>
      <input name={name} value={form[name] || ""} onChange={handle} placeholder={placeholder} />
    </div>
  )

  const select = (label, name, options) => (
    <div className="field">
      <label>{label}</label>
      <select name={name} value={form[name] || ""} onChange={handle}>
        <option value="">-- Seleccionar --</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )

  return (
    <form onSubmit={submit} className="device-form">
      <div className="form-section-title">📋 Información general</div>
      <div className="form-grid">
        {field("Nombre *", "name", "Ej: PC-Recepcion")}
        {select("Tipo de dispositivo *", "device_type", DEVICE_TYPES)}
        {select("Marca", "brand", brands)}
        {field("Modelo", "model", "Ej: EliteBook 840")}
        {field("Número de serie", "serial", "Ej: CNB1234567")}
        {field("Dirección IP", "ip_address", "Ej: 192.168.1.100")}
        {field("Dirección MAC", "mac_address", "Ej: AA:BB:CC:DD:EE:FF")}
        {field("Ubicación", "location", "Ej: Piso 2 - Oficina 3")}
        {field("Asignado a", "assigned_to", "Ej: Juan Pérez")}
        {select("Estado", "status", DEVICE_STATUS)}
      </div>

      {hwFields.length > 0 && (
        <>
          <div className="form-section-title" style={{marginTop: "16px"}}>🔧 Hardware</div>
          <div className="form-grid">
            {hwFields.map(f => f === "storage_type"
              ? select(HARDWARE_LABELS[f], f, STORAGE_TYPES)
              : field(HARDWARE_LABELS[f], f,
                  f === "cpu" ? "Ej: Intel Core i5-10400" :
                  f === "ram_gb" ? "Ej: 16 GB DDR4" :
                  f === "storage_gb" ? "Ej: 512 GB" :
                  f === "gpu" ? "Ej: NVIDIA GTX 1650" :
                  f === "os" ? "Ej: Windows 11 Pro" :
                  f === "screen_size" ? "Ej: 15.6 pulgadas" :
                  f === "battery" ? "Ej: 45 Wh / 3 celdas" : ""
                )
            )}
          </div>
        </>
      )}

      <div className="form-section-title" style={{marginTop: "16px"}}>📝 Notas</div>
      <div className="field">
        <textarea name="notes" value={form.notes || ""} onChange={handle} rows={3} placeholder="Observaciones adicionales..." />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">💾 Guardar</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
