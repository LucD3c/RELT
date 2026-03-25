import { useState, useEffect } from "react"
import { DEVICE_TYPES, DEVICE_STATUS, BRANDS } from "../utils/constants"

const empty = {
  name: "", device_type: "", brand: "", model: "",
  serial: "", ip_address: "", mac_address: "",
  location: "", assigned_to: "", status: "activo", notes: ""
}

export default function DeviceForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty)

  useEffect(() => { setForm(initial || empty) }, [initial])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  const field = (label, name, type = "text") => (
    <div className="field">
      <label>{label}</label>
      <input type={type} name={name} value={form[name] || ""} onChange={handle} />
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
      {field("Nombre *", "name")}
      {select("Tipo de dispositivo *", "device_type", DEVICE_TYPES)}
      {select("Marca", "brand", BRANDS)}
      {field("Modelo", "model")}
      {field("Número de serie", "serial")}
      {field("Dirección IP", "ip_address")}
      {field("Dirección MAC", "mac_address")}
      {field("Ubicación", "location")}
      {field("Asignado a", "assigned_to")}
      {select("Estado", "status", DEVICE_STATUS)}
      <div className="field">
        <label>Notas</label>
        <textarea name="notes" value={form.notes || ""} onChange={handle} rows={3} />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">Guardar</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
