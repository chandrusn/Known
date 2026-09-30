import { Card } from '../ui/Card'

export function StatGrid({
  stats,
}: {
  stats: { label: string; value: string | number; hint?: string }[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-known-muted">
            {s.label}
          </div>
          <div className="mt-2 text-2xl font-semibold text-known-text">{s.value}</div>
          {s.hint && <div className="mt-1 text-xs text-known-muted">{s.hint}</div>}
        </Card>
      ))}
    </div>
  )
}
