import type { InputHTMLAttributes } from 'react'

export function Input({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-md border border-known-border bg-known-bg px-3 py-2 text-sm text-known-text placeholder:text-known-muted focus:border-known-accent focus:outline-none focus:ring-1 focus:ring-known-accent ${className}`}
      {...props}
    />
  )
}

export function Select({
  className = '',
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-md border border-known-border bg-known-bg px-3 py-2 text-sm text-known-text focus:border-known-accent focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function Textarea({
  className = '',
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-md border border-known-border bg-known-bg px-3 py-2 text-sm text-known-text placeholder:text-known-muted focus:border-known-accent focus:outline-none focus:ring-1 focus:ring-known-accent ${className}`}
      {...props}
    />
  )
}
