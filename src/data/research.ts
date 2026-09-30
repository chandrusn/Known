import type { ResearchArticle } from '../types'

const ref = (label: string, url: string) => ({ label, url })

export const researchArticles: ResearchArticle[] = [
  {
    id: 'res-001',
    title: 'Citrix Bleed: Session Token Harvesting at Scale',
    author: 'Dr. Ananya Krishnan',
    authorId: 'u-researcher-1',
    date: '2023-11-12',
    category: 'Vulnerability Findings',
    severity: 'Critical',
    tags: ['Citrix', 'VPN', 'Session Hijacking', 'CVE-2023-4966'],
    summary:
      'Empirical measurement of Citrix Bleed exploitation timelines and defensive detections for session anomaly monitoring.',
    technicalDetails:
      'We instrumented a lab NetScaler instance and reproduced the over-read condition using publicly documented request shapes. Memory dumps confirmed NSC_* cookie material leakage. Detection recommendations include correlating VPN logins with impossible travel and forced session invalidation after patch deployment.',
    findings:
      'Average time from patch release to first observed exploitation in our honeypot fleet: 62 hours. Session riding succeeded in 78% of lab replays when MFA was not bound to device posture.',
    recommendations:
      'Emergency patch, invalidate all active sessions, enable enhanced logging, and restrict management interfaces to break-glass networks.',
    references: [ref('KNOWN Research PDF', '#'), ref('Citrix Bulletin', '#')],
    relatedCveIds: ['CVE-2023-4966', 'CVE-2023-3519'],
    relatedThreatIds: ['threat-003'],
  },
  {
    id: 'res-002',
    title: 'Outlook NTLM Relay: University Campus Case Study',
    author: 'Priya Sharma',
    authorId: 'u-student-1',
    date: '2025-08-20',
    category: 'Security Analysis',
    severity: 'High',
    tags: ['Outlook', 'NTLM', 'Education'],
    summary:
      'Anna University Cybersecurity Cell analysis of CVE-2023-23397 impact on campus mail infrastructure.',
    technicalDetails:
      'Simulated spearphishing in an isolated lab reproduced Net-NTLMv2 capture via Responder. Combined with LDAP signing gaps on a legacy DC, relay achieved domain user escalation in a controlled environment.',
    findings:
      '14% of sampled faculty mail clients auto-previewed malicious invites in lab conditions. LDAP signing not enforced on one legacy forest.',
    recommendations:
      'Enforce LDAP signing, deploy Microsoft mitigation KB, user awareness on calendar invites, block outbound SMB from workstations.',
    references: [ref('MSRC', 'https://msrc.microsoft.com')],
    relatedCveIds: ['CVE-2023-23397'],
    relatedThreatIds: ['threat-002'],
  },
  {
    id: 'res-003',
    title: 'Log4Shell Remediation Verification Framework',
    author: 'Marcus Chen',
    authorId: 'u-researcher-2',
    date: '2022-05-18',
    category: 'Technical Write-Up',
    severity: 'Critical',
    tags: ['Log4j', 'Java', 'Scanning'],
    summary:
      'Methodology for verifying Log4j patch completeness across nested JAR dependencies in enterprise estates.',
    technicalDetails:
      'Recursive filesystem and container image scanning with checksum against vulnerable log4j-core versions. Includes SBOM correlation and runtime attach detection for loaded classes.',
    findings:
      'Nested shaded JARs accounted for 34% of missed vulnerable instances in sample enterprises.',
    recommendations:
      'Adopt continuous SBOM monitoring; remove JndiLookup class as interim hardening where upgrades blocked.',
    references: [ref('CISA Guidance', 'https://www.cisa.gov')],
    relatedCveIds: ['CVE-2021-44228'],
    relatedThreatIds: ['threat-005'],
  },
  {
    id: 'res-004',
    title: 'Spring4Shell Conditions and Tomcat Exploitability',
    author: 'Dr. Ananya Krishnan',
    authorId: 'u-researcher-1',
    date: '2022-04-08',
    category: 'Proof-of-Concept Studies',
    severity: 'Critical',
    tags: ['Spring', 'Tomcat', 'RCE'],
    summary:
      'Clarifies deployment prerequisites for CVE-2022-22965 and safe validation in research labs.',
    technicalDetails:
      'PoC limited to WAR deployments on Tomcat with specific JDK versions. Documented classLoader module access requirements and defensive WAF signatures.',
    findings:
      'Embedded Tomcat Spring Boot JAR layout not exploitable in default config; WAR deployments remain high risk.',
    recommendations:
      'Upgrade Spring Framework; audit WAR deployments; restrict actuator endpoints.',
    references: [ref('Spring Security Advisory', 'https://spring.io/security')],
    relatedCveIds: ['CVE-2022-22965'],
    relatedThreatIds: ['threat-005'],
  },
  {
    id: 'res-005',
    title: 'Cisco IOS XE Web UI Threat Landscape',
    author: 'James Okonkwo',
    authorId: 'u-student-2',
    date: '2023-11-01',
    category: 'Research Articles',
    severity: 'Critical',
    tags: ['Cisco', 'Router', 'Implant'],
    summary:
      'NSRI review of global IOS XE implant telemetry and national ISP response playbooks.',
    technicalDetails:
      'Analysis of Shodan-exposed Web UI instances and implant persistence mechanisms described in vendor advisories. Includes national-level coordination timeline across affected operators.',
    findings:
      'Management plane exposure reduced 41% after CERT advisories in modeled dataset.',
    recommendations:
      'Disable HTTP server on internet-facing interfaces; mandatory out-of-band management.',
    references: [ref('Cisco Talos', '#')],
    relatedCveIds: ['CVE-2023-20198'],
    relatedThreatIds: ['threat-006'],
  },
  {
    id: 'res-006',
    title: 'Supply Chain Integrity: xz Backdoor Lessons',
    author: 'Marcus Chen',
    authorId: 'u-researcher-2',
    date: '2024-04-12',
    category: 'Security Analysis',
    severity: 'Critical',
    tags: ['Supply Chain', 'Open Source', 'Linux'],
    summary:
      'Governance and technical controls to detect maintainer compromise in critical upstream packages.',
    technicalDetails:
      'Reverse engineering summary of malicious liblzma hooks and reproducible build verification workflow for package maintainers.',
    findings:
      'Social engineering of maintainer burnout was primary enabler; technical obfuscation secondary.',
    recommendations:
      'Multi-maintainer review, sigstore signing, anomaly detection on release tarballs.',
    references: [ref('OpenSSF', '#')],
    relatedCveIds: ['CVE-2024-3094', 'CVE-2024-27198'],
    relatedThreatIds: ['threat-005'],
  },
  {
    id: 'res-007',
    title: 'VPN Edge Device Hardening Benchmark',
    author: 'SecureNet Labs Research',
    authorId: 'u-org-1',
    date: '2024-03-01',
    category: 'Technical Write-Up',
    severity: 'High',
    tags: ['VPN', 'Fortinet', 'F5', 'Citrix'],
    summary:
      'SecureNet Labs benchmark of SSL VPN appliance configurations against KNOWN vulnerability corpus.',
    technicalDetails:
      'Scoring model covers patch latency, MFA enforcement, split tunneling, and logging fidelity across FortiGate, BIG-IP, and Citrix.',
    findings:
      'Organizations with centralized patch SLAs under 7 days reduced observed IOC matches by 67% within the monitored fleet.',
    recommendations:
      'Treat VPN appliances as tier-0 assets; integrate threat intel feeds for active exploitation CVEs.',
    references: [ref('SecureNet Labs', '#')],
    relatedCveIds: ['CVE-2023-4966', 'CVE-2024-21762'],
    relatedThreatIds: ['threat-007'],
  },
  {
    id: 'res-008',
    title: 'PAN-OS GlobalProtect: Exploit Chain Deconstruction',
    author: 'Dr. Ananya Krishnan',
    authorId: 'u-researcher-1',
    date: '2024-04-20',
    category: 'Vulnerability Findings',
    severity: 'Critical',
    tags: ['Palo Alto', 'Firewall', 'GlobalProtect'],
    summary:
      'Step-by-step analysis of CVE-2024-3400 pre-auth command injection and forensic artifacts on compromised firewalls.',
    technicalDetails:
      'Examined disk images from honeypot appliances for dropped implants, cron persistence, and modified routing tables. Provided YARA and Sigma rules for field deployment.',
    findings:
      'Median attacker dwell time before detection: 11 days in organizations without firewall log centralization.',
    recommendations:
      'Immediate hotfix, threat hunt for unauthorized admin users, validate config backups.',
    references: [ref('Palo Alto PSIRT', '#')],
    relatedCveIds: ['CVE-2024-3400', 'CVE-2024-6387'],
    relatedThreatIds: ['threat-006'],
  },
]

export function getResearchById(id: string): ResearchArticle | undefined {
  return researchArticles.find((r) => r.id === id)
}
