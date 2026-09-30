import { Link } from 'react-router-dom'
import { researchArticles } from '../data/research'
import { useAuth } from '../contexts/AuthContext'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { SeverityBadge } from '../components/ui/Badge'

export function ResearchPage() {
  const { user } = useAuth()
  const canSubmit = user?.role === 'researcher' || user?.role === 'student'
  const featured = researchArticles[0]

  return (
    <div>
      <PageHeader
        title="Research Repository"
        description="Technical analysis, incident studies, and coordinated security research across platform participants."
        actions={
          canSubmit ? (
            <Link to="/app/submissions/new">
              <Button>Submit research</Button>
            </Link>
          ) : undefined
        }
      />

      <div className="mb-6 grid gap-6 xl:grid-cols-[1.35fr_0.75fr]">
        <Card className="overflow-hidden">
          <p className="text-[10px] uppercase tracking-[0.24em] text-known-muted">Featured analysis</p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <Link to={`/app/research/${featured.id}`} className="text-2xl font-semibold tracking-[-0.04em] text-known-text hover:text-known-accent">
                {featured.title}
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-known-muted">{featured.summary}</p>
            </div>
            <SeverityBadge severity={featured.severity} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-known-muted">
            <span>{featured.author}</span>
            <span>•</span>
            <span>{featured.date}</span>
            <span>•</span>
            <span>{featured.category}</span>
          </div>
        </Card>

        <Card>
          <p className="text-[10px] uppercase tracking-[0.24em] text-known-muted">Trending categories</p>
          <div className="mt-4 space-y-3 text-sm">
            {['Vulnerability Findings', 'Threat Analysis', 'Cloud Security', 'Supply Chain'].map((category) => (
              <div key={category} className="flex items-center justify-between rounded-lg border border-known-border bg-known-bg/40 px-3 py-2">
                <span className="text-known-text">{category}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-known-muted">Live</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {researchArticles.slice(1).map((r) => (
          <Card key={r.id}>
            <div className="flex items-start justify-between gap-2">
              <Link to={`/app/research/${r.id}`} className="font-semibold text-known-text hover:text-known-accent">{r.title}</Link>
              <SeverityBadge severity={r.severity} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-known-muted line-clamp-2">{r.summary}</p>
            <p className="mt-3 text-xs text-known-muted">{r.author} · {r.date} · {r.category}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {r.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded border border-white/8 bg-white/[0.02] px-2 py-0.5 text-xs text-known-muted">{tag}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
