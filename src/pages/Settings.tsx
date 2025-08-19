import Button from '../components/ui/Button'

export default function Settings() {
  return (
    <div className="main-inner max-w-xl">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <form className="mt-6 space-y-5 card">
        <div>
          <label className="label">Nome do sistema</label>
          <input type="text" className="input" placeholder="Meu Painel" />
        </div>
        <div>
          <label className="label">Email de suporte</label>
          <input type="email" className="input" placeholder="suporte@email.com" />
        </div>
        <div>
          <label className="label">Timezone</label>
          <select className="input">
            <option>America/Sao_Paulo</option>
            <option>America/New_York</option>
            <option>Europe/Lisbon</option>
          </select>
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  )
}