import { Link } from 'react-router-dom'
import { activityFeed, sharedFindings, discussions } from '../data/activity'
import { useAuth } from '../contexts/AuthContext'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { SeverityBadge } from '../components/ui/Badge'

export function CollaborationPage() {
  const { user } = useAuth()
  const orgFeed = user?.organizationId
    ? activityFeed.filter((a) => a.organizationId === user.organizationId)
    : []
  const instituteFeed = user?.instituteId
    ? activityFeed.filter((a) => a.instituteId === user.instituteId)
    : []

  return (
    <div>
      <PageHeader
        title="Collaboration"
        description="Shared findings, program coordination, and analyst discussion across the platform."
      />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader title="Research activity stream" subtitle="Recent platform contributions" />
            <ul className="space-y-4">
              {activityFeed.slice(0, 8).map((a) => (
                <li key={a.id} className="border-b border-known-border pb-3 last:border-0 last:pb-0">
                  <p className="text-sm text-known-text">{a.message}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-known-muted">
                    {a.actor} · {new Date(a.timestamp).toLocaleString()}
                  </p>
                  {a.link && (
                    <Link to={a.link.replace(/^\/app/, '/app')} className="mt-2 inline-block text-xs text-known-accent hover:underline">
                      View context
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Security discussions" />
            <ul className="space-y-4">
              {discussions.map((d) => (
                <li key={d.id} className="rounded-lg border border-known-border bg-known-bg/40 p-3">
                  <p className="font-medium text-known-text">{d.title}</p>
                  <p className="mt-1 text-sm text-known-muted">{d.preview}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-known-muted">
                    {d.author} · {d.replies} replies · {d.lastActivity}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Shared findings" />
            <ul className="space-y-3">
              {sharedFindings.map((f) => (
                <li key={f.id} className="border-b border-known-border pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-known-text">{f.title}</p>
                    <SeverityBadge severity={f.severity} />
                  </div>
                  <p className="mt-1 text-xs text-known-muted">{f.summary}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-known-muted">{f.author} · {f.sharedAt}</p>
                </li>
              ))}
            </ul>
          </Card>

          {user?.role === 'organization' && orgFeed.length > 0 && (
            <Card>
              <CardHeader title="Program activity" />
              <ul className="space-y-2 text-sm text-known-muted">
                {orgFeed.map((a) => (
                  <li key={a.id}>{a.message}</li>
                ))}
              </ul>
            </Card>
          )}

          {user?.role === 'student' && instituteFeed.length > 0 && (
            <Card>
              <CardHeader title="Institute activity" />
              <ul className="space-y-2 text-sm text-known-muted">
                {instituteFeed.map((a) => (
                  <li key={a.id}>{a.message}</li>
                ))}
              </ul>
            </Card>
          )}

          {user?.role !== 'organization' && user?.role !== 'student' && (
            <Card>
              <CardHeader title="Cross-platform activity" />
              <ul className="space-y-2 text-sm text-known-muted">
                {activityFeed.slice(0, 4).map((a) => (
                  <li key={a.id}>{a.message}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
