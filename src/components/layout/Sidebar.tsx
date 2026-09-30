import { NavLink } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import type { NavItem } from '../../config/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'

export function Sidebar({ items }: { items: NavItem[] }) {
  const { user, logout } = useAuth()
  const sections = [
    { title: 'Overview', items: items.filter((item) => item.path.endsWith('/dashboard') || item.path.endsWith('/overview')) },
    { title: 'Intelligence', items: items.filter((item) => /intelligence|threat|research|program|vulnerabilit/i.test(item.label)) },
    { title: 'Workspace', items: items.filter((item) => /workspace|collaboration|submission|institute hub|organization hub/i.test(item.label)) },
    { title: 'Administration', items: items.filter((item) => /users|organizations|institutes|moderation|analytics/i.test(item.label)) },
  ].filter((section) => section.items.length > 0)

  const roleLabel: Record<string, string> = {
    researcher: 'Analyst workspace',
    student: 'Research institute',
    organization: 'Security operations',
    user: 'Intelligence reader',
    admin: 'Platform administration',
  }

  return (
    <aside className="relative z-20 flex w-full shrink-0 flex-col border-b border-white/10 bg-[#080d17] md:sticky md:top-0 md:h-screen md:w-[252px] md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 md:block md:px-5 md:pb-5 md:pt-6">
        <NavLink to={user?.role === 'admin' ? '/admin/overview' : '/app/dashboard'} className="group block">
          <span className="block font-semibold text-[22px] leading-none tracking-[0.24em] text-known-text transition-colors group-hover:text-white">KNOWN</span>
          <span className="mt-2 block text-[9px] uppercase tracking-[0.16em] text-known-muted">Cyber Threat Intelligence</span>
        </NavLink>
        <div className="hidden border-l-2 border-[#5b8cff]/70 pl-3 md:mt-5 md:block">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8fd3ff]">{roleLabel[user?.role ?? ''] ?? 'Secure workspace'}</p>
          <p className="mt-1 truncate text-xs text-known-muted">{user?.name}</p>
        </div>
        <span className="shrink-0 text-right text-[9px] uppercase tracking-[0.13em] text-[#8fd3ff] md:hidden">{roleLabel[user?.role ?? ''] ?? 'Secure workspace'}</span>
        <Button variant="ghost" className="shrink-0 rounded-sm px-2 md:hidden" aria-label="Sign out" title="Sign out" onClick={logout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex items-center gap-2 overflow-x-auto px-3 py-2 md:block md:flex-1 md:space-y-6 md:overflow-x-hidden md:overflow-y-auto md:py-5">
        {sections.map((section) => (
          <div key={section.title} className="shrink-0 md:shrink">
            <p className="mb-2 hidden px-3 text-[9px] font-medium uppercase tracking-[0.18em] text-known-muted/70 md:block">{section.title}</p>
            <div className="flex gap-1 md:block md:space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative inline-flex items-center gap-2 whitespace-nowrap rounded-sm px-3 py-2 text-[12px] transition-colors duration-150 md:flex md:gap-3 md:text-[13px] ${
                      isActive
                        ? 'bg-[#5b8cff]/10 font-medium text-[#e6eaf2] before:absolute before:bottom-1 before:left-0 before:top-1 before:w-[2px] before:bg-[#5b8cff]'
                        : 'text-known-muted hover:bg-white/[0.035] hover:text-known-text'
                    }`
                  }
                >
                  <item.icon className="h-[15px] w-[15px] shrink-0 opacity-75 transition-opacity group-hover:opacity-100" strokeWidth={1.7} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="hidden border-t border-white/8 p-3 md:block">
        <div className="mb-2 truncate px-2 text-[10px] tracking-wide text-known-muted">{user?.email}</div>
        <Button variant="ghost" className="w-full justify-start rounded-sm text-xs" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}
