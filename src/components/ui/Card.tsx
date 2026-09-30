import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(17,24,39,0.96),rgba(10,15,27,0.92))] p-5 shadow-[0_24px_60px_rgba(2,6,23,0.28)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-[-0.03em] text-known-text">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-known-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
