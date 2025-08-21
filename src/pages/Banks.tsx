import { useEffect, useState } from 'react'
import { Dialog, Tab } from '@headlessui/react'
import { Pencil, Plus, X } from 'lucide-react'
import TopBar from '../components/Topbar'
import { BankService } from '../services/BankService'

type Bank = {
  id: number
  name: string
  code?: string
  logoUrl?: string
  // items: string[],
  balance: number
}

// Dados falsos
// const initialBanks: Bank[] = [
//   { id: 1, name: 'Banco do Brasil', logoUrl: 'https://logo.clearbit.com/bb.com.br', items: ['CDB', 'Poupança'], balance: 15000.50 },
//   { id: 2, name: 'Nubank', logoUrl: 'https://logo.clearbit.com/nubank.com.br', items: ['Conta Digital', 'Investimentos'], balance: 8200.75 },
//   { id: 3, name: 'Itaú', logoUrl: 'https://logo.clearbit.com/itau.com.br', items: ['CDB', 'LCI', 'LCI'], balance: 15400.20 },
//   { id: 4, name: 'Santander', logoUrl: 'https://logo.clearbit.com/santander.com.br', items: ['Poupança', 'Fundos'], balance: 7300.00 },
// ]

export default function Banks() {
  const [banks, setBanks] = useState<Bank[]>([])
  const [open, setOpen] = useState(false)
  const [editingBank, setEditingBank] = useState<Bank | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  // Paginação
  const totalPages = Math.ceil(banks.length / itemsPerPage)
  // const paginatedBanks = banks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const openModal = (bank?: Bank) => {
    if (bank) setEditingBank(bank)
    else setEditingBank(null)
    setOpen(true)
  }

  const closeModal = () => {
    setEditingBank(null)
    setOpen(false)
  }

  const saveBank = (bank: Bank) => {
    if (bank.id) {
      // Edit
      setBanks((prev) => prev.map((b) => (b.id === bank.id ? bank : b)))
    } else {
      // New
      setBanks((prev) => [...prev, { ...bank, id: prev.length + 1 }])
    }
    closeModal()
  }

  const formatBalance = (balance: number) => {
    return (balance / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
  }

  useEffect(() => {
    const fetchBanks = async () => {
      const banksData = await BankService.listBanks()
      setBanks(banksData)
    }

    fetchBanks();
  }, []);

  return (
    <div className="space-y-6">

      {/* TopBar */}
      <TopBar namespace="Bancos" />

      {/* Cards dos bancos */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {banks.map((bank) => (
          <div key={bank.id} className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
            <img src={bank.logoUrl} alt={bank.name} className="w-10 h-10 object-contain"/>
            <div>
              <div className="text-gray-500 text-sm">{bank.name}</div>
              <div className="text-lg font-bold">
                R$ {formatBalance(bank.balance)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        
        {/* Botão Novo Banco */}
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 font-semibold">Listagem de Bancos</span>
          <button
            onClick={() => openModal()}
            className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 flex items-center gap-2"
          >
            <Plus size={16} /> Novo Banco
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Banco</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Código</th>
              {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Código</th> */}
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {banks.map((bank) => (
              <tr key={bank.id}>
                <td className="flex items-center gap-3 px-4 py-2 whitespace-nowrap">
                  <img src={bank.logoUrl} alt={bank.name} className="w-10 h-10 object-contain"/>
                  <span>{bank.name}</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{bank.code}</td>
                {/* <td className="px-4 py-2 whitespace-nowrap">
                  {bank.items.map((item, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full mr-1">
                      {item}
                    </span>
                  ))}
                </td> */}
                <td className="px-4 py-2 whitespace-nowrap text-right">
                  <button onClick={() => openModal(bank)} className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                    <Pencil size={16} /> Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-sm font-medium">{currentPage} / {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={closeModal} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true" />

          {/* Container do modal */}
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-bold">
                {editingBank ? 'Editar Banco' : 'Novo Banco'}
              </Dialog.Title>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <Tab.Group>
              <Tab.List className="flex space-x-2 border-b mb-4">
                <Tab className={({ selected }) =>
                  `px-3 py-1 text-sm rounded-t-lg ${
                    selected ? 'bg-slate-100 font-semibold' : 'text-gray-500'
                  }`
                }>
                  Informações
                </Tab>
                <Tab className={({ selected }) =>
                  `px-3 py-1 text-sm rounded-t-lg ${
                    selected ? 'bg-slate-100 font-semibold' : 'text-gray-500'
                  }`
                }>
                  Itens
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  {/* Formulário de banco */}
                </Tab.Panel>
                <Tab.Panel>
                  {/* Aba de Itens */}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 rounded border hover:bg-gray-100">Cancelar</button>
              <button
                onClick={() => editingBank && saveBank(editingBank)}
                className="px-4 py-2 rounded bg-slate-900 text-white hover:bg-slate-800"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Dialog>


    </div>
  )
}
