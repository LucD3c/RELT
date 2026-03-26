import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export function exportToExcel(devices) {
  const rows = devices.map(d => ({
    "ID":             d.id,
    "Nombre":         d.name,
    "Tipo":           d.device_type,
    "Marca":          d.brand || "",
    "Modelo":         d.model || "",
    "N° de Serie":    d.serial || "",
    "IP":             d.ip_address || "",
    "MAC":            d.mac_address || "",
    "Ubicación":      d.location || "",
    "Asignado a":     d.assigned_to || "",
    "Estado":         d.status,
    "Notas":          d.notes || "",
    "Fecha creación": d.created_at ? new Date(d.created_at).toLocaleDateString("es-AR") : ""
  }))

  const ws = XLSX.utils.json_to_sheet(rows)

  // Ancho de columnas
  ws["!cols"] = [
    { wch: 5 },  { wch: 25 }, { wch: 15 }, { wch: 15 },
    { wch: 20 }, { wch: 18 }, { wch: 16 }, { wch: 20 },
    { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 15 }
  ]

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Dispositivos")

  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" })
  saveAs(new Blob([buf], { type: "application/octet-stream" }), `RELT_${new Date().toISOString().slice(0,10)}.xlsx`)
}
