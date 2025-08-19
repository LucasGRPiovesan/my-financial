// Investments.tsx
import { useState, useMemo } from "react"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { TrendingUp, DollarSign, Landmark, PlusCircle, TrendingDown } from "lucide-react"
import TopBar from "../components/Topbar"
import { Dialog } from "@headlessui/react"

ChartJS.register(ArcElement, ChartTooltip, Legend)

type Investimento = {
  id: number
  descricao: string
  tipo: "Renda Fixa" | "Renda Variável" | "Fundo" | "Cripto"
  valor: number
  rentabilidade: number // %
  banco?: string
  bancoLogoUrl?: string
}

export default function Investments() {
  const [investimentos, setInvestimentos] = useState<Investimento[]>([
    { id: 1, descricao: "Tesouro Selic 2027", tipo: "Renda Fixa", valor: 5000, rentabilidade: 12.5, banco: "Banco do Brasil", bancoLogoUrl: "https://logo.clearbit.com/bb.com.br" },
    { id: 2, descricao: "Ações PETR4", tipo: "Renda Variável", valor: 3000, rentabilidade: 18.2, banco: "XP Investimentos", bancoLogoUrl: "https://logo.clearbit.com/xp.com.br" },
    { id: 3, descricao: "Fundo Imobiliário HGLG11", tipo: "Fundo", valor: 2000, rentabilidade: 9.3, banco: "BTG Pactual", bancoLogoUrl: "https://logo.clearbit.com/btgpactual.com" },
    { id: 4, descricao: "Bitcoin", tipo: "Cripto", valor: 1500, rentabilidade: 22.1, bancoLogoUrl: "https://logo.clearbit.com/xp.com.br" },
    { id: 1, descricao: "Tesouro Selic 2027", tipo: "Renda Fixa", valor: 5000, rentabilidade: 12.5, banco: "Banco do Brasil", bancoLogoUrl: "https://logo.clearbit.com/bb.com.br" },
    { id: 2, descricao: "Ações PETR4", tipo: "Renda Variável", valor: 3000, rentabilidade: 18.2, banco: "XP Investimentos", bancoLogoUrl: "https://logo.clearbit.com/xp.com.br" },
    { id: 3, descricao: "Fundo Imobiliário HGLG11", tipo: "Fundo", valor: 2000, rentabilidade: 9.3, banco: "BTG Pactual", bancoLogoUrl: "https://logo.clearbit.com/btgpactual.com" },
    { id: 4, descricao: "Bitcoin", tipo: "Cripto", valor: 1500, rentabilidade: 22.1, bancoLogoUrl: "https://logo.clearbit.com/xp.com.br" },
    { id: 4, descricao: "Bitcoin", tipo: "Cripto", valor: 1500, rentabilidade: 22.1, bancoLogoUrl: "https://logo.clearbit.com/xp.com.br" },
  ])

  const [selectedInvestment, setSelectedInvestment] = useState<Investimento | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const totalInvestido = useMemo(() => investimentos.reduce((acc, i) => acc + i.valor, 0), [investimentos])
  const totalRentabilidade = useMemo(() => investimentos.reduce((acc, i) => acc + (i.valor * i.rentabilidade) / 100, 0), [investimentos])

  const distribuicao = useMemo(() => {
    const map = new Map<string, number>()
    investimentos.forEach((i) => map.set(i.tipo, (map.get(i.tipo) || 0) + i.valor))
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [investimentos])

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"]

  const data = {
    labels: distribuicao.map(d => d.name),
    datasets: [
      {
        data: distribuicao.map(d => d.value),
        backgroundColor: COLORS,
        hoverOffset: 8,
      },
    ],
  }

  const handleAddInvestment = () => setOpenModal(true)

  return (
    <div className="space-y-6">
      
      <TopBar namespace="Investimentos" />

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <DollarSign className="text-green-500" size={28} />
          <div>
            <div className="text-gray-500 text-sm">Total Investido</div>
            <div className="text-xl font-bold">R$ {totalInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <TrendingUp className="text-blue-500" size={28} />
          <div>
            <div className="text-gray-500 text-sm">Rentabilidade</div>
            <div className="text-xl font-bold">R$ {totalRentabilidade.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <TrendingDown className="text-blue-500" size={28} />
          <div>
            <div className="text-gray-500 text-sm">Desvalorização</div>
            <div className="text-xl font-bold">R$ {totalRentabilidade.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <Landmark className="text-purple-500" size={28} />
          <div>
            <div className="text-gray-500 text-sm">Instituições</div>
            <div className="text-xl font-bold">
              {new Set(investimentos.map((i) => i.banco).filter(Boolean)).size}
            </div>
          </div>
        </div>
      </div>

      {/* Área principal: gráfico + lista lado a lado */}
      <div className="flex h-[calc(100vh-300px)]">

        {/* Gráfico - 70% */}
        <div className="flex justify-center bg-none rounded-lg p-4 flex-[6]">
          <Doughnut data={data} className="max-w-full max-h-full" />
        </div>

        {/* Lista de investimentos - 30% */}
        <div className="bg-white shadow-md rounded-lg p-4 flex-[4] flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-semibold">Meus Investimentos</span>
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2"
              onClick={handleAddInvestment}
            >
              <PlusCircle size={16} /> Novo Investimento
            </button>
          </div>
          <div className="divide-y overflow-y-auto">
            {investimentos.map((i) => (
              <div
                key={i.id}
                onClick={() => setSelectedInvestment(i)}
                className="p-3 cursor-pointer hover:bg-gray-50 transition rounded-md flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  {i.bancoLogoUrl && (
                    <img src={i.bancoLogoUrl} alt={i.banco} className="w-8 h-8 object-contain rounded-full border" />
                  )}
                  <div>
                    <p className="font-semibold">{i.descricao}</p>
                    <p className="text-sm text-gray-500">{i.tipo} {i.banco && `• ${i.banco}`}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">R$ {i.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-green-600">{i.rentabilidade}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de detalhes */}
      <Dialog open={!!selectedInvestment || openModal} onClose={() => { setSelectedInvestment(null); setOpenModal(false) }} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            {selectedInvestment ? (
              <>
                <Dialog.Title className="text-lg font-bold mb-2">{selectedInvestment.descricao}</Dialog.Title>
                <p><strong>Tipo:</strong> {selectedInvestment.tipo}</p>
                <p><strong>Valor:</strong> R$ {selectedInvestment.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                <p><strong>Rentabilidade:</strong> {selectedInvestment.rentabilidade}%</p>
                {selectedInvestment.banco && (
                  <p><strong>Banco:</strong> {selectedInvestment.banco}</p>
                )}
                <button
                  onClick={() => setSelectedInvestment(null)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Fechar
                </button>
              </>
            ) : (
              <>
                <Dialog.Title className="text-lg font-bold mb-2">Novo Investimento</Dialog.Title>
                {/* Formulário de cadastro */}
                <p className="text-gray-500 mb-4">Formulário de cadastro aqui...</p>
                <button
                  onClick={() => setOpenModal(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Fechar
                </button>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

    </div>
  )
}
