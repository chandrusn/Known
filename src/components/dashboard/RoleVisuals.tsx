import type { ReactNode } from 'react'
import type { Institute, ResearchSubmission, SecurityProgram, Vulnerability } from '../../types'

const severityColor: Record<Vulnerability['severity'], string> = {
  Critical: '#f87171',
  High: '#fb923c',
  Medium: '#facc15',
  Low: '#34d399',
}

function short(text: string, max = 25) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

function VisualFrame({ label, children, className = '' }: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden border border-white/10 bg-[#0d1523] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-known-muted">{label}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#8fd3ff]" />
      </div>
      {children}
    </div>
  )
}

function RelationshipMap({ vulnerability, researchTitle, threatTitle, programName }: {
  vulnerability: Vulnerability
  researchTitle: string
  threatTitle: string
  programName: string
}) {
  const nodes = [
    { x: 22, y: 19, label: 'RESEARCH', value: researchTitle, accent: '#c7b8ff' },
    { x: 508, y: 19, label: 'THREAT REPORT', value: threatTitle, accent: '#8fd3ff' },
    { x: 508, y: 143, label: 'PROGRAM', value: programName, accent: '#5b8cff' },
    { x: 22, y: 143, label: 'AFFECTED PRODUCT', value: vulnerability.affectedProduct, accent: severityColor[vulnerability.severity] },
  ]

  return (
    <VisualFrame label="Vulnerability relationship map" className="h-full">
      <div className="overflow-x-auto px-2 py-3">
        <svg viewBox="0 0 708 226" className="min-w-[570px] w-full" role="img" aria-label={`Relationship map for ${vulnerability.cveId}`}>
          <defs>
            <pattern id="analyst-grid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(255,255,255,.035)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="708" height="226" fill="url(#analyst-grid)" />
          <g stroke="rgba(143,211,255,.42)" strokeWidth="1.3" fill="none">
            <path d="M 286 83 C 235 63 220 57 212 53" />
            <path d="M 422 83 C 474 63 484 56 508 53" />
            <path d="M 422 143 C 474 162 486 176 508 176" />
            <path d="M 286 143 C 235 162 222 176 212 176" />
          </g>
          {nodes.map((node) => (
            <g key={node.label}>
              <rect x={node.x} y={node.y} width="190" height="62" fill="#111b2b" stroke="rgba(255,255,255,.13)" />
              <rect x={node.x} y={node.y} width="2" height="62" fill={node.accent} />
              <text x={node.x + 13} y={node.y + 20} fill="#8a94a7" fontSize="8" letterSpacing="1.3">{node.label}</text>
              <text x={node.x + 13} y={node.y + 41} fill="#e6eaf2" fontSize="10">{short(node.value, 26)}</text>
            </g>
          ))}
          <g>
            <rect x="274" y="75" width="160" height="78" fill="#152239" stroke={severityColor[vulnerability.severity]} strokeWidth="1.4" />
            <text x="354" y="101" textAnchor="middle" fill="#8a94a7" fontSize="8" letterSpacing="1.4">VULNERABILITY INTELLIGENCE</text>
            <text x="354" y="124" textAnchor="middle" fill="#e6eaf2" fontFamily="monospace" fontSize="13">{vulnerability.cveId}</text>
            <text x="354" y="141" textAnchor="middle" fill={severityColor[vulnerability.severity]} fontSize="8">{vulnerability.severity.toUpperCase()} · CVSS {vulnerability.cvssScore.toFixed(1)}</text>
          </g>
          <circle cx="249" cy="68" r="2.5" fill="#8fd3ff" />
          <circle cx="463" cy="68" r="2.5" fill="#8fd3ff" />
          <circle cx="463" cy="161" r="2.5" fill="#8fd3ff" />
          <circle cx="249" cy="161" r="2.5" fill="#8fd3ff" />
        </svg>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-white/8 px-4 py-2 text-[9px] uppercase tracking-[0.13em] text-known-muted">
        <span>Linked research</span><span>Threat reporting</span><span>Security program</span><span>Technology</span>
      </div>
    </VisualFrame>
  )
}

function LearningPathMap({ institute, submissions }: { institute: Institute; submissions: ResearchSubmission[] }) {
  const latestSubmission = submissions[0]
  const currentAssignment = institute.assignments.find((assignment) => assignment.status !== 'Submitted') ?? institute.assignments[0]
  const steps = [
    { label: 'Study resources', title: institute.resources[0]?.title ?? 'Institute resource library', state: 'FOUNDATION' },
    { label: 'Assigned research', title: currentAssignment?.title ?? 'Research assignment', state: currentAssignment?.status.toUpperCase() ?? 'AVAILABLE' },
    { label: 'Submission review', title: latestSubmission?.title ?? 'Your first submission', state: latestSubmission?.status.toUpperCase() ?? 'NEXT STEP' },
    { label: 'Institute publication', title: institute.repository[0]?.title ?? 'Research repository', state: 'KNOWLEDGE SHARED' },
  ]

  return (
    <VisualFrame label="Research progression" className="h-full">
      <div className="relative grid gap-0 px-4 py-5 sm:grid-cols-4">
        <div className="absolute left-[12%] right-[12%] top-[35px] hidden h-px bg-gradient-to-r from-[#8fd3ff]/80 via-[#5b8cff]/70 to-[#c7b8ff]/60 sm:block" />
        {steps.map((step, index) => (
          <div key={step.label} className="relative grid grid-cols-[28px_1fr] gap-3 pb-5 last:pb-0 sm:block sm:px-2 sm:pb-0">
            <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#8fd3ff]/50 bg-[#0d1523] font-mono text-[10px] text-[#8fd3ff] sm:mx-auto sm:mb-4">
              0{index + 1}
            </div>
            <div className="border-l border-white/10 pl-3 sm:border-0 sm:pl-0 sm:text-center">
              <p className="text-[9px] uppercase tracking-[0.16em] text-known-muted">{step.state}</p>
              <p className="mt-1 text-xs font-medium leading-snug text-known-text">{short(step.title, 48)}</p>
              <p className="mt-1 text-[10px] text-[#8fd3ff]">{step.label}</p>
            </div>
          </div>
        ))}
      </div>
    </VisualFrame>
  )
}

function ExposureMap({ organizationName, vulnerabilities: items, programs }: {
  organizationName: string
  vulnerabilities: Vulnerability[]
  programs: SecurityProgram[]
}) {
  const points = [
    { x: 400, y: 44 }, { x: 590, y: 106 }, { x: 530, y: 248 },
    { x: 270, y: 248 }, { x: 210, y: 106 }, { x: 400, y: 282 },
  ]
  const nodes = items.slice(0, points.length)

  return (
    <VisualFrame label="Exposure / technology relationship" className="h-full">
      <div className="overflow-x-auto px-2 py-2">
        <svg viewBox="0 0 800 330" className="min-w-[590px] w-full" role="img" aria-label={`Exposure relationship map for ${organizationName}`}>
          <defs>
            <pattern id="exposure-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,.035)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="330" fill="url(#exposure-grid)" />
          {nodes.map((item, index) => (
            <line key={`line-${item.id}`} x1="400" y1="162" x2={points[index].x} y2={points[index].y} stroke={severityColor[item.severity]} strokeOpacity=".45" strokeWidth="1.4" />
          ))}
          <circle cx="400" cy="162" r="64" fill="#111b2b" stroke="#5b8cff" strokeOpacity=".8" />
          <circle cx="400" cy="162" r="53" fill="none" stroke="rgba(91,140,255,.18)" />
          <text x="400" y="153" textAnchor="middle" fill="#8a94a7" fontSize="8" letterSpacing="1.3">ORGANIZATION</text>
          <text x="400" y="171" textAnchor="middle" fill="#e6eaf2" fontSize="10">{short(organizationName, 22)}</text>
          <text x="400" y="187" textAnchor="middle" fill="#8fd3ff" fontSize="8">{programs.length} SECURITY PROGRAMS</text>
          {nodes.map((item, index) => {
            const point = points[index]
            return (
              <g key={item.id}>
                <rect x={point.x - 81} y={point.y - 27} width="162" height="54" fill="#111b2b" stroke={severityColor[item.severity]} strokeOpacity=".72" />
                <rect x={point.x - 81} y={point.y - 27} width="3" height="54" fill={severityColor[item.severity]} />
                <text x={point.x - 68} y={point.y - 6} fill="#8fd3ff" fontFamily="monospace" fontSize="9">{item.cveId}</text>
                <text x={point.x - 68} y={point.y + 11} fill="#e6eaf2" fontSize="9">{short(item.affectedProduct, 23)}</text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-white/8 px-4 py-2 text-[9px] uppercase tracking-[0.13em] text-known-muted">
        {(['Critical', 'High', 'Medium', 'Low'] as const).map((severity) => (
          <span key={severity} className="inline-flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: severityColor[severity] }} />{severity}</span>
        ))}
        <span className="ml-auto">Program-linked CVEs</span>
      </div>
    </VisualFrame>
  )
}

function ModerationFlow({ submissions, publications }: {
  submissions: ResearchSubmission[]
  publications: number
}) {
  const stages = [
    { title: 'Pending', detail: 'Awaiting editorial review', count: submissions.filter((item) => item.status === 'Pending Review').length, color: '#fb923c' },
    { title: 'Review', detail: 'Moderator decision', count: null, color: '#8fd3ff' },
    { title: 'Approved', detail: 'Cleared for publication', count: submissions.filter((item) => item.status === 'Approved').length, color: '#34d399' },
    { title: 'Published', detail: 'Research journal', count: publications, color: '#c7b8ff' },
  ]

  return (
    <VisualFrame label="Editorial moderation pipeline">
      <div className="overflow-x-auto px-4 py-6">
        <div className="relative grid min-w-[640px] grid-cols-4 gap-3">
          <div className="absolute left-[8%] right-[8%] top-[13px] h-px bg-white/15" />
          {stages.map((stage, index) => (
            <div key={stage.title} className="relative">
              <div className="relative z-10 mb-4 flex h-7 w-7 items-center justify-center rounded-full border bg-[#0d1523] font-mono text-[10px]" style={{ borderColor: `${stage.color}88`, color: stage.color }}>{String(index + 1).padStart(2, '0')}</div>
              <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: stage.color }}>{stage.title}</p>
              <p className="mt-1 text-[10px] text-known-muted">{stage.detail}</p>
              {stage.count !== null && <p className="mt-3 font-mono text-2xl text-known-text">{stage.count.toString().padStart(2, '0')}</p>}
              {index === 1 && <a href="/admin/moderation" className="mt-3 inline-block border-b border-[#8fd3ff]/50 pb-1 text-[10px] text-[#8fd3ff] hover:text-white">Open queue →</a>}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/8 px-4 py-2 text-[9px] uppercase tracking-[0.13em] text-known-muted">Submission state flows from review through approval to the published research record.</div>
    </VisualFrame>
  )
}

function SeveritySpectrum({ vulnerabilities }: { vulnerabilities: Vulnerability[] }) {
  const severities = ['Critical', 'High', 'Medium', 'Low'] as const
  const total = vulnerabilities.length || 1
  const counts = severities.map((severity) => vulnerabilities.filter((item) => item.severity === severity).length)

  return (
    <VisualFrame label="Severity distribution">
      <div className="px-4 py-5">
        <div className="flex h-3 overflow-hidden border border-white/10 bg-white/[0.02]" aria-label="Vulnerability severity distribution">
          {severities.map((severity, index) => (
            <div key={severity} style={{ width: `${(counts[index] / total) * 100}%`, backgroundColor: severityColor[severity], minWidth: counts[index] ? '5px' : '0' }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {severities.map((severity, index) => (
            <div key={severity} className="border-l-2 pl-2" style={{ borderColor: severityColor[severity] }}>
              <p className="font-mono text-xl leading-none text-known-text">{counts[index].toString().padStart(2, '0')}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.13em] text-known-muted">{severity}</p>
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  )
}

export { ExposureMap, LearningPathMap, ModerationFlow, RelationshipMap, SeveritySpectrum }