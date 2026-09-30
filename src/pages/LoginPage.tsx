import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { demoAccounts, DEFAULT_PASSWORD } from '../data/users'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('researcher@known.io')
  const [password, setPassword] = useState(DEFAULT_PASSWORD)
  const [error, setError] = useState('')

  if (user) {
    return (
      <Navigate to={user.role === 'admin' ? '/admin/overview' : '/app/dashboard'} replace />
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ok = login(email, password)
    if (!ok) {
      setError('Invalid credentials. Please use one of the listed access accounts.')
      return
    }
    const account = demoAccounts.find((a) => a.email === email)
    navigate(account?.user.role === 'admin' ? '/admin/overview' : '/app/dashboard')
  }

  const quickLogin = (demoEmail: string) => {
    const account = demoAccounts.find((a) => a.email === demoEmail)
    if (!account) return
    setEmail(demoEmail)
    setPassword(account.password)
    login(demoEmail, account.password)
    navigate(account.user.role === 'admin' ? '/admin/overview' : '/app/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-known-bg px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-known-text">
            <Shield className="h-8 w-8 text-known-accent" />
            <span className="text-xl font-semibold">KNOWN</span>
          </Link>
          <p className="mt-2 text-sm text-known-muted">Secure access — no registration required</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-known-muted">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-known-muted">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-known-critical">{error}</p>}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          <div className="mt-6 border-t border-known-border pt-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-known-muted">
              Quick role switch
            </p>
            <div className="flex flex-col gap-2">
              {demoAccounts.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => quickLogin(a.email)}
                  className="rounded-md border border-known-border px-3 py-2 text-left text-sm text-known-muted transition-colors hover:border-known-accent/50 hover:text-known-text"
                >
                  <span className="font-medium text-known-text capitalize">{a.user.role}</span>
                  <span className="ml-2 text-xs">{a.email}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>
        <p className="mt-4 text-center text-sm">
          <Link to="/" className="text-known-accent hover:underline">
            Back to landing
          </Link>
        </p>
      </div>
    </div>
  )
}
