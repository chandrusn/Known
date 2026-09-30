import { Link, useParams } from 'react-router-dom'
import { getThreatById } from '../data/threats'
import { getVulnerabilityById } from '../data/vulnerabilities'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { SeverityBadge } from '../components/ui/Badge'

export function ThreatDetailPage() {
  const { id } = useParams()
  const threat = id ? getThreatById(id) : undefined

  if (!threat) {
    return (
      <div>
        <PageHeader title="Threat report not found" />
        <Link to="/app/threats" className="text-known-accent hover:underline">
          Back to threats
        </Link>
      </div>
    )
  }

  const mitreSections = [
    ['Initial Access', threat.mitreMapping.initialAccess],
    ['Execution', threat.mitreMapping.execution],
    ['Persistence', threat.mitreMapping.persistence],
    ['Credential Access', threat.mitreMapping.credentialAccess],
    ['Defense Evasion', threat.mitreMapping.defenseEvasion],
    ['Impact', threat.mitreMapping.impact],
  ] as const

  return (
    <div>
      <PageHeader
        title={threat.title}
        description={`Threat actor: ${threat.threatActor}`}
        actions={<SeverityBadge severity={threat.severity} />}
      />
      <Card className="mb-6">
        <CardHeader title="Overview" />
        <p className="text-sm leading-relaxed text-known-muted">{threat.summary}</p>
        <p className="mt-4 text-xs text-known-muted">
          Published {threat.publicationDate} · Sectors: {threat.affectedSectors.join(', ')}
        </p>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Technical analysis" />
          <p className="text-sm leading-relaxed text-known-muted">{threat.technicalAnalysis}</p>
        </Card>
        <Card>
          <CardHeader title="MITRE ATT&CK mapping" />
          <div className="space-y-3">
            {mitreSections.map(([name, items]) => (
              <div key={name}>
                <p className="text-xs font-semibold uppercase text-known-muted">{name}</p>
                <ul className="mt-1 list-inside list-disc text-sm text-known-text">
                  {items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader title="Indicators of compromise" />
        <ul className="space-y-2 font-mono text-xs text-known-muted">
          {threat.indicators.map((ioc) => (
            <li key={ioc} className="rounded border border-known-border bg-known-bg px-3 py-2">
              {ioc}
            </li>
          ))}
        </ul>
      </Card>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Related vulnerabilities" />
          <ul className="space-y-2 text-sm">
            {threat.relatedVulnerabilityIds.map((vid) => {
              const v = getVulnerabilityById(vid)
              return v ? (
                <li key={vid}>
                  <Link
                    to={`/app/intelligence/${v.cveId}`}
                    className="text-known-accent hover:underline"
                  >
                    {v.cveId} — {v.title}
                  </Link>
                </li>
              ) : null
            })}
          </ul>
        </Card>
        <Card>
          <CardHeader title="References" />
          <ul className="space-y-2 text-sm">
            {threat.references.map((r) => (
              <li key={r.url}>
                <a href={r.url} className="text-known-accent hover:underline" target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
