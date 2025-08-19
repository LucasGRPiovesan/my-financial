// Accounts.tsx
import { useState, useMemo } from "react"
import {
  Calendar,
  dateFnsLocalizer,
  type Event as RBCEvent,
} from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import TopBar from "../components/Topbar"
import {
  TrendingUp,
  PlusCircle,
  CreditCard,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react"
import { Dialog } from "@headlessui/react"

type Status = "pago" | "pendente" | "atrasado"

type Conta = {
  id: number
  descricao: string
  valor: number
  vencimento: Date
  status: "pago" | "pendente" | "atrasado"
}

const locales = { "pt-BR": ptBR }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
})

export default function Contas() {
  const [contas, setContas] = useState<Conta[]>([
    { id: 1, descricao: "Luz", valor: 120, vencimento: new Date(2025, 7, 20), status: "pendente" },
    { id: 2, descricao: "Internet", valor: 99, vencimento: new Date(2025, 7, 22), status: "pago" },
    { id: 3, descricao: "Aluguel", valor: 1500, vencimento: new Date(2025, 7, 25), status: "atrasado" },
    { id: 4, descricao: "Cartão de Crédito", valor: 2300, vencimento: new Date(2025, 7, 28), status: "pendente" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [novaConta, setNovaConta] = useState<Omit<Conta, "id">>({
    descricao: "",
    valor: 0,
    vencimento: new Date(),
    status: "pendente",
  })

  const [selectedConta, setSelectedConta] = useState<Conta | null>(null)

  const proximasContas = useMemo(
    () => [...contas].sort((a, b) => a.vencimento.getTime() - b.vencimento.getTime()),
    [contas]
  )

  // Totais
  const totalPago = contas.filter(c => c.status === "pago").reduce((acc, c) => acc + c.valor, 0)
  const totalPendentes = contas.filter(c => c.status === "pendente").reduce((acc, c) => acc + c.valor, 0)
  const totalAtrasado = contas.filter(c => c.status === "atrasado").reduce((acc, c) => acc + c.valor, 0)

  const events: RBCEvent[] = contas.map((c) => ({
    title: c.descricao,
    start: c.vencimento,
    end: c.vencimento,
    allDay: true,
    resource: c,
  }))

  const eventStyleGetter = (event: RBCEvent) => {
    const conta = event.resource as Conta
    let bg = "#3b82f6"
    if (conta.status === "pago") bg = "#22c55e"
    if (conta.status === "pendente") bg = "#f59e0b"
    if (conta.status === "atrasado") bg = "#ef4444"
    return {
      style: {
        backgroundColor: bg,
        borderRadius: "8px",
        color: "white",
        border: "none",
        padding: "4px",
      },
    }
  }

  const handleAddConta = () => {
    setContas((prev) => [...prev, { ...novaConta, id: prev.length + 1 }])
    setIsOpen(false)
    setNovaConta({ descricao: "", valor: 0, vencimento: new Date(), status: "pendente" })
  }

  return (
    <div className="space-y-6">
      
      {/* TopBar */}
      <TopBar namespace="Contas" />

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          <div>
            <div className="text-gray-500 text-sm">Pagas</div>
            <div className="text-xl font-bold">R$ {totalPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-yellow-500" />
          <div>
            <div className="text-gray-500 text-sm">Pendentes</div>
            <div className="text-xl font-bold">R$ {totalPendentes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-3">
          <TrendingUp className="text-red-500" />
          <div>
            <div className="text-gray-500 text-sm">Atrasadas</div>
            <div className="text-xl font-bold">R$ {totalAtrasado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-160px)]">
        {/* Calendário */}
        <main className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CalendarDays className="text-blue-600" /> Calendário de Contas
            </h2>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Nova Conta
            </button>
          </div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "80vh" }}
            popup
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => setSelectedConta(event.resource as Conta)}
            messages={{
              next: "Próximo",
              previous: "Anterior",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              agenda: "Agenda",
            }}
          />
        </main>

        {/* Aside - próximas contas */}
        <aside className="w-1/4 bg-white shadow rounded-lg p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Próximas Contas</h2>
          <ul className="space-y-3">
            {proximasContas.map((conta) => (
              <li
                key={conta.id}
                className="p-3 rounded-lg shadow-sm border flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setSelectedConta(conta)}
              >
                <div>
                  <p className="font-semibold">{conta.descricao}</p>
                  <p className="text-sm text-gray-500">
                    {format(conta.vencimento, "dd/MM/yyyy")}
                  </p>
                </div>
                <span
                  className={`font-bold ${
                    conta.status === "pago"
                      ? "text-green-600"
                      : conta.status === "pendente"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  R$ {conta.valor.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Modal de detalhes */}
      <Dialog open={!!selectedConta} onClose={() => setSelectedConta(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
            {selectedConta && (
              <>
                <Dialog.Title className="text-lg font-bold flex items-center gap-2">
                  <CreditCard className="text-blue-500" /> {selectedConta.descricao}
                </Dialog.Title>
                <p className="text-gray-600">
                  Valor:{" "}
                  <span className="font-semibold text-slate-900">
                    R$ {selectedConta.valor.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-600">
                  Vencimento: {format(selectedConta.vencimento, "dd/MM/yyyy")}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  Status:{" "}
                  {selectedConta.status === "pago" && (
                    <CheckCircle2 className="text-green-500" />
                  )}
                  {selectedConta.status === "pendente" && (
                    <AlertTriangle className="text-yellow-500" />
                  )}
                  {selectedConta.status === "atrasado" && (
                    <AlertTriangle className="text-red-500" />
                  )}
                  <span className="capitalize">{selectedConta.status}</span>
                </p>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    onClick={() => setSelectedConta(null)}
                  >
                    Fechar
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Editar
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal Nova Conta */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4">Cadastrar Conta</Dialog.Title>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Descrição"
                value={novaConta.descricao}
                onChange={(e) => setNovaConta({ ...novaConta, descricao: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Valor"
                value={novaConta.valor}
                onChange={(e) => setNovaConta({ ...novaConta, valor: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="date"
                value={format(novaConta.vencimento, "yyyy-MM-dd")}
                onChange={(e) => setNovaConta({ ...novaConta, vencimento: new Date(e.target.value) })}
                className="w-full border rounded px-3 py-2"
              />
              <select
                value={novaConta.status}
                onChange={(e) => setNovaConta({ ...novaConta, status: e.target.value as Status })}
                className="w-full border rounded px-3 py-2"
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
                <option value="atrasado">Atrasado</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
                Cancelar
              </button>
              <button
                onClick={handleAddConta}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
