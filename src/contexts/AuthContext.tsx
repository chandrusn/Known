import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { demoAccounts } from '../data/users'
import { loadJson, saveJson } from '../utils/storage'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  switchDemoUser: (email: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AUTH_KEY = 'auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    loadJson<User | null>(AUTH_KEY, null),
  )

  const login = useCallback((email: string, password: string) => {
    const account = demoAccounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
    )
    if (!account) return false
    setUser(account.user)
    saveJson(AUTH_KEY, account.user)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('known_' + AUTH_KEY)
  }, [])

  const switchDemoUser = useCallback((email: string) => {
    const account = demoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase())
    if (!account) return
    setUser(account.user)
    saveJson(AUTH_KEY, account.user)
  }, [])

  const value = useMemo(
    () => ({ user, login, logout, switchDemoUser }),
    [user, login, logout, switchDemoUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
