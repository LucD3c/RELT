import { useState, useEffect } from "react"
import { DEVICE_TYPES, DEVICE_STATUS, BRANDS_BY_TYPE, ALL_BRANDS } from "../utils/constants"

const empty = {
  name: "", device_type: "", brand: "", model: "",
  serial: "", ip_address: "", mac_address: "",
  location: "", assigned_to: "", status: "activo", notes: ""
}

export default function DeviceForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty)
  const [brands, setBrands] = useState(ALL_BRANDS)

  useEffect(() => { setForm(initial || empty) }, [initial])

  useEffect(() => {
    if (form.device_type && BRANDS_BY_TYPE[form.device_type]) {
      setBrands(BRANDS_BY_TYPE[form.device_type])
      if (!BRANDS_BY_TYPE[form.device_type].includes(form.brand)) {
        setForm(f => ({ ...f, brand: "" }))
      }
    } else {
      setBrands(ALL_BRANDS)
    }
  }, [form.device_type])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.device_type) return alert("Nombre y tipo son obligatorios")
    onSubmit(form)
  }

  const field = (label, name, type = "text", placeholder = "") => (
    <div className="field">
      <label>{label}</label>
      <input type={type} name={name} value={form[name] || ""} onChange={handle} placeholder={placeholder} />
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
      <div className="form-grid">
        {field("Nombre *", "name", "text", "Ej: PC-Recepcion")}
        {select("Tipo de dispositivo *", "device_type", DEVICE_TYPES)}
        {select("Marca", "brand", brands)}
        {field("Modelo", "model", "text", "Ej: LaserJet Pro M404n")}
        {field("Número de serie", "serial", "text", "Ej: CNB1234567")}
        {field("Dirección IP", "ip_address", "text", "Ej: 192.168.1.100")}
        {field("Dirección MAC", "mac_address", "text", "Ej: AA:BB:CC:DD:EE:FF")}
        {field("Ubicación", "location", "text", "Ej: Piso 2 - Oficina 3")}
        {field("Asignado a", "assigned_to", "text", "Ej: Juan Pérez")}
        {select("Estado", "status", DEVICE_STATUS)}
      </div>
      <div className="field">
        <label>Notas</label>
        <textarea name="notes" value={form.notes || ""} onChange={handle} rows={3} placeholder="Observaciones adicionales..." />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">💾 Guardar</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
