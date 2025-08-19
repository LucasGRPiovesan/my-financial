// TopBar.tsx
import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, User } from 'lucide-react'

type TopBarProps = {
  namespace?: string // prop opcional
}

export default function TopBar({ namespace }: TopBarProps) {
  const userName = 'Lucas Piovesan'

  return (
    <header className="bg-gray-900 text-white shadow-md w-full flex justify-between items-center px-6 py-3 sticky top-0 z-40 rounded-lg">
      {/* Logo ou título */}
      <div className="flex items-center gap-2">
        <div className="text-xl font-bold">
          {namespace ? namespace : 'Painel Financeiro'}
        </div>
      </div>

      {/* Usuário / Menu */}
      <div className="flex items-center gap-4">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 focus:outline-none">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center shadow-md border border-gray-600">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 block w-2 h-2 rounded-full bg-green-500 border-2 border-gray-900"></span>
            </div>
            <span className="hidden sm:inline">{userName}</span>
            <ChevronDown className="w-4 h-4" />
          </Menu.Button>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg py-1 focus:outline-none z-50">
              <Menu.Item>
                {({ active }) => (
                  <button className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                    Perfil
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}>
                    Configurações
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button className={`w-full text-left px-4 py-2 text-sm text-red-600 ${active ? 'bg-gray-100' : ''}`}>
                    Sair
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  )
}
