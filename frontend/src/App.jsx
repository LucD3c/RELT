import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Dashboard />
    </>
  )
}
