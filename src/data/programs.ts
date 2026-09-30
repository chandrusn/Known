import type { SecurityProgram } from '../types'

export const securityPrograms: SecurityProgram[] = [
  {
    id: 'prog-web',
    name: 'Web Application Security Program',
    organization: 'CyberShield Technologies',
    organizationId: 'org-cybershield',
    scope: '*.cybershield.io public web properties, customer portal, marketing sites',
    severityPolicy: 'Critical: 24h | High: 7d | Medium: 30d | Low: best effort',
    submissionStatus: 'Open — triage within 2 business days',
    rewardInfo: 'Critical up to $15,000 | High up to $7,500 | Hall of Fame',
    active: true,
    description:
      'CyberShield invites coordinated disclosure for XSS, SSRF, authentication bypass, and business logic flaws in customer-facing applications.',
    relatedCveIds: ['CVE-2021-44228', 'CVE-2022-22965', 'CVE-2022-26134'],
  },
  {
    id: 'prog-api',
    name: 'API Security Program',
    organization: 'CyberShield Technologies',
    organizationId: 'org-cybershield',
    scope: 'REST and GraphQL APIs documented at api.cybershield.io',
    severityPolicy: 'CVSS 3.1 based; auth bypass escalated one tier',
    submissionStatus: 'Open',
    rewardInfo: 'Bounties $500–$12,000 depending on impact',
    active: true,
    description:
      'Focus on broken object level authorization, excessive data exposure, and rate limiting bypass affecting multi-tenant SaaS platform.',
    relatedCveIds: ['CVE-2023-4966', 'CVE-2023-3519'],
  },
  {
    id: 'prog-mobile',
    name: 'Mobile Security Program',
    organization: 'SecureNet Labs',
    organizationId: 'org-securenet',
    scope: 'SecureNet MDR Android/iOS client applications',
    severityPolicy: 'OWASP MASVS aligned severity matrix',
    submissionStatus: 'Open — encrypted submissions preferred',
    rewardInfo: 'Swag + bounties up to $5,000',
    active: true,
    description:
      'Target insecure local storage, certificate pinning bypass, and push notification token leakage in mobile MDR agents.',
    relatedCveIds: [],
  },
  {
    id: 'prog-cloud',
    name: 'Cloud Security Program',
    organization: 'SecureNet Labs',
    organizationId: 'org-securenet',
    scope: 'AWS/Azure tenant assets tagged scope:bugbounty',
    severityPolicy: 'Critical cloud control plane issues prioritized',
    submissionStatus: 'Open',
    rewardInfo: 'Up to $20,000 for critical infra findings',
    active: true,
    description:
      'Covers misconfigurations with quantified cross-tenant impact, IAM privilege escalation, and secrets exposure in CI pipelines.',
    relatedCveIds: ['CVE-2024-3400', 'CVE-2023-20198', 'CVE-2024-21762'],
  },
  {
    id: 'prog-vdp',
    name: 'Vulnerability Disclosure Program',
    organization: 'CyberShield Technologies',
    organizationId: 'org-cybershield',
    scope: 'All CyberShield branded assets; safe harbor for good faith research',
    severityPolicy: 'Coordinated disclosure; no SLA on fixes for informational issues',
    submissionStatus: 'Always open',
    rewardInfo: 'No monetary rewards — public acknowledgment',
    active: true,
    description:
      'Entry point for researchers and students to report issues without expectation of bounty. Connects to KNOWN intelligence for related CVE context.',
    relatedCveIds: ['CVE-2021-44228', 'CVE-2023-23397', 'CVE-2023-34362'],
  },
]

export function getProgramById(id: string): SecurityProgram | undefined {
  return securityPrograms.find((p) => p.id === id)
}
