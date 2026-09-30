import type { Institute } from '../types'

export const institutes: Institute[] = [
  {
    id: 'inst-anna',
    name: 'Anna University Cybersecurity Cell',
    location: 'Chennai, India',
    focus: 'Applied vulnerability research and national CERT collaboration',
    resources: [
      {
        title: 'Secure Coding Guidelines (2025)',
        type: 'PDF',
        url: '#',
      },
      {
        title: 'Lab Environment — Isolated Test Network',
        type: 'Lab',
        url: '#',
      },
      {
        title: 'CVE Analysis Workshop Materials',
        type: 'Course',
        url: '#',
      },
    ],
    repository: [
      {
        title: 'Outlook NTLM Relay — Student Analysis',
        description: 'Internal review of CVE-2023-23397 exploitation paths',
        date: '2025-08-12',
      },
      {
        title: 'Log4Shell Remediation Checklist',
        description: 'Department-wide patch verification methodology',
        date: '2025-06-03',
      },
    ],
    assignments: [
      {
        title: 'Threat Report: Healthcare Ransomware TTPs',
        due: '2025-10-15',
        status: 'In Progress',
      },
      {
        title: 'CVE Deep Dive — Citrix Bleed',
        due: '2025-09-28',
        status: 'Submitted',
      },
    ],
  },
  {
    id: 'inst-nsri',
    name: 'National Security Research Institute',
    location: 'New Delhi, India',
    focus: 'National-level threat intelligence and defensive research',
    resources: [
      {
        title: 'Classified Handling Procedures',
        type: 'Policy',
        url: '#',
      },
      {
        title: 'ATT&CK Mapping Toolkit',
        type: 'Tool',
        url: '#',
      },
    ],
    repository: [
      {
        title: 'Supply Chain IOC Correlation Study',
        description: 'Cross-sector indicator clustering methodology',
        date: '2025-07-20',
      },
    ],
    assignments: [
      {
        title: 'PAN-OS Firewall Exploit Chain Review',
        due: '2025-10-01',
        status: 'In Progress',
      },
    ],
  },
]
