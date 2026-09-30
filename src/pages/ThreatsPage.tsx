import { Link } from 'react-router-dom'
import { threatReports } from '../data/threats'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { SeverityBadge } from '../components/ui/Badge'

export function ThreatsPage() {
  const featured = threatReports[0]
  const latest = threatReports.slice(1, 5)

  return (
    <div>
      <PageHeader
        title="Threat Intelligence"
        description="Threat briefings, actor tracking, and indicators mapped to operational response workflows."
      />

      <div className="mb-6 grid gap-6 xl:grid-cols-[1.35fr_0.75fr]">
        <Card className="overflow-hidden">
          <p className="text-[10px] uppercase tracking-[0.24em] text-known-muted">Featured briefing</p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <Link to={`/app/threats/${featured.id}`} className="text-2xl font-semibold tracking-[-0.04em] text-known-text hover:text-known-accent">
                {featured.title}
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-known-muted">{featured.summary}</p>
            </div>
            <SeverityBadge severity={featured.severity} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-known-muted">
            <span>Actor: {featured.threatActor}</span>
            <span>•</span>
            <span>{featured.publicationDate}</span>
            <span>•</span>
            <span>{featured.affectedSectors.join(', ')}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {featured.techniques.map((tech) => (
              <span key={tech} className="rounded border border-known-border bg-known-bg/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-known-muted">
                {tech}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-[10px] uppercase tracking-[0.24em] text-known-muted">Threat actor spotlight</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-known-text">{featured.threatActor}</h3>
          <p className="mt-3 text-sm text-known-muted">Operating across {featured.affectedSectors.join(', ')} with a sustained campaign focused on credential access and data theft.</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {latest.map((t) => (
          <Card key={t.id} className="hover:border-[#5b8cff]/30 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link to={`/app/threats/${t.id}`} className="text-lg font-semibold text-known-text hover:text-known-accent">
                  {t.title}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-known-muted">{t.summary}</p>
              </div>
              <SeverityBadge severity={t.severity} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-known-muted">
              <span>{t.publicationDate}</span>
              <span>•</span>
              <span>{t.threatActor}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
