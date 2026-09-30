import type { DemoAccount, User } from '../types'

export const DEFAULT_PASSWORD = 'demo123'
export const ADMIN_PASSWORD = 'admin123'

export const seedUsers: User[] = [
  {
    id: 'u-researcher-1',
    email: 'researcher@known.io',
    name: 'Dr. Ananya Krishnan',
    role: 'researcher',
    title: 'Independent Security Researcher',
  },
  {
    id: 'u-researcher-2',
    email: 'marcus.chen@known.io',
    name: 'Marcus Chen',
    role: 'researcher',
    title: 'Vulnerability Research Lead',
  },
  {
    id: 'u-student-1',
    email: 'student@known.io',
    name: 'Priya Sharma',
    role: 'student',
    instituteId: 'inst-anna',
    title: 'M.Tech Cybersecurity — Anna University',
  },
  {
    id: 'u-student-2',
    email: 'james.okonkwo@known.io',
    name: 'James Okonkwo',
    role: 'student',
    instituteId: 'inst-nsri',
    title: 'PhD Candidate — NSRI',
  },
  {
    id: 'u-org-1',
    email: 'company@known.io',
    name: 'Elena Vasquez',
    role: 'organization',
    organizationId: 'org-cybershield',
    title: 'Security Program Manager',
  },
  {
    id: 'u-user-1',
    email: 'user@known.io',
    name: 'Jordan Lee',
    role: 'user',
    title: 'Security Analyst (Read-only)',
  },
  {
    id: 'u-admin-1',
    email: 'admin@known.io',
    name: 'Platform Administrator',
    role: 'admin',
    title: 'KNOWN Platform Admin',
  },
]

export const demoAccounts: DemoAccount[] = [
  {
    email: 'researcher@known.io',
    password: DEFAULT_PASSWORD,
    user: seedUsers[0],
  },
  {
    email: 'student@known.io',
    password: DEFAULT_PASSWORD,
    user: seedUsers[2],
  },
  {
    email: 'company@known.io',
    password: DEFAULT_PASSWORD,
    user: seedUsers[4],
  },
  {
    email: 'user@known.io',
    password: DEFAULT_PASSWORD,
    user: seedUsers[5],
  },
  {
    email: 'admin@known.io',
    password: ADMIN_PASSWORD,
    user: seedUsers[6],
  },
]
