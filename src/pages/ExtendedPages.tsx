import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { ModerationFlow } from '../components/dashboard/RoleVisuals'
import { Input, Select, Textarea } from '../components/ui/Input'
import { PageHeader } from '../components/ui/PageHeader'
import { SeverityBadge, StatusBadge } from '../components/ui/Badge'
import { activityFeed, discussions, sharedFindings } from '../data/activity'
import { institutes } from '../data/institutes'
import { organizations } from '../data/organizations'
import { securityPrograms } from '../data/programs'
import { researchArticles } from '../data/research'
import { threatReports } from '../data/threats'
import { seedUsers } from '../data/users'
import { vulnerabilities } from '../data/vulnerabilities'
import { useAuth } from '../contexts/AuthContext'
import { useSubmissions } from '../contexts/SubmissionsContext'
import type { Severity } from '../types'

function sortByDateDesc<T extends {
  publicationDate?: string
  publishedDate?: string
  date?: string
  submittedAt?: string
  timestamp?: string
}>(items: T[]) {
  return [...items].sort((a, b) => {
    const aDate = a.publicationDate ?? a.publishedDate ?? a.date ?? a.submittedAt ?? a.timestamp ?? '1970-01-01'
    const bDate = b.publicationDate ?? b.publishedDate ?? b.date ?? b.submittedAt ?? b.timestamp ?? '1970-01-01'
    return bDate.localeCompare(aDate)
  })
}

