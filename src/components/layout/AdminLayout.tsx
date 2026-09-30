import { Navigate, Outlet } from 'react-router-dom'
import { adminNav } from '../../config/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { Sidebar } from './Sidebar'

export function AdminLayout() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/app/dashboard" replace />

  return (
    <div className="flex min-h-screen flex-col md:h-full md:flex-row">
      <Sidebar items={adminNav} />
      <main className="min-w-0 flex-1 overflow-y-auto bg-known-bg p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
