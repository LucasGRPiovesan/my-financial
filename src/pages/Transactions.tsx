import React, { Fragment, useState } from 'react'
import { DollarSign, ArrowUp, ArrowDown, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import {
  Transition,
  Dialog,
} from '@headlessui/react';
import TopBar from '../components/Topbar';
// import { Dialog } from '@headlessui/react'

// --- Dados fictícios de bancos ---
type BankCard = {
  id: number
  name: string
  balance: number
  logoUrl: string
}

const banks: BankCard[] = [
  { id: 1, name: 'PicPay', balance: 12500.75, logoUrl: 'https://logo.clearbit.com/picpay.com.br' },
  { id: 2, name: 'Nubank', balance: 8200.50, logoUrl: 'https://logo.clearbit.com/nubank.com.br' },
  { id: 3, name: 'Itaú', balance: 15400.20, logoUrl: 'https://logo.clearbit.com/itau.com.br' },
]

// --- Tipos de lançamento ---
type TransactionType = 'APORTE' | 'RENDIMENTO' | 'RESGATE' | 'CONTA'

type Transaction = {
  id: number
  bankId: number
  description: string
  value: number
  type: TransactionType
  date: string
}

const transactions: Transaction[] = [
  { id: 1, bankId: 1, description: 'Salário', value: 5000, type: 'APORTE', date: '2025-08-15' },
  { id: 2, bankId: 2, description: 'Aluguel', value: 1800, type: 'CONTA', date: '2025-08-14' },
  { id: 3, bankId: 1, description: 'Investimento', value: 1000, type: 'RENDIMENTO', date: '2025-08-10' },
  { id: 4, bankId: 3, description: 'Resgate Fundo', value: 500, type: 'RESGATE', date: '2025-08-09' },
  { id: 5, bankId: 3, description: 'Supermercado', value: 400, type: 'CONTA', date: '2025-08-08' },
  { id: 6, bankId: 2, description: 'Bônus', value: 2000, type: 'APORTE', date: '2025-08-07' },
  { id: 7, bankId: 1, description: 'Dividendos', value: 500, type: 'RENDIMENTO', date: '2025-08-06' },
]

// --- Paginação ---
const ITEMS_PER_PAGE = 4

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Função para abrir o modal
  const openModal = () => setIsOpen(true)

  // Função para fechar o modal
  const closeModal = () => setIsOpen(false)

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE)
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getBank = (id: number) => banks.find((b) => b.id === id)

  const getIcon = (type: TransactionType) => {
    switch (type) {
      case 'APORTE': return <ArrowDown className="text-blue-500 w-4 h-4" />
      case 'RENDIMENTO': return <TrendingUp className="text-green-500 w-4 h-4" />
      case 'RESGATE': return <ArrowUp className="text-gray-500 w-4 h-4" />
      case 'CONTA': return <TrendingDown className="text-red-400 w-4 h-4" />
    }
  }

  // Função que define status da saúde financeira
  function calcularStatusSaude(porcentagemSaude: number) {
    if (porcentagemSaude > 90) {
      return {
        color: 'green',
        bgColor: '#10b981', // verde
        text: 'ótima',
        recomendation: 'Seu fluxo financeiro está saudável, continue assim.'
      }
    } else if (porcentagemSaude >= 75) {
      return {
        color: 'blue',
        bgColor: '#3c83f6', // verde
        text: 'boa',
        recomendation: 'Seu fluxo financeiro está bom, mas pode melhorar.'
      }
    } else if (porcentagemSaude >= 40) {
      return {
        color: 'yellow',
        bgColor: '#facc15', // amarelo
        text: 'pode melhorar',
        recomendation: 'Cuidado com Contas e resgates, reveja seus investimentos.'
      }
    } else {
      return {
        color: 'red',
        bgColor: '#ef4444', // vermelho
        text: 'preocupante',
        recomendation: 'Atenção! Suas Contas/resgates estão comprometendo seu saldo.'
      }
    }
  }

  // Calculo saúde financeira
  const totalAportes = transactions.filter(t => t.type === 'APORTE').reduce((sum, t) => sum + t.value, 0)
  const totalRendimentos = transactions.filter(t => t.type === 'RENDIMENTO').reduce((sum, t) => sum + t.value, 0)
  const totalResgates = transactions.filter(t => t.type === 'RESGATE').reduce((sum, t) => sum + t.value, 0)
  const totalContas = transactions.filter(t => t.type === 'CONTA').reduce((sum, t) => sum + t.value, 0)

  const saldoLiquido = totalAportes + totalRendimentos - (totalResgates + totalContas)
  const maxSaude = totalAportes + totalRendimentos
  const porcentagemSaude = Math.max(0, Math.min(100, Math.round((saldoLiquido / maxSaude) * 100)))

  const statusSaude = calcularStatusSaude(porcentagemSaude)

  return (
    <div className="space-y-6">

      {/* TopBar */}
      <TopBar namespace="Transações" />

      {/* Cards de resumo com estilo Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <TrendingUp className="text-green-500" />
          <div>
            <div className="text-gray-500 text-sm">Rendimentos</div>
            <div className="text-xl font-bold">
              R$ {totalRendimentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <ArrowDown className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Aportes</div>
            <div className="text-xl font-bold">
              R$ {totalAportes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <ArrowUp className="text-gray-500" />
          <div>
            <div className="text-gray-500 text-sm">Resgates</div>
            <div className="text-xl font-bold">
              R$ {totalResgates.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <TrendingDown className="text-red-500" />
          <div>
            <div className="text-gray-500 text-sm">Contas</div>
            <div className="text-xl font-bold">
              R$ {totalResgates.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Saúde Financeira */}
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
        <div className="text-gray-700 font-semibold">Saúde Financeira</div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="h-4 rounded-full transition-all duration-500"
            style={{ width: `${porcentagemSaude}%`, backgroundColor: statusSaude.bgColor }}
          />
        </div>
        <div className="text-sm text-gray-600 mt-1">{statusSaude.recomendation}</div>
      </div>

      {/* Tabela de transações com badges light e ícones */}
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        {/* Botão Nova Transação */}
        <div className="flex justify-between align-center mb-4">
          <span className="text-gray-700 font-semibold">Listagem de transações</span>
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={openModal}
          >
            Nova Transação
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Banco</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Descrição</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Tipo</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Valor</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedTransactions.map(tx => (
              <tr key={tx.id}>
                <td className="px-4 py-2 whitespace-nowrap">
                  <img src={getBank(tx.bankId)?.logoUrl} alt={getBank(tx.bankId)?.name} className="w-6 h-6 object-contain"/>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{tx.description}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full 
                      ${
                        tx.type === 'APORTE' ? 'bg-blue-100 text-blue-800' :
                        tx.type === 'RENDIMENTO' ? 'bg-green-100 text-green-800' :
                        tx.type === 'RESGATE' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-600'
                      }`}
                  >
                    {getIcon(tx.type)}
                    {tx.type.toLowerCase()}
                  </span>
                </td>
                <td className={`px-4 py-2 whitespace-nowrap text-right font-semibold 
                  ${tx.type === 'APORTE' || tx.type === 'RENDIMENTO' ? 'text-green-600' : (tx.type === 'RESGATE' ) ? 'text-gray-600' : 'text-red-600'}`}>
                  R$ {tx.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex justify-end items-center mt-4 gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            «
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${currentPage === i+1 ? 'bg-gray-900 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setCurrentPage(i+1)}
            >
              {i+1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            »
          </button>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Overlay manual */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />

          <Transition.Child
            as={Fragment}
            enter="transition ease-in duration-900"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-900"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >           
            {/* Painel do modal */}
            <Dialog.Panel
              className={`bg-white rounded-lg shadow-lg w-96 p-6 transform transition-transform duration-300
                ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-semibold">Nova Transação</Dialog.Title>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              {/* Conteúdo */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Descrição"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Valor"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="APORTE">Aporte</option>
                  <option value="RENDIMENTO">Rendimento</option>
                  <option value="RESGATE">Resgate</option>
                  <option value="GASTO">Gasto</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200">
                    Salvar
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}
