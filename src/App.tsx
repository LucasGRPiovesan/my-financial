import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet /> {/* Aqui é onde as páginas vão renderizar */}
      </main>
    </div>
  )
}
