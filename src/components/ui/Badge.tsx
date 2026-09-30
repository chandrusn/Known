import type { Severity } from '../../types'
import { severityClass } from '../../utils/severity'

interface BadgeProps {
  severity: Severity
  children?: React.ReactNode
}

export function SeverityBadge({ severity, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${severityClass(severity)}`}
    >
      {children ?? severity}
    </span>
  )
}

export function StatusBadge({
  status,
}: {
  status: 'Pending Review' | 'Approved' | 'Rejected' | string
}) {
  const colors =
    status === 'Approved'
      ? 'text-known-low bg-known-low/10 border-known-low/30'
      : status === 'Rejected'
        ? 'text-known-critical bg-known-critical/10 border-known-critical/30'
        : 'text-known-medium bg-known-medium/10 border-known-medium/30'
  return (
    <span className={`inline-flex rounded border px-2 py-0.5 text-xs font-medium ${colors}`}>
      {status}
    </span>
  )
}
