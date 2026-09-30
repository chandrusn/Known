import type { ThreatReport } from '../types'

const ref = (label: string, url: string) => ({ label, url })

export const threatReports: ThreatReport[] = [
  {
    id: 'threat-001',
    title: 'Ransomware Campaign Targeting Healthcare Sector',
    threatActor: 'CL0P / TA505 affiliate cluster',
    severity: 'Critical',
    publicationDate: '2023-06-18',
    affectedSectors: ['Healthcare', 'Insurance', 'Pharmaceutical'],
    tactics: ['Initial Access', 'Exfiltration', 'Impact'],
    techniques: ['T1190', 'T1059', 'T1486'],
    indicators: [
      'lemurloot.aspx webshell on MOVEit instances',
      'C2: 185.234.x.x (TOR exit observed)',
      'Filename pattern: human2.aspx, health_check.aspx',
    ],
    summary:
      'Mass exploitation of MOVEit Transfer preceded multi-terabyte data theft and double-extortion ransomware across North American healthcare providers.',
    technicalAnalysis:
      'Attackers leveraged CVE-2023-34362 for initial access, deployed LEMURLOOT for persistence, and exfiltrated PII/PHI via HTTPS to bulletproof hosting. Dwell time averaged 4–9 days before encryption events. Lateral movement into Epic integration servers observed in two incidents.',
    references: [ref('CISA AA23-158a', 'https://www.cisa.gov/news-events/cybersecurity-advisories')],
    mitreMapping: {
      initialAccess: ['T1190 — Exploit Public-Facing Application'],
      execution: ['T1059.003 — Windows Command Shell'],
      persistence: ['T1505.003 — Web Shell'],
      credentialAccess: ['T1003 — OS Credential Dumping'],
      defenseEvasion: ['T1070.004 — File Deletion'],
      impact: ['T1486 — Data Encrypted for Impact', 'T1567 — Exfiltration Over Web Service'],
    },
    relatedVulnerabilityIds: ['vuln-008'],
  },
  {
    id: 'threat-002',
    title: 'Credential Theft Operations Against Universities',
    threatActor: 'APT28-style cluster',
    severity: 'High',
    publicationDate: '2023-04-02',
    affectedSectors: ['Higher Education', 'Research Institutions'],
    tactics: ['Initial Access', 'Credential Access', 'Collection'],
    techniques: ['T1566', 'T1187', 'T1114'],
    indicators: [
      'Malicious Outlook calendar invites with UNC sound paths',
      'Auth to 45.83.x.x over SMB from campus networks',
      'Impersonation domains: *.edu-security-portal.com',
    ],
    summary:
      'Targeted spearphishing using CVE-2023-23397 forced NTLM authentication from faculty workstations, enabling hash capture and mailbox access.',
    technicalAnalysis:
      'Campaign synchronized with grant submission periods. Attackers relayed captured hashes against misconfigured LDAP services on legacy domain controllers. Successful compromises led to research data staging in OneDrive sync folders.',
    references: [ref('NCSC Alert', 'https://www.ncsc.gov.uk/')],
    mitreMapping: {
      initialAccess: ['T1566.001 — Spearphishing Attachment'],
      execution: ['T1204.002 — Malicious File'],
      persistence: ['T1078 — Valid Accounts'],
      credentialAccess: ['T1187 — Forced Authentication', 'T1110 — Brute Force'],
      defenseEvasion: ['T1036 — Masquerading'],
      impact: ['T1537 — Transfer Data to Cloud Account'],
    },
    relatedVulnerabilityIds: ['vuln-004', 'vuln-012'],
  },
  {
    id: 'threat-003',
    title: 'Citrix NetScaler Exploitation Activity',
    threatActor: 'UNC5815',
    severity: 'Critical',
    publicationDate: '2023-11-05',
    affectedSectors: ['Financial Services', 'Legal', 'Technology'],
    tactics: ['Initial Access', 'Collection', 'Command and Control'],
    techniques: ['T1190', 'T1071', 'T1041'],
    indicators: [
      'POST /oauth/rp/.well-known/openid-configuration anomalies',
      'Session cookie patterns: NSC_AAAC=… (truncated harvest)',
      'JA3: a0e9f5d64349fb131… on Citrix login flows',
    ],
    summary:
      'Widespread scanning and session token harvesting against CVE-2023-4966 (Citrix Bleed) preceded VPN session riding into internal networks.',
    technicalAnalysis:
      'Threat actors rotated through residential proxies to blend with legitimate VPN traffic post session hijack. Internal reconnaissance focused on file shares and credential stores within 30 minutes of hijack.',
    references: [ref('Mandiant Citrix Bleed', 'https://www.mandiant.com/resources/blog')],
    mitreMapping: {
      initialAccess: ['T1190 — Exploit Public-Facing Application'],
      execution: ['T1059 — Command and Scripting Interpreter'],
      persistence: ['T1556 — Modify Authentication Process'],
      credentialAccess: ['T1550 — Use Alternate Authentication Material'],
      defenseEvasion: ['T1070 — Indicator Removal'],
      impact: ['T1041 — Exfiltration Over C2 Channel'],
    },
    relatedVulnerabilityIds: ['vuln-002', 'vuln-018'],
  },
  {
    id: 'threat-004',
    title: 'Cloud Service Phishing Operations',
    threatActor: 'FIN7-inspired cluster',
    severity: 'High',
    publicationDate: '2024-01-22',
    affectedSectors: ['Retail', 'Hospitality', 'SaaS'],
    tactics: ['Initial Access', 'Credential Access', 'Defense Evasion'],
    techniques: ['T1566', 'T1539', 'T1027'],
    indicators: [
      'OAuth consent phishing apps: "SecureMail Viewer"',
      'Domains: login-microsoftonline.support',
      'HTML smuggling payloads targeting session cookies',
    ],
    summary:
      'Hybrid campaign combining OAuth consent phishing with Exchange exploitation for persistent mailbox access.',
    technicalAnalysis:
      'After token theft, actors registered MFA devices where conditional access policies were misconfigured. Parallel exploitation of ProxyLogon-era unpatched Exchange instances observed in hospitality sector.',
    references: [ref('Microsoft Threat Intelligence', 'https://www.microsoft.com/en-us/security/blog/')],
    mitreMapping: {
      initialAccess: ['T1566.002 — Spearphishing Link', 'T1190'],
      execution: ['T1204.001 — Malicious Link'],
      persistence: ['T1098 — Account Manipulation'],
      credentialAccess: ['T1528 — Steal Application Access Token'],
      defenseEvasion: ['T1027 — Obfuscated Files'],
      impact: ['T1657 — Financial Theft'],
    },
    relatedVulnerabilityIds: ['vuln-014', 'vuln-019', 'vuln-022'],
  },
  {
    id: 'threat-005',
    title: 'Supply Chain Compromise Analysis',
    threatActor: 'Unknown sophisticated actor (XZ incident)',
    severity: 'Critical',
    publicationDate: '2024-04-05',
    affectedSectors: ['Technology', 'Government', 'Telecommunications'],
    tactics: ['Initial Access', 'Persistence', 'Defense Evasion'],
    techniques: ['T1195', 'T1554', 'T1140'],
    indicators: [
      'Modified liblzma build artifacts in upstream tarballs',
      'SSH pre-auth timing anomalies on affected hosts',
      'Git commit metadata inconsistencies in maintainer accounts',
    ],
    summary:
      'Long-horizon supply chain compromise in xz-utils highlights risk to open-source maintainer trust models and CI/CD pipelines.',
    technicalAnalysis:
      'Malicious test files and obfuscated IFUNC hooks targeted glibc-linked OpenSSH on specific distributions. Detection requires binary integrity monitoring and reproducible build verification.',
    references: [ref('Boeing CERT Analysis', 'https://www.cisa.gov/news-events/analysis-reports')],
    mitreMapping: {
      initialAccess: ['T1195.002 — Compromise Software Supply Chain'],
      execution: ['T1059 — Command and Scripting Interpreter'],
      persistence: ['T1554 — Compromise Client Software Binary'],
      credentialAccess: ['T1556 — Modify Authentication Process'],
      defenseEvasion: ['T1140 — Deobfuscate/Decode Files or Information'],
      impact: ['T1485 — Data Destruction'],
    },
    relatedVulnerabilityIds: ['vuln-011', 'vuln-001', 'vuln-006', 'vuln-020'],
  },
  {
    id: 'threat-006',
    title: 'Edge Device Implant Campaign (Cisco / PAN-OS)',
    threatActor: 'Nation-state cluster',
    severity: 'Critical',
    publicationDate: '2023-10-28',
    affectedSectors: ['Telecommunications', 'Energy', 'Defense Industrial Base'],
    tactics: ['Initial Access', 'Persistence', 'Command and Control'],
    techniques: ['T1190', 'T1505', 'T1071'],
    indicators: [
      'New local user cisco_support on IOS XE',
      'Implant file badger.ldr on PAN-OS edge appliance',
      'Outbound HTTPS to DGA domains *.edge-update.net',
    ],
    summary:
      'Coordinated exploitation of perimeter network appliances for long-term persistence and traffic manipulation.',
    technicalAnalysis:
      'Actors prioritized devices with outdated Web UI exposure. Post-exploitation included TLS downgrade configurations and selective packet injection for credential harvesting.',
    references: [ref('Cisco Talos', 'https://blog.talosintelligence.com/')],
    mitreMapping: {
      initialAccess: ['T1190 — Exploit Public-Facing Application'],
      execution: ['T1059 — Command and Scripting Interpreter'],
      persistence: ['T1505 — Server Software Component'],
      credentialAccess: ['T1040 — Network Sniffing'],
      defenseEvasion: ['T1562 — Impair Defenses'],
      impact: ['T1498 — Network Denial of Service'],
    },
    relatedVulnerabilityIds: ['vuln-003', 'vuln-005'],
  },
  {
    id: 'threat-007',
    title: 'VPN Exploitation Campaign',
    threatActor: 'UNC4466',
    severity: 'Critical',
    publicationDate: '2024-02-15',
    affectedSectors: ['Manufacturing', 'State & Local Government'],
    tactics: ['Initial Access', 'Lateral Movement', 'Impact'],
    techniques: ['T1190', 'T1021', 'T1486'],
    indicators: [
      'FortiOS SSL VPN crash logs followed by admin login',
      'F5 BIG-IP iControl REST POST /mgmt/tm/util/bash',
      'Ransomware note: README.VPNLOCK.txt',
    ],
    summary:
      'Cluster targeting SSL VPN and load balancer appliances with overlapping TTPs across Fortinet and F5 product lines.',
    technicalAnalysis:
      'Initial foothold via VPN appliance RCE, credential dump from connected authentication backends, then ransomware deployment on unsegmented file servers within 72 hours.',
    references: [ref('CISA CSA', 'https://www.cisa.gov/')],
    mitreMapping: {
      initialAccess: ['T1190'],
      execution: ['T1059.004 — Unix Shell'],
      persistence: ['T1133 — External Remote Services'],
      credentialAccess: ['T1003'],
      defenseEvasion: ['T1070'],
      impact: ['T1486', 'T1490 — Inhibit System Recovery'],
    },
    relatedVulnerabilityIds: ['vuln-007', 'vuln-015', 'vuln-017', 'vuln-021'],
  },
  {
    id: 'threat-008',
    title: 'Research Data Harvesting Campaign',
    threatActor: 'Cybercrime opportunistic cluster',
    severity: 'Medium',
    publicationDate: '2025-07-10',
    affectedSectors: ['Higher Education', 'R&D'],
    tactics: ['Collection', 'Exfiltration'],
    techniques: ['T1213', 'T1567'],
    indicators: [
      'Bulk download from institute GitLab instances',
      'Anomalous OAuth tokens for research storage APIs',
    ],
    summary:
      'Opportunistic scraping and credential stuffing against exposed research portals and institute collaboration spaces.',
    technicalAnalysis:
      'Correlates with increased KNOWN platform submissions during assignment windows. Recommend MFA enforcement on institute hubs and DLP on repository exports.',
    references: [ref('KNOWN Internal Intel', '#')],
    mitreMapping: {
      initialAccess: ['T1078 — Valid Accounts'],
      execution: ['T1059 — Scripting'],
      persistence: ['T1098'],
      credentialAccess: ['T1110.003 — Password Spraying'],
      defenseEvasion: ['T1036'],
      impact: ['T1530 — Data from Cloud Storage'],
    },
    relatedVulnerabilityIds: [],
  },
]

export function getThreatById(id: string): ThreatReport | undefined {
  return threatReports.find((t) => t.id === id)
}
