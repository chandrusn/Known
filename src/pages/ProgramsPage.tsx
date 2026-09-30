import { Link } from 'react-router-dom'
import { securityPrograms } from '../data/programs'
import { useAuth } from '../contexts/AuthContext'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'

export function ProgramsPage() {
  const { user } = useAuth()
  const programs =
    user?.role === 'organization' && user.organizationId
      ? securityPrograms.filter((p) => p.organizationId === user.organizationId)
      : securityPrograms

  return (
    <div>
      <PageHeader
        title="Security Programs"
        description="Vulnerability disclosure and bug bounty programs connecting researchers with organizations."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {programs.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between">
              <Link
                to={`/app/programs/${p.id}`}
                className="text-lg font-semibold text-known-text hover:text-known-accent"
              >
                {p.name}
              </Link>
              <span
                className={`text-xs font-medium ${p.active ? 'text-known-low' : 'text-known-muted'}`}
              >
                {p.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="mt-1 text-sm text-known-muted">{p.organization}</p>
            <p className="mt-3 text-sm leading-relaxed text-known-muted line-clamp-3">
              {p.description}
            </p>
            <p className="mt-3 text-xs text-known-muted">{p.rewardInfo}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
