import Button from '../components/ui/Button'

export default function Users() {
  const fakeUsers = [
    { id: 1, name: 'Lucas', email: 'lucas@email.com' },
    { id: 2, name: 'Maria', email: 'maria@email.com' },
    { id: 3, name: 'João', email: 'joao@email.com' },
  ]

  return (
    <div className="main-inner">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Button onClick={() => alert('Novo usuário')}>Novo usuário</Button>
      </div>

      <div className="mt-4 card overflow-x-auto">
        <table className="table min-w-[640px]">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Nome</th>
              <th className="th">Email</th>
              <th className="th w-40">Ações</th>
            </tr>
          </thead>
          <tbody>
            {fakeUsers.map((u) => (
              <tr key={u.id} className="tr-hover">
                <td className="td">{u.id}</td>
                <td className="td">{u.name}</td>
                <td className="td">{u.email}</td>
                <td className="td">
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => alert(`Editar ${u.name}`)}>Editar</Button>
                    <Button variant="ghost" onClick={() => alert(`Remover ${u.name}`)}>Remover</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}