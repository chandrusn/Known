import type { Organization } from '../types'

export const organizations: Organization[] = [
  {
    id: 'org-cybershield',
    name: 'CyberShield Technologies',
    industry: 'Enterprise Security Software',
    members: [
      { name: 'Elena Vasquez', role: 'Program Manager' },
      { name: 'David Park', role: 'AppSec Lead' },
      { name: 'Sofia Mendes', role: 'Cloud Security' },
    ],
    programs: ['prog-web', 'prog-api', 'prog-vdp'],
  },
  {
    id: 'org-securenet',
    name: 'SecureNet Labs',
    industry: 'Managed Detection & Response',
    members: [
      { name: 'Michael Torres', role: 'CISO' },
      { name: 'Aisha Rahman', role: 'Threat Intel Lead' },
      { name: 'Chris Nguyen', role: 'Research Director' },
    ],
    programs: ['prog-mobile', 'prog-cloud'],
  },
]
