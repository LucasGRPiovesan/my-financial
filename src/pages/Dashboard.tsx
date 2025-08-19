import { DollarSign, ArrowUp, ArrowDown, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import TopBar from '../components/Topbar'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
  { id: 4, name: 'Mercado Pago', balance: 7300.0, logoUrl: 'https://logo.clearbit.com/mercadopago.com.br' },
  { id: 5, name: 'Banco Inter', balance: 11200.0, logoUrl: 'https://logo.clearbit.com/bancointer.com.br' },
  { id: 6, name: 'PagSeguro', balance: 11200.0, logoUrl: 'https://logo.clearbit.com/pagseguro.com.br' },
  { id: 6, name: 'Santander', balance: 11200.0, logoUrl: 'https://logo.clearbit.com/santander.com.br' },
]

// --- Tipos de lançamento ---
type TransactionType = 'APORTE' | 'RENDIMENTO' | 'RESGATE' | 'GASTO'

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
  { id: 2, bankId: 2, description: 'Aluguel', value: 1800, type: 'GASTO', date: '2025-08-14' },
  { id: 3, bankId: 1, description: 'Investimento', value: 1000, type: 'RENDIMENTO', date: '2025-08-10' },
  { id: 4, bankId: 3, description: 'Resgate Fundo', value: 500, type: 'RESGATE', date: '2025-08-09' },
  { id: 5, bankId: 3, description: 'Supermercado', value: 400, type: 'GASTO', date: '2025-08-08' },
]

// --- Dados do gráfico histórico ---
const lineData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
  datasets: [
    {
      label: 'Aportes',
      data: [500, 1000, 800, 1200, 900, 1500, 1300, 2000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.3,
    },
    {
      label: 'Gastos',
      data: [400, 600, 700, 500, 800, 750, 900, 1000],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      tension: 0.3,
    },
    {
      label: 'Rendimentos',
      data: [200, 400, 300, 500, 450, 600, 700, 1200],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      tension: 0.3,
    },
  ],
}

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Saúde Financeira Mensal' },
  },
}

export default function Dashboard() {
  const getBankName = (id: number) => banks.find((b) => b.id === id)?.name || 'Desconhecido'
  const getBankLogo = (id: number) => banks.find((b) => b.id === id)?.logoUrl || ''

  const totalBalance = banks.reduce((sum, b) => sum + b.balance, 0)

  const totalAportes = 5000
  const totalRendimentos = 1000
  const totalResgates = 500

  return (
    <div className="space-y-6">

      {/* TopBar */}
      <TopBar namespace="Dashboard" />

      {/* Cards de Bancos + Gráficos lado a lado */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Card de Saldo Total + Targets + Bancos */}
        <div className="flex-[2] flex flex-col gap-4">

          {/* Card de Saldo Total */}
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center gap-4">
            <div className="text-center">
              <div className="text-gray-500 text-sm">Saldo Total</div>
              <div className="text-3xl font-bold text-green-600">
                R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Targets centralizados abaixo do total */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Aportes */}
              <div>
                <div className="text-gray-500 text-sm">Aportes</div>
                <div className="text-lg font-bold flex items-center justify-center gap-2">
                  <ArrowDown className="text-blue-500" /> R$ {totalAportes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Rendimentos */}
              <div>
                <div className="text-gray-500 text-sm">Rendimentos</div>
                <div className="text-lg font-bold flex items-center justify-center gap-2">
                  <TrendingUp className="text-green-500" /> R$ {totalRendimentos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Resgates */}
              <div>
                <div className="text-gray-500 text-sm">Resgates</div>
                <div className="text-lg font-bold flex items-center justify-center gap-2">
                  <ArrowUp className="text-red-500" /> R$ {totalResgates.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              {/* Contas */}
              <div>
                <div className="text-gray-500 text-sm">Contas</div>
                <div className="text-lg font-bold flex items-center justify-center gap-2">
                  <TrendingDown className="text-red-500" /> R$ {totalResgates.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>

          {/* Cards dos bancos */}
          <div className="bg-white shadow-md rounded-lg p-4 overflow-y-auto" style={{ maxHeight: '47vh' }}>
            <div className="space-y-4">
              {banks.map((bank) => (
                <div key={bank.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 shadow-sm">
                  <img src={bank.logoUrl} alt={bank.name} className="w-10 h-10 object-contain"/>
                  <div>
                    <div className="text-gray-500 text-sm">{bank.name}</div>
                    <div className="text-lg font-bold">
                      R$ {bank.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gráfico histórico à direita */}
        <div
          className="bg-none rounded-lg p-4 flex-[8]" 
          style={{ width: '100%', height: 'auto' }}
        >
          <Line data={lineData} options={lineOptions} />
        </div>
        {/* <div className="bg-white rounded-lg p-4 flex-[8]">
        </div> */}
      </div>

      {/* Últimos Lançamentos */}
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <div className="text-gray-700 font-semibold mb-4">Últimos Lançamentos</div>
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
            {transactions.map((tx) => {
              const icon =
                tx.type === 'APORTE' ? <TrendingUp className="inline w-4 h-4 mr-1 text-blue-500" /> :
                tx.type === 'RENDIMENTO' ? <DollarSign className="inline w-4 h-4 mr-1 text-green-500" /> :
                tx.type === 'RESGATE' ? <TrendingDown className="inline w-4 h-4 mr-1 text-red-500" /> :
                <CreditCard className="inline w-4 h-4 mr-1 text-red-500" />

              const typeColor =
                tx.type === 'APORTE' ? 'bg-blue-100 text-blue-800' :
                tx.type === 'RENDIMENTO' ? 'bg-green-100 text-green-800' :
                tx.type === 'RESGATE' ? 'bg-red-100 text-red-800' :
                'bg-red-100 text-red-800'

              return (
                <tr key={tx.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <img src={getBankLogo(tx.bankId)} alt={getBankName(tx.bankId)} className="w-8 h-8 rounded-full"/>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{tx.description}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColor}`}>
                      {tx.type.toLowerCase()}
                    </span>
                  </td>
                  <td className={`px-4 py-2 whitespace-nowrap text-right font-semibold 
                    ${tx.type === 'APORTE' || tx.type === 'RENDIMENTO' ? 'text-green-500' : 'text-red-500'}`}>
                    {icon} R$ {tx.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{tx.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
