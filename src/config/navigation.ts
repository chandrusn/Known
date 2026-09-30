import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BookOpen,
  Building2,
  FileWarning,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Shield,
  ShieldAlert,
  Users,
  FolderKanban,
  ClipboardList,
  Scale,
  Database,
} from 'lucide-react'
import type { UserRole } from '../types'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
}

export function getNavForRole(role: UserRole): NavItem[] {
  switch (role) {
    case 'researcher':
      return [
        { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Intelligence', path: '/app/intelligence', icon: ShieldAlert },
        { label: 'Threats', path: '/app/threats', icon: FileWarning },
        { label: 'Research', path: '/app/research', icon: BookOpen },
        { label: 'Programs', path: '/app/programs', icon: Shield },
        { label: 'Collaboration', path: '/app/collaboration', icon: MessageSquare },
        { label: 'My Workspace', path: '/app/workspace', icon: FolderKanban },
      ]
    case 'student':
      return [
        { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Intelligence', path: '/app/intelligence', icon: ShieldAlert },
        { label: 'Research', path: '/app/research', icon: BookOpen },
        { label: 'Institute Hub', path: '/app/institute', icon: GraduationCap },
        { label: 'My Submissions', path: '/app/submissions', icon: ClipboardList },
        { label: 'Workspace', path: '/app/workspace', icon: FolderKanban },
      ]
    case 'organization':
      return [
        { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Intelligence', path: '/app/intelligence', icon: ShieldAlert },
        { label: 'Threats', path: '/app/threats', icon: FileWarning },
        { label: 'Programs', path: '/app/programs', icon: Shield },
        { label: 'Research', path: '/app/research', icon: BookOpen },
        { label: 'Organization Hub', path: '/app/organization', icon: Building2 },
      ]
    case 'user':
      return [
        { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Intelligence', path: '/app/intelligence', icon: ShieldAlert },
        { label: 'Threats', path: '/app/threats', icon: FileWarning },
        { label: 'Research', path: '/app/research', icon: BookOpen },
        { label: 'Programs', path: '/app/programs', icon: Shield },
      ]
    case 'admin':
      return []
    default:
      return []
  }
}

export const adminNav: NavItem[] = [
  { label: 'Overview', path: '/admin/overview', icon: LayoutDashboard },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Organizations', path: '/admin/organizations', icon: Building2 },
  { label: 'Institutes', path: '/admin/institutes', icon: GraduationCap },
  { label: 'Research', path: '/admin/research', icon: BookOpen },
  { label: 'Threat Reports', path: '/admin/threats', icon: FileWarning },
  { label: 'Vulnerabilities', path: '/admin/vulnerabilities', icon: Database },
  { label: 'Moderation', path: '/admin/moderation', icon: Scale },
  { label: 'Analytics', path: '/admin/analytics', icon: Activity },
]
