export const DEVICE_TYPES = [
  "Computadora",
  "Notebook",
  "Servidor",
  "Impresora",
  "Scanner",
  "Teléfono IP",
  "Celular",
  "Televisor",
  "Monitor",
  "Mouse",
  "Teclado",
  "Switch",
  "Router",
  "Access Point",
  "UPS",
  "Cámara IP",
  "NAS",
  "Otro"
]

export const DEVICE_STATUS = [
  "activo",
  "inactivo",
  "en reparacion"
]

export const BRANDS_BY_TYPE = {
  "Computadora":  ["HP", "Dell", "Lenovo", "Apple", "Acer", "Asus", "Toshiba", "Samsung", "MSI", "Otro"],
  "Notebook":     ["HP", "Dell", "Lenovo", "Apple", "Acer", "Asus", "Toshiba", "Samsung", "MSI", "Huawei", "Otro"],
  "Servidor":     ["HP", "Dell", "IBM", "Lenovo", "Supermicro", "Fujitsu", "Oracle", "Otro"],
  "Impresora":    ["HP", "Epson", "Canon", "Brother", "Lexmark", "Xerox", "Ricoh", "Kyocera", "Samsung", "Otro"],
  "Scanner":      ["Epson", "Canon", "HP", "Fujitsu", "Brother", "Kodak", "Otro"],
  "Teléfono IP":  ["Fanvil", "Yealink", "Cisco", "Polycom", "Grandstream", "Snom", "Avaya", "Panasonic", "Alcatel", "Otro"],
  "Celular":      ["Samsung", "Apple", "Motorola", "Xiaomi", "LG", "Huawei", "Nokia", "Sony", "OnePlus", "Otro"],
  "Televisor":    ["Samsung", "LG", "Sony", "Philips", "TCL", "Hisense", "Sharp", "Otro"],
  "Monitor":      ["Samsung", "LG", "Dell", "HP", "Asus", "Acer", "BenQ", "ViewSonic", "Philips", "Otro"],
  "Mouse":        ["Logitech", "Microsoft", "Razer", "HP", "Dell", "Genius", "Trust", "Otro"],
  "Teclado":      ["Logitech", "Microsoft", "Razer", "HP", "Dell", "Genius", "Trust", "Otro"],
  "Switch":       ["Cisco", "HP", "TP-Link", "Netgear", "D-Link", "Ubiquiti", "Mikrotik", "Ruijie", "Huawei", "Otro"],
  "Router":       ["Cisco", "MikroTik", "TP-Link", "Netgear", "D-Link", "Ubiquiti", "Huawei", "Asus", "Otro"],
  "Access Point": ["Ubiquiti", "Cisco", "TP-Link", "Netgear", "D-Link", "Aruba", "Mikrotik", "Ruijie", "Otro"],
  "UPS":          ["APC", "Eaton", "CyberPower", "Riello", "Salicru", "Forza", "Otro"],
  "Cámara IP":    ["Hikvision", "Dahua", "Axis", "Hanwha", "Bosch", "Ubiquiti", "TP-Link", "Otro"],
  "NAS":          ["Synology", "QNAP", "Western Digital", "Netgear", "Buffalo", "Otro"],
  "Otro":         ["Otro"]
}

export const ALL_BRANDS = [...new Set(Object.values(BRANDS_BY_TYPE).flat())].sort()
