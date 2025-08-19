import { NavLink } from 'react-router-dom'
import { 
  ArrowRightLeft, 
  ChartNoAxesCombined, 
  Settings, 
  Menu, 
  Landmark,
  CreditCard, 
  CircleDollarSign
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  const menus = [
    { name: 'Dashboard', path: '/', icon: <ChartNoAxesCombined size={20} /> },
    { name: 'Transações', path: '/transactions', icon: <ArrowRightLeft size={20} /> },
    { name: 'Investimentos', path: '/investments', icon: <CircleDollarSign size={20} /> },
    { name: 'Contas', path: '/accounts', icon: <CreditCard size={20} /> },
    { name: 'Bancos', path: '/banks', icon: <Landmark size={20} /> },
    { name: 'Configurações', path: '/settings', icon: <Settings size={20} /> },
  ]

  return (
    <aside className={`${open ? 'w-64' : 'w-20'} bg-slate-900 text-white min-h-screen p-4`}>
      <div className='flex justify-start align-center p-1 gap-2 mb-4'>
        <button onClick={() => setOpen(!open)}>
          <Menu size={24} />
        </button>
        { open && <div className="font-bold text-lg">Meu Financeiro</div> }
      </div>
      <nav className="space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 ${
                isActive ? 'bg-slate-700' : ''
              }`
            }
          >
            {menu.icon}
            {open && <span>{menu.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