export function WorkspacePage() {
  const { user } = useAuth()
  const { submissions } = useSubmissions()

  if (!user) return <Navigate to="/login" replace />

  const mySubmissions = submissions.filter((s) => s.submitterId === user.id)

  if (user.role === 'researcher') {
    return (
      <div>
        <PageHeader title="My Workspace" description="Your findings, research drafts, and submission pipeline." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: 'My Findings', value: 12, hint: 'Shared notes' },
            { label: 'My Research', value: 6, hint: 'Published articles' },
            { label: 'Bookmarks', value: 18, hint: 'Saved CVEs' },
            { label: 'Drafts', value: 3, hint: 'In progress' },
            { label: 'Submission Status', value: mySubmissions.length, hint: 'tracked items' },
          ].map((item) => (
            <Card key={item.label}>
              <p className="text-xs uppercase tracking-wider text-known-muted">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-known-text">{item.value}</p>
              <p className="mt-1 text-xs text-known-muted">{item.hint}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Recent submissions" />
            <ul className="space-y-3 text-sm">
              {mySubmissions.slice(0, 5).map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 border-b border-known-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-known-text">{item.title}</p>
                    <p className="text-xs text-known-muted">{item.category}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader title="Saved intelligence" />
            <ul className="space-y-3 text-sm text-known-muted">
              {vulnerabilities.slice(0, 5).map((v) => (
                <li key={v.id} className="flex justify-between gap-3">
                  <Link to={`/app/intelligence/${v.cveId}`} className="text-known-accent hover:underline">{v.cveId}</Link>
                  <span>{v.title}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    )
  }

  if (user.role === 'student') {
    const institute = institutes.find((item) => item.id === user.instituteId) ?? institutes[0]

    return (
      <div>
        <PageHeader title="Student Workspace" description="Institute repository, assignments, and research submissions." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Institute Repository', value: institute.repository.length, hint: 'Private items' },
            { label: 'Assignments', value: institute.assignments.length, hint: 'Current workload' },
            { label: 'Institute Resources', value: institute.resources.length, hint: 'Shared materials' },
            { label: 'Submissions', value: mySubmissions.length, hint: 'Tracked review' },
          ].map((item) => (
            <Card key={item.label}>
              <p className="text-xs uppercase tracking-wider text-known-muted">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-known-text">{item.value}</p>
              <p className="mt-1 text-xs text-known-muted">{item.hint}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Institute repository" />
            <ul className="space-y-3 text-sm">
              {institute.repository.map((entry) => (
                <li key={entry.title} className="border-b border-known-border pb-2 last:border-0 last:pb-0">
                  <p className="font-medium text-known-text">{entry.title}</p>
                  <p className="text-xs text-known-muted">{entry.description}</p>
                  <p className="mt-1 text-xs text-known-muted">{entry.date}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader title="Assignments" />
            <ul className="space-y-3 text-sm">
              {institute.assignments.map((assignment) => (
                <li key={assignment.title} className="flex items-center justify-between gap-3 border-b border-known-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-known-text">{assignment.title}</p>
                    <p className="text-xs text-known-muted">Due {assignment.due}</p>
                  </div>
                  <span className="text-xs text-known-muted">{assignment.status}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    )
  }

  if (user.role === 'organization') {
    const organization = organizations.find((item) => item.id === user.organizationId) ?? organizations[0]
    return (
      <div>
        <PageHeader title="Organization Workspace" description="Programs, members, queue health, and active research operations." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Programs', value: securityPrograms.filter((p) => p.organizationId === organization.id).length, hint: 'Active charter' },
            { label: 'Members', value: organization.members.length, hint: 'Team roster' },
            { label: 'Research Queue', value: submissions.filter((s) => s.organizationId === organization.id).length, hint: 'Open items' },
            { label: 'Security Activity', value: activityFeed.filter((item) => item.organizationId === organization.id).length, hint: 'Recent updates' },
          ].map((item) => (
            <Card key={item.label}>
              <p className="text-xs uppercase tracking-wider text-known-muted">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-known-text">{item.value}</p>
              <p className="mt-1 text-xs text-known-muted">{item.hint}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Members" />
            <ul className="space-y-3 text-sm">
              {organization.members.map((member) => (
                <li key={member.name} className="flex items-center justify-between gap-3 border-b border-known-border pb-2 last:border-0 last:pb-0">
                  <span className="text-known-text">{member.name}</span>
                  <span className="text-xs text-known-muted">{member.role}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader title="Research queue" />
            <ul className="space-y-3 text-sm">
              {submissions.filter((s) => s.organizationId === organization.id).slice(0, 5).map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 border-b border-known-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-known-text">{item.title}</p>
                    <p className="text-xs text-known-muted">{item.submittedBy}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Workspace" description="General access to shared content and platform updates." />
      <Card>
        <p className="text-sm text-known-muted">The workspace for general users is read-only and restricted to public security research and operational intelligence.</p>
      </Card>
    </div>
  )
}

export function InstitutePage() {
  const { user } = useAuth()

  if (!user || user.role !== 'student') {
    return <Navigate to="/app/dashboard" replace />
  }

  const institute = institutes.find((item) => item.id === user.instituteId) ?? institutes[0]

  return (
    <div>
      <PageHeader title={institute.name} description={institute.focus} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Resources" />
          <ul className="space-y-3 text-sm text-known-muted">
            {institute.resources.map((resource) => (
              <li key={resource.title} className="border-b border-known-border pb-2 last:border-0 last:pb-0">
                <p className="font-medium text-known-text">{resource.title}</p>
                <p className="text-xs">{resource.type}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Repository" />
          <ul className="space-y-3 text-sm text-known-muted">
            {institute.repository.map((entry) => (
              <li key={entry.title} className="border-b border-known-border pb-2 last:border-0 last:pb-0">
                <p className="font-medium text-known-text">{entry.title}</p>
                <p className="text-xs">{entry.description}</p>
                <p className="mt-1 text-xs text-known-muted">{entry.date}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Assignments" />
          <ul className="space-y-3 text-sm text-known-muted">
            {institute.assignments.map((assignment) => (
              <li key={assignment.title} className="border-b border-known-border pb-2 last:border-0 last:pb-0">
                <p className="font-medium text-known-text">{assignment.title}</p>
                <p className="text-xs">Due {assignment.due}</p>
                <p className="mt-1 text-xs text-known-muted">{assignment.status}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export function OrganizationPage() {
  const { user } = useAuth()

  if (!user || user.role !== 'organization') {
    return <Navigate to="/app/dashboard" replace />
  }

  const organization = organizations.find((item) => item.id === user.organizationId) ?? organizations[0]

  return (
    <div>
      <PageHeader title={organization.name} description={organization.industry} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Programs" />
          <ul className="space-y-3 text-sm">
            {securityPrograms.filter((program) => program.organizationId === organization.id).map((program) => (
              <li key={program.id} className="border-b border-known-border pb-2 last:border-0 last:pb-0">
                <Link to={`/app/programs/${program.id}`} className="font-medium text-known-text hover:text-known-accent">{program.name}</Link>
                <p className="mt-1 text-xs text-known-muted">{program.submissionStatus}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Members" />
          <ul className="space-y-3 text-sm">
            {organization.members.map((member) => (
              <li key={member.name} className="flex items-center justify-between gap-3 border-b border-known-border pb-2 last:border-0 last:pb-0">
                <span className="text-known-text">{member.name}</span>
                <span className="text-xs text-known-muted">{member.role}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Organization research" />
          <ul className="space-y-3 text-sm">
            {researchArticles
              .filter((article) => article.authorId === user.id || article.author === organization.name)
              .slice(0, 5)
              .map((article) => (
                <li key={article.id} className="border-b border-known-border pb-2 last:border-0 last:pb-0">
                  <Link to={`/app/research/${article.id}`} className="font-medium text-known-text hover:text-known-accent">{article.title}</Link>
                  <p className="mt-1 text-xs text-known-muted">{article.date}</p>
                </li>
              ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Security activity" />
          <ul className="space-y-3 text-sm text-known-muted">
            {activityFeed.filter((item) => item.organizationId === organization.id).slice(0, 6).map((item) => (
              <li key={item.id}>{item.message}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export function SubmissionsPage() {
  const { user } = useAuth()
  const { submissions, addSubmission } = useSubmissions()
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Security Analysis')
  const [severity, setSeverity] = useState<Severity>('Medium')
  const [tags, setTags] = useState('')
  const [summary, setSummary] = useState('')
  const [technicalDetails, setTechnicalDetails] = useState('')
  const [references, setReferences] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  const canSubmit = user.role === 'researcher' || user.role === 'student' || user.role === 'organization'
  const isCreateRoute = location.pathname.endsWith('/new')
  const userSubmissions = submissions.filter((s) => s.submitterId === user.id)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSubmit || !title.trim() || !user) return

    const currentUser = user

    addSubmission(
      {
        title: title.trim(),
        category,
        severity,
        tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        summary: summary.trim(),
        technicalDetails: technicalDetails.trim(),
        references: references.trim(),
      },
      {
        submittedBy: currentUser.name,
        submitterId: currentUser.id,
        submitterRole: currentUser.role,
        instituteId: currentUser.instituteId,
        organizationId: currentUser.organizationId,
      },
    )
    setTitle('')
    setCategory('Security Analysis')
    setSeverity('Medium')
    setTags('')
    setSummary('')
    setTechnicalDetails('')
    setReferences('')
    setSubmitted(true)
  }

  return (
    <div>
      <PageHeader
        title="Research Submissions"
        description="Submit findings, technical reviews, and research drafts for review and publication."
        actions={
          canSubmit && !isCreateRoute ? (
            <Link to="/app/submissions/new">
              <Button>New submission</Button>
            </Link>
          ) : undefined
        }
      />

      {isCreateRoute ? (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-known-muted">Title</label>
                <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Research title" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-known-muted">Category</label>
                <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option>Security Analysis</option>
                  <option>Vulnerability Findings</option>
                  <option>Research Articles</option>
                  <option>Technical Write-Up</option>
                  <option>Proof-of-Concept Studies</option>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-known-muted">Severity</label>
                <Select value={severity} onChange={(event) => setSeverity(event.target.value as Severity)}>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-known-muted">Tags</label>
                <Input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="e.g. Citrix, VPN, Detection" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-known-muted">Summary</label>
              <Textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={3} placeholder="Short summary of the finding or analysis" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-known-muted">Technical details</label>
              <Textarea value={technicalDetails} onChange={(event) => setTechnicalDetails(event.target.value)} rows={5} placeholder="Detailed analysis, testing notes, or findings" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-known-muted">References</label>
              <Textarea value={references} onChange={(event) => setReferences(event.target.value)} rows={2} placeholder="Links, advisories, and source material" />
            </div>
            {submitted && <p className="text-sm text-known-low">Submission queued for review.</p>}
            <div className="flex gap-3">
              <Button type="submit">Submit research</Button>
              <Link to="/app/submissions">
                <Button variant="secondary" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader title="Your submissions" />
            <div className="space-y-3">
              {userSubmissions.length === 0 ? (
                <p className="text-sm text-known-muted">No submissions yet.</p>
              ) : (
                userSubmissions.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 border-b border-known-border pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-known-text">{item.title}</p>
                      <p className="text-xs text-known-muted">{item.category} · {item.submittedAt.slice(0, 10)}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export function AdminOverviewPage() {
  const { submissions } = useSubmissions()
  const pendingSubmissions = sortByDateDesc(submissions.filter((submission) => submission.status === 'Pending Review'))
  const latestSubmissions = sortByDateDesc(submissions).slice(0, 5)
  const instituteActivity = sortByDateDesc(activityFeed.filter((entry) => entry.instituteId))
  const organizationActivity = sortByDateDesc(activityFeed.filter((entry) => entry.organizationId))

  return (
    <div>
      <PageHeader title="Platform Operations" description="Editorial oversight, research review, and activity across the KNOWN network." />
      <div className="mb-9 grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <ModerationFlow submissions={submissions} publications={researchArticles.length} />
        <section className="border-l-2 border-[#c7b8ff]/60 py-1 pl-5 sm:pl-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c7b8ff]">Editorial operations</p>
          <h2 className="mt-3 font-serif text-2xl leading-tight tracking-[-0.03em] text-known-text">From submission to shared intelligence.</h2>
          <p className="mt-3 text-sm leading-6 text-known-muted">Monitor incoming research, review decisions, and approved publications across the KNOWN network.</p>
          <Link to="/admin/moderation" className="mt-5 inline-block border-b border-[#c7b8ff]/40 pb-1 text-xs text-[#c7b8ff] hover:text-white">Enter moderation →</Link>
        </section>
      </div>
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
        <section>
          <div className="mb-5 flex items-end justify-between border-b border-white/8 pb-3">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Network pulse</p>
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-known-text">Platform activity stream</h2>
            </div>
            <Link to="/admin/analytics" className="text-xs text-known-accent hover:underline">Activity archive</Link>
          </div>
          <ol className="relative ml-1 space-y-0 border-l border-white/10">
            {sortByDateDesc(activityFeed).slice(0, 9).map((entry) => (
              <li key={entry.id} className="relative pb-5 pl-5 last:pb-0">
                <span className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-[#8fd3ff] ring-4 ring-[#0a0f1c]" />
                <p className="text-sm leading-relaxed text-known-text">{entry.message}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-known-muted">{entry.actor} · {new Date(entry.timestamp).toLocaleDateString()}</p>
              </li>
            ))}
          </ol>
        </section>

        <aside className="xl:border-l xl:border-white/8 xl:pl-7">
          <div className="mb-5 flex items-end justify-between border-b border-white/8 pb-3">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Editorial desk</p>
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-known-text">Moderation queue</h2>
            </div>
            <Link to="/admin/moderation" className="text-xs text-known-accent hover:underline">Open queue</Link>
          </div>
          {pendingSubmissions.length ? (
            <ul className="divide-y divide-white/8">
              {pendingSubmissions.slice(0, 5).map((submission) => (
                <li key={submission.id} className="py-3 first:pt-0">
                  <Link to="/admin/moderation" className="text-sm font-medium leading-snug text-known-text hover:text-known-accent">{submission.title}</Link>
                  <p className="mt-1 text-xs text-known-muted">{submission.submittedBy} · {submission.category}</p>
                  <p className="mt-1 font-mono text-[10px] text-known-muted">Received {submission.submittedAt.slice(0, 10)}</p>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-known-muted">The moderation queue is clear.</p>}
        </aside>
      </div>

      <div className="mt-10 grid gap-10 border-t border-white/8 pt-8">
        <section>
          <div className="mb-4 flex items-end justify-between border-b border-white/8 pb-3">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Incoming work</p>
              <h2 className="text-base font-semibold text-known-text">Latest submissions</h2>
            </div>
            <Link to="/admin/moderation" className="text-xs text-known-accent hover:underline">Submission register</Link>
          </div>
          <ul className="divide-y divide-white/8">
            {latestSubmissions.map((submission) => (
              <li key={submission.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-known-text">{submission.title}</p>
                  <p className="mt-1 text-xs text-known-muted">{submission.submittedBy} · {submission.submittedAt.slice(0, 10)}</p>
                </div>
                <StatusBadge status={submission.status} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10 grid gap-10 border-t border-white/8 pt-8 md:grid-cols-2">
        <section>
          <div className="mb-4 border-b border-white/8 pb-3">
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Academic partners</p>
            <h2 className="text-base font-semibold text-known-text">Institute activity</h2>
          </div>
          <ul className="space-y-4">
            {instituteActivity.slice(0, 4).map((entry) => (
              <li key={entry.id} className="border-l border-white/10 pl-4">
                <p className="text-sm text-known-text">{entry.message}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-known-muted">{entry.actor} · {new Date(entry.timestamp).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div className="mb-4 border-b border-white/8 pb-3">
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Security partners</p>
            <h2 className="text-base font-semibold text-known-text">Organization activity</h2>
          </div>
          <ul className="space-y-4">
            {organizationActivity.slice(0, 4).map((entry) => (
              <li key={entry.id} className="border-l border-white/10 pl-4">
                <p className="text-sm text-known-text">{entry.message}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-known-muted">{entry.actor} · {new Date(entry.timestamp).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export function AdminUsersPage() {
  return (
    <div>
      <PageHeader title="User Management" description="Role-based account overview and administrative operations." />
      <Card>
        <div className="overflow-hidden rounded-lg border border-known-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-known-surface text-xs uppercase text-known-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-known-border bg-known-bg">
              {seedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-known-text">{user.name}</td>
                  <td className="px-4 py-3 text-known-muted">{user.email}</td>
                  <td className="px-4 py-3 text-known-text capitalize">{user.role}</td>
                  <td className="px-4 py-3"><StatusBadge status="Approved" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export function AdminOrganizationsPage() {
  return (
    <div>
      <PageHeader title="Organizations" description="Portfolio organizations and their active program coverage." />
      <div className="grid gap-4 lg:grid-cols-2">
        {organizations.map((org) => (
          <Card key={org.id}>
            <h3 className="text-lg font-semibold text-known-text">{org.name}</h3>
            <p className="mt-1 text-sm text-known-muted">{org.industry}</p>
            <ul className="mt-4 space-y-2 text-sm text-known-muted">
              {org.members.map((member) => (
                <li key={member.name}>{member.name} · {member.role}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function AdminInstitutesPage() {
  return (
    <div>
      <PageHeader title="Institutes" description="Institutional groups with private research and student submissions." />
      <div className="grid gap-4 lg:grid-cols-2">
        {institutes.map((institute) => (
          <Card key={institute.id}>
            <h3 className="text-lg font-semibold text-known-text">{institute.name}</h3>
            <p className="mt-1 text-sm text-known-muted">{institute.location}</p>
            <p className="mt-3 text-sm text-known-muted">{institute.focus}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function AdminResearchPage() {
  return (
    <div>
      <PageHeader title="Research Management" description="Editorial review and publication pipeline for research articles." />
      <Card>
        <div className="space-y-3">
          {researchArticles.map((article) => (
            <div key={article.id} className="flex items-center justify-between gap-3 border-b border-known-border pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-medium text-known-text">{article.title}</p>
                <p className="text-xs text-known-muted">{article.author} · {article.category}</p>
              </div>
              <SeverityBadge severity={article.severity} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function AdminThreatReportsPage() {
  return (
    <div>
      <PageHeader title="Threat Reports" description="Threat intelligence library coverage and actor mapping." />
      <div className="grid gap-4 lg:grid-cols-2">
        {threatReports.map((threat) => (
          <Card key={threat.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-known-text">{threat.title}</p>
                <p className="mt-1 text-xs text-known-muted">{threat.threatActor}</p>
              </div>
              <SeverityBadge severity={threat.severity} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function AdminVulnerabilitiesPage() {
  return (
    <div>
      <PageHeader title="Vulnerabilities" description="CVE inventory and active exploitation visibility." />
      <Card>
        <div className="space-y-3">
          {vulnerabilities.slice(0, 12).map((vuln) => (
            <div key={vuln.id} className="flex items-center justify-between gap-3 border-b border-known-border pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-medium text-known-text">{vuln.cveId}</p>
                <p className="text-xs text-known-muted">{vuln.title}</p>
              </div>
              <SeverityBadge severity={vuln.severity} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function AdminModerationPage() {
  const pending = useMemo(
    () =>
      [...securityPrograms].slice(0, 3).map((program) => ({
        id: program.id,
        title: program.name,
        detail: program.organization,
      })),
    [],
  )

  return (
    <div>
      <PageHeader title="Moderation" description="Review queue and platform governance actions." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Pending review" />
          <ul className="space-y-3 text-sm">
            {pending.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 border-b border-known-border pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-known-text">{item.title}</p>
                  <p className="text-xs text-known-muted">{item.detail}</p>
                </div>
                <StatusBadge status="Pending Review" />
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Policy controls" />
          <ul className="space-y-3 text-sm text-known-muted">
            <li>Safe harbor review enabled</li>
            <li>Institute account segregation active</li>
            <li>Threat intel moderation workflow live</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export function AdminAnalyticsPage() {
  return (
    <div>
      <PageHeader title="Intelligence & Publication Register" description="Chronological record of published research, threat reporting, vulnerability intelligence, and network activity." />
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
        <div className="space-y-9">
          <section>
            <div className="mb-4 border-b border-white/8 pb-3">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Journal archive</p>
              <h2 className="text-base font-semibold text-known-text">Publication timeline</h2>
            </div>
            <ol className="relative ml-1 space-y-0 border-l border-white/10">
              {sortByDateDesc(researchArticles).slice(0, 8).map((article) => (
                <li key={article.id} className="relative pb-5 pl-5 last:pb-0">
                  <span className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-[#c7b8ff] ring-4 ring-[#0a0f1c]" />
                  <Link to={`/app/research/${article.id}`} className="text-sm font-medium text-known-text hover:text-known-accent">{article.title}</Link>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-known-muted">{article.date} · {article.author} · {article.category}</p>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <div className="mb-4 border-b border-white/8 pb-3">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Exposure register</p>
              <h2 className="text-base font-semibold text-known-text">Vulnerability lifecycle</h2>
            </div>
            <div className="divide-y divide-white/8">
              {sortByDateDesc(vulnerabilities).slice(0, 6).map((vulnerability) => (
                <div key={vulnerability.id} className="grid gap-2 py-3 sm:grid-cols-[130px_1fr_auto] sm:items-center">
                  <Link to={`/app/intelligence/${vulnerability.cveId}`} className="font-mono text-xs text-known-accent hover:underline">{vulnerability.cveId}</Link>
                  <div>
                    <p className="text-sm text-known-text">{vulnerability.title}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-known-muted">Published {vulnerability.publishedDate} · {vulnerability.exploitationStatus}</p>
                  </div>
                  <SeverityBadge severity={vulnerability.severity} />
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-9 xl:border-l xl:border-white/8 xl:pl-7">
          <section>
            <div className="mb-4 border-b border-white/8 pb-3">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Threat desk</p>
              <h2 className="text-base font-semibold text-known-text">Latest briefings</h2>
            </div>
            <ul className="divide-y divide-white/8">
              {sortByDateDesc(threatReports).slice(0, 5).map((report) => (
                <li key={report.id} className="py-3 first:pt-0">
                  <Link to={`/app/threats/${report.id}`} className="text-sm font-medium text-known-text hover:text-known-accent">{report.title}</Link>
                  <p className="mt-1 text-xs text-known-muted">{report.threatActor} · {report.publicationDate}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="mb-4 border-b border-white/8 pb-3">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">Network pulse</p>
              <h2 className="text-base font-semibold text-known-text">Recent activity</h2>
            </div>
            <ol className="relative ml-1 space-y-0 border-l border-white/10">
              {sortByDateDesc(activityFeed).slice(0, 6).map((entry) => (
                <li key={entry.id} className="relative pb-4 pl-5 last:pb-0">
                  <span className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-[#8fd3ff] ring-4 ring-[#0a0f1c]" />
                  <p className="text-xs leading-relaxed text-known-text">{entry.message}</p>
                  <p className="mt-1 text-[10px] text-known-muted">{entry.actor} · {new Date(entry.timestamp).toLocaleDateString()}</p>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  )
}

export { activityFeed, discussions, sharedFindings }
