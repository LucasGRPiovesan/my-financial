type Props = { title: string; value: string | number; hint?: string }

export default function StatCard({ title, value, hint }: Props) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
      {hint && <div className="mt-2 text-xs text-slate-500">{hint}</div>}
    </div>
  )
}