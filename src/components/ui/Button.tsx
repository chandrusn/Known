import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variants: Record<Variant, string> = {
  primary:
    'border border-[#5b8cff]/40 bg-[#5b8cff]/10 text-[#ecf3ff] hover:border-[#5b8cff]/60 hover:bg-[#5b8cff]/15',
  secondary:
    'border border-white/10 bg-white/[0.02] text-known-text hover:border-[#5b8cff]/40 hover:bg-white/[0.04]',
  ghost: 'border border-transparent bg-transparent text-known-muted hover:text-known-text hover:bg-white/[0.03]',
  danger: 'border border-red-500/30 bg-red-500/10 text-red-100 hover:bg-red-500/18',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
