import { Link, useParams } from 'react-router-dom'
import { getProgramById } from '../data/programs'
import { getVulnerabilityByCve } from '../data/vulnerabilities'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'

export function ProgramDetailPage() {
  const { id } = useParams()
  const program = id ? getProgramById(id) : undefined

  if (!program) {
    return (
      <div>
        <PageHeader title="Program not found" />
        <Link to="/app/programs" className="text-known-accent hover:underline">
          Back to programs
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title={program.name} description={program.organization} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Description" />
          <p className="text-sm text-known-muted">{program.description}</p>
        </Card>
        <Card>
          <CardHeader title="Program details" />
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-known-muted">Scope</dt>
              <dd className="text-known-text">{program.scope}</dd>
            </div>
            <div>
              <dt className="text-known-muted">Severity policy</dt>
              <dd className="text-known-text">{program.severityPolicy}</dd>
            </div>
            <div>
              <dt className="text-known-muted">Submissions</dt>
              <dd className="text-known-text">{program.submissionStatus}</dd>
            </div>
            <div>
              <dt className="text-known-muted">Rewards</dt>
              <dd className="text-known-text">{program.rewardInfo}</dd>
            </div>
          </dl>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader title="Related intelligence (CVE context)" />
        <ul className="space-y-2 text-sm">
          {program.relatedCveIds.map((cve) => {
            const v = getVulnerabilityByCve(cve)
            return (
              <li key={cve}>
                <Link to={`/app/intelligence/${cve}`} className="text-known-accent hover:underline">
                  {cve}
                  {v ? ` — ${v.title}` : ''}
                </Link>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
