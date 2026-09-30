import { Link, useParams } from 'react-router-dom'
import { getResearchById } from '../data/research'
import { getVulnerabilityByCve } from '../data/vulnerabilities'
import { getThreatById } from '../data/threats'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { SeverityBadge } from '../components/ui/Badge'

export function ResearchDetailPage() {
  const { id } = useParams()
  const article = id ? getResearchById(id) : undefined

  if (!article) {
    return (
      <div>
        <PageHeader title="Research not found" />
        <Link to="/app/research" className="text-known-accent hover:underline">
          Back to research
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={article.title}
        description={`${article.author} · ${article.date} · ${article.category}`}
        actions={<SeverityBadge severity={article.severity} />}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {article.tags.map((t) => (
          <span key={t} className="rounded border border-known-border px-2 py-0.5 text-xs text-known-muted">
            {t}
          </span>
        ))}
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader title="Summary" />
          <p className="text-sm leading-relaxed text-known-muted">{article.summary}</p>
        </Card>
        <Card>
          <CardHeader title="Technical details" />
          <p className="text-sm leading-relaxed text-known-muted">{article.technicalDetails}</p>
        </Card>
        <Card>
          <CardHeader title="Findings" />
          <p className="text-sm leading-relaxed text-known-muted">{article.findings}</p>
        </Card>
        <Card>
          <CardHeader title="Recommendations" />
          <p className="text-sm leading-relaxed text-known-muted">{article.recommendations}</p>
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Related CVEs" />
            <ul className="space-y-2 text-sm">
              {article.relatedCveIds.map((cve) => {
                const v = getVulnerabilityByCve(cve)
                return (
                  <li key={cve}>
                    <Link
                      to={`/app/intelligence/${cve}`}
                      className="text-known-accent hover:underline"
                    >
                      {cve}
                      {v ? ` — ${v.title}` : ''}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Card>
          <Card>
            <CardHeader title="Related threats" />
            <ul className="space-y-2 text-sm">
              {article.relatedThreatIds.map((tid) => {
                const t = getThreatById(tid)
                return t ? (
                  <li key={tid}>
                    <Link to={`/app/threats/${tid}`} className="text-known-accent hover:underline">
                      {t.title}
                    </Link>
                  </li>
                ) : null
              })}
            </ul>
          </Card>
        </div>
        <Card>
          <CardHeader title="References" />
          <ul className="space-y-2 text-sm">
            {article.references.map((r) => (
              <li key={r.label}>
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
