import type { Severity } from '../types'

export function severityClass(severity: Severity): string {
  switch (severity) {
    case 'Critical':
      return 'text-known-critical bg-known-critical/10 border-known-critical/30'
    case 'High':
      return 'text-known-high bg-known-high/10 border-known-high/30'
    case 'Medium':
      return 'text-known-medium bg-known-medium/10 border-known-medium/30'
    case 'Low':
      return 'text-known-low bg-known-low/10 border-known-low/30'
    default:
      return 'text-known-muted bg-known-surface border-known-border'
  }
}

export function severityDot(severity: Severity): string {
  switch (severity) {
    case 'Critical':
      return 'bg-known-critical'
    case 'High':
      return 'bg-known-high'
    case 'Medium':
      return 'bg-known-medium'
    case 'Low':
      return 'bg-known-low'
    default:
      return 'bg-known-muted'
  }
}
