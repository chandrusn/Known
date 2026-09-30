import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSubmissions } from '../contexts/SubmissionsContext'
import { activityFeed, sharedFindings } from '../data/activity'
import { institutes } from '../data/institutes'
import { organizations } from '../data/organizations'
import { researchArticles } from '../data/research'
import { securityPrograms } from '../data/programs'
import { threatReports } from '../data/threats'
import { vulnerabilities } from '../data/vulnerabilities'
import { ExposureMap, LearningPathMap, RelationshipMap, SeveritySpectrum } from '../components/dashboard/RoleVisuals'
import { PageHeader } from '../components/ui/PageHeader'
import { SeverityBadge, StatusBadge } from '../components/ui/Badge'

function SectionTitle({ eyebrow, title, href, linkLabel }: {
  eyebrow?: string
  title: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b border-white/8 pb-3">
      <div>
        {eyebrow && <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-known-muted">{eyebrow}</p>}
        <h2 className="text-base font-semibold tracking-[-0.03em] text-known-text">{title}</h2>
      </div>
      {href && <Link to={href} className="shrink-0 text-xs text-known-accent hover:underline">{linkLabel ?? 'View all'}</Link>}
    </div>
  )
}

function ActivityEntries({ entries, limit = 5 }: { entries: typeof activityFeed; limit?: number }) {
  return (
    <ol className="relative ml-1 space-y-0 border-l border-white/10">
      {entries.slice(0, limit).map((entry) => (
        <li key={entry.id} className="relative pb-5 pl-5 last:pb-0">
          <span className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-[#8fd3ff] ring-4 ring-[#0a0f1c]" />
          {entry.link ? (
            <Link to={entry.link} className="text-sm leading-relaxed text-known-text hover:text-known-accent">{entry.message}</Link>
          ) : (
            <p className="text-sm leading-relaxed text-known-text">{entry.message}</p>
          )}
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-known-muted">
            {entry.actor} <span className="normal-case tracking-normal">·</span> {new Date(entry.timestamp).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ol>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  const { submissions } = useSubmissions()
  const navigate = useNavigate()
  const [readerQuery, setReaderQuery] = useState('')
  if (!user) return null

  const userSubmissions = submissions.filter((submission) => submission.submitterId === user.id)
  const ownActivity = activityFeed.filter((entry) =>
    user.role === 'organization'
      ? entry.organizationId === user.organizationId
      : user.role === 'student'
        ? entry.instituteId === user.instituteId
        : true,
  )

  if (user.role === 'researcher') {
    const pendingResearch = userSubmissions.filter((submission) => submission.status === 'Pending Review')
    const relationshipVulnerability = vulnerabilities.find((item) => item.relatedResearchIds.length && item.relatedThreatIds.length && item.relatedProgramIds.length) ?? vulnerabilities[0]
    const relatedResearch = researchArticles.find((item) => relationshipVulnerability.relatedResearchIds.includes(item.id))
    const relatedThreat = threatReports.find((item) => relationshipVulnerability.relatedThreatIds.includes(item.id))
    const relatedProgram = securityPrograms.find((item) => relationshipVulnerability.relatedProgramIds.includes(item.id))
    const featuredBrief = relatedThreat ?? threatReports[0]
    const intelligenceTimeline = [...vulnerabilities]
      .sort((first, second) => second.publishedDate.localeCompare(first.publishedDate))
      .slice(0, 5)

    return (
      <div>
        <PageHeader title="Analyst Desk" description="Research activity, emerging threats, and intelligence requiring attention." />
        <div className="grid gap-6 2xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <section className="relative overflow-hidden border border-white/10 bg-[#101a2a] p-5 sm:p-7">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(135deg,transparent,rgba(91,140,255,.07))]" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.22em] text-known-accent">Featured intelligence brief</p>
              <Link to={`/app/threats/${featuredBrief.id}`} className="mt-4 block max-w-2xl font-serif text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-known-text hover:text-known-accent sm:text-4xl">
                {featuredBrief.title}
              </Link>
              <p className="mt-5 max-w-xl text-sm leading-6 text-known-muted">{featuredBrief.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.14em] text-known-muted">
                <span className="text-[#f87171]">{featuredBrief.severity}</span>
                {featuredBrief.threatActor} <span className="normal-case tracking-normal">·</span> {featuredBrief.publicationDate} <span className="normal-case tracking-normal">·</span> {featuredBrief.affectedSectors.join(', ')}
              </div>
            </div>
          </section>
          <RelationshipMap
            vulnerability={relationshipVulnerability}
            researchTitle={relatedResearch?.title ?? 'Research record'}
            threatTitle={relatedThreat?.title ?? 'Threat report'}
            programName={relatedProgram?.name ?? 'Security program'}
          />
        </div>

        <div className="mt-9 grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(270px,0.65fr)]">
          <div className="space-y-9">
            <section>
              <SectionTitle eyebrow="Priority exposure · vulnerability feed" title="High-priority findings" href="/app/intelligence" />
              <div className="divide-y divide-white/8">
                {intelligenceTimeline.filter((item) => item.severity === 'Critical' || item.exploitationStatus === 'Active Exploitation').slice(0, 4).map((vulnerability) => (
                  <article key={vulnerability.id} className="grid gap-2 py-3 sm:grid-cols-[130px_1fr_auto] sm:items-center">
                    <Link to={`/app/intelligence/${vulnerability.cveId}`} className="font-mono text-xs text-known-accent hover:underline">{vulnerability.cveId}</Link>
                    <div>
                      <p className="text-sm font-medium text-known-text">{vulnerability.title}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-known-muted">{vulnerability.exploitationStatus} · {vulnerability.affectedProduct}</p>
                    </div>
                    <SeverityBadge severity={vulnerability.severity} />
                  </article>
                ))}
              </div>
            </section>
            <section>
              <SectionTitle eyebrow="Work in review" title="My research queue" href="/app/workspace" linkLabel="Open workspace" />
              {pendingResearch.length ? (
                <ul className="divide-y divide-white/8">
                  {pendingResearch.map((submission) => (
                    <li key={submission.id} className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-known-text">{submission.title}</p>
                        <p className="mt-1 text-xs text-known-muted">{submission.category} · Submitted {submission.submittedAt.slice(0, 10)}</p>
                      </div>
                      <StatusBadge status={submission.status} />
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-known-muted">No research is currently awaiting review.</p>}
            </section>
            <section>
              <SectionTitle eyebrow="Research activity" title="Recent publications" href="/app/research" />
              <div className="grid gap-x-8 sm:grid-cols-3">
                {researchArticles.slice(0, 3).map((article) => (
                  <article key={article.id} className="border-t border-white/10 py-3">
                    <p className="text-[9px] uppercase tracking-[0.14em] text-[#c7b8ff]">{article.category}</p>
                    <Link to={`/app/research/${article.id}`} className="mt-2 block text-sm font-medium leading-snug text-known-text hover:text-known-accent">{article.title}</Link>
                    <p className="mt-2 text-[10px] text-known-muted">{article.author} · {article.date}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 xl:border-l xl:border-white/8 xl:pl-7">
            <section>
              <SectionTitle eyebrow="Lifecycle" title="Intelligence timeline" href="/app/intelligence" />
              <ol className="space-y-4">
                {intelligenceTimeline.map((vulnerability) => (
                  <li key={vulnerability.id} className="relative border-l border-white/10 pb-4 pl-4 last:border-transparent">
                    <span className="absolute -left-[3px] top-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: vulnerability.severity === 'Critical' ? '#f87171' : '#8fd3ff' }} />
                    <div className="flex items-center justify-between gap-3">
                      <Link to={`/app/intelligence/${vulnerability.cveId}`} className="font-mono text-xs text-known-accent hover:underline">{vulnerability.cveId}</Link>
                      <SeverityBadge severity={vulnerability.severity} />
                    </div>
                    <p className="mt-2 text-sm leading-snug text-known-text">{vulnerability.title}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-known-muted">{vulnerability.exploitationStatus} · {vulnerability.publishedDate}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <SectionTitle eyebrow="Field notes" title="Threat activity feed" href="/app/collaboration" />
              <ActivityEntries entries={activityFeed.filter((entry) => entry.type === 'threat_published' || entry.type === 'finding_shared')} limit={4} />
            </section>
            <section>
              <SectionTitle eyebrow="Research links" title="Saved intelligence" href="/app/workspace" />
              <ul className="space-y-3">
                {relationshipVulnerability.relatedResearchIds.map((researchId) => researchArticles.find((article) => article.id === researchId)).filter((article): article is typeof researchArticles[number] => Boolean(article)).slice(0, 3).map((article) => (
                  <li key={article.id} className="flex gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7b8ff]" />
                    <Link to={`/app/research/${article.id}`} className="leading-snug text-known-text hover:text-known-accent">
                      <span className="mr-2 font-mono text-[10px] text-known-muted">RESEARCH</span>{article.title}
                    </Link>
                  </li>
                ))}
                {relationshipVulnerability.relatedThreatIds.map((threatId) => threatReports.find((report) => report.id === threatId)).filter((report): report is typeof threatReports[number] => Boolean(report)).slice(0, 2).map((report) => (
                  <li key={report.id} className="flex gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7b8ff]" />
                    <Link to={`/app/threats/${report.id}`} className="leading-snug text-known-text hover:text-known-accent">
                      <span className="mr-2 font-mono text-[10px] text-known-muted">THREAT</span>{report.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    )
  }

  if (user.role === 'student') {
    const institute = institutes.find((item) => item.id === user.instituteId) ?? institutes[0]
    const instituteActivity = activityFeed.filter((entry) => entry.instituteId === institute.id)
    const peerContributions = submissions.filter((submission) => submission.instituteId === institute.id && submission.submitterId !== user.id)
    const peerFindings = sharedFindings.filter((finding) => finding.author !== user.name)
    const studentPublications = researchArticles.filter((article) => article.authorId === user.id)

    return (
      <div>
        <PageHeader title="Institute Study Room" description={`${institute.name} · ${institute.location}`} />
        <div className="mb-9 grid gap-6 2xl:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
          <LearningPathMap institute={institute} submissions={[...userSubmissions].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))} />
          <section className="border-l-2 border-[#8fd3ff]/60 py-1 pl-5 sm:pl-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8fd3ff]">Institute learning path</p>
            <h2 className="mt-3 font-serif text-2xl leading-tight tracking-[-0.03em] text-known-text">Research with context.</h2>
            <p className="mt-3 text-sm leading-6 text-known-muted">{institute.focus}</p>
            <Link to="/app/institute" className="mt-5 inline-block border-b border-[#8fd3ff]/40 pb-1 text-xs text-[#8fd3ff] hover:text-white">Open institute hub →</Link>
          </section>
        </div>
        <section className="mb-9">
          <SectionTitle eyebrow="Course library" title="Assigned resources" href="/app/institute" />
          <div className="grid gap-x-8 md:grid-cols-3">
            {institute.resources.map((resource, index) => (
              <a key={resource.title} href={resource.url} className="group grid grid-cols-[36px_1fr] gap-3 border-t border-white/10 py-4 hover:border-[#8fd3ff]/50">
                <span className="font-serif text-xl text-[#8fd3ff]">0{index + 1}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-known-muted">{resource.type}</p>
                  <p className="mt-2 text-sm font-medium leading-snug text-known-text group-hover:text-[#8fd3ff]">{resource.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
        <div className="grid gap-9 xl:grid-cols-[minmax(0,1fr)_minmax(270px,0.72fr)]">
          <div className="space-y-9">
            <section>
              <SectionTitle eyebrow="Institute journal" title="Institute publications" href="/app/research" />
              <div className="grid gap-x-8 sm:grid-cols-2">
                {(studentPublications.length ? studentPublications : researchArticles.filter((article) => article.category === 'Research Articles' || article.category === 'Security Analysis').slice(0, 4)).map((article) => (
                  <article key={article.id} className="border-b border-white/8 py-4 first:pt-0">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#8fd3ff]">{article.category}</p>
                    <Link to={`/app/research/${article.id}`} className="mt-2 block text-sm font-medium leading-snug text-known-text hover:text-known-accent">{article.title}</Link>
                    <p className="mt-2 text-xs text-known-muted">{article.author} · {article.date}</p>
                  </article>
                ))}
              </div>
            </section>
            <section>
              <SectionTitle eyebrow="Coursework" title="Assigned research" href="/app/institute" linkLabel="Institute hub" />
              <ol className="space-y-0">
                {institute.assignments.map((assignment, index) => (
                  <li key={assignment.title} className="grid grid-cols-[40px_1fr_auto] items-start gap-3 border-b border-white/8 py-4 first:pt-0">
                    <span className="font-serif text-xl text-[#8fd3ff]">0{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-known-text">{assignment.title}</p>
                      <p className="mt-1 text-xs text-known-muted">Due {assignment.due}</p>
                    </div>
                    <span className="text-xs text-known-muted">{assignment.status}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <SectionTitle eyebrow="Review process" title="Submission timeline" href="/app/submissions" />
              {userSubmissions.length ? (
                <ol className="space-y-3">
                  {[...userSubmissions].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).slice(0, 4).map((submission) => (
                    <li key={submission.id} className="grid grid-cols-[110px_1fr_auto] items-center gap-3 text-sm">
                      <span className="font-mono text-[10px] text-known-muted">{submission.submittedAt.slice(0, 10)}</span>
                      <span className="text-known-text">{submission.title}</span>
                      <StatusBadge status={submission.status} />
                    </li>
                  ))}
                </ol>
              ) : <p className="text-sm text-known-muted">Your submissions will appear here.</p>}
            </section>
          </div>
          <aside className="space-y-8 xl:border-l xl:border-white/8 xl:pl-7">
            <section>
              <SectionTitle eyebrow="From your cohort" title="Peer contributions" href="/app/collaboration" />
              <ul className="space-y-4">
                {peerContributions.length ? peerContributions.slice(0, 3).map((submission) => (
                  <li key={submission.id} className="border-b border-white/8 pb-4 last:border-0">
                    <p className="text-sm font-medium text-known-text">{submission.title}</p>
                    <p className="mt-1 text-xs text-known-muted">{submission.submittedBy} · {submission.category}</p>
                  </li>
                )) : peerFindings.slice(0, 3).map((finding) => (
                  <li key={finding.id} className="border-b border-white/8 pb-4 last:border-0">
                    <p className="text-sm font-medium text-known-text">{finding.title}</p>
                    <p className="mt-1 text-xs text-known-muted">{finding.author} · Shared finding</p>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <SectionTitle eyebrow="Campus notes" title="Institute activity" />
              <ActivityEntries entries={instituteActivity} limit={5} />
            </section>
          </aside>
        </div>
      </div>
    )
  }

  if (user.role === 'organization') {
    const organization = organizations.find((item) => item.id === user.organizationId) ?? organizations[0]
    const programs = securityPrograms.filter((program) => program.organizationId === organization.id)
    const relevantVulnerabilities = vulnerabilities.filter((vulnerability) =>
      vulnerability.relatedProgramIds.some((programId) => programs.some((program) => program.id === programId)),
    )
    const orgSubmissions = submissions.filter((submission) => submission.organizationId === organization.id)
    const threatBriefings = threatReports.slice(0, 3)

    return (
      <div>
        <PageHeader title={organization.name} description={`${organization.industry} · Operations workspace`} />
        <div className="mb-9 grid gap-6 2xl:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]">
          <ExposureMap organizationName={organization.name} vulnerabilities={relevantVulnerabilities} programs={programs} />
          <section className="border-l-2 border-[#5b8cff]/60 py-1 pl-5 sm:pl-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-known-accent">Security programs</p>
            <h2 className="mt-3 font-serif text-2xl leading-tight tracking-[-0.03em] text-known-text">Operational scope</h2>
            <div className="mt-4 divide-y divide-white/8">
              {programs.map((program) => (
                <Link key={program.id} to={`/app/programs/${program.id}`} className="block py-3 first:pt-0 hover:text-known-accent">
                  <span className="flex items-center justify-between gap-3 text-sm font-medium text-known-text">
                    {program.name}<span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-[#8fd3ff]">{program.active ? 'Open' : 'Closed'}</span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-known-muted">{program.submissionStatus}</span>
                </Link>
              ))}
            </div>
            <Link to="/app/programs" className="mt-4 inline-block border-b border-[#5b8cff]/40 pb-1 text-xs text-known-accent hover:text-white">Program register →</Link>
          </section>
        </div>
        <div className="grid gap-9 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.7fr)]">
          <div className="space-y-9">
            <section>
              <SectionTitle eyebrow="Exposure overview" title="Relevant vulnerabilities" href="/app/intelligence" />
              <div className="divide-y divide-white/8">
                {relevantVulnerabilities.slice(0, 6).map((vulnerability) => (
                  <article key={vulnerability.id} className="grid gap-2 py-4 sm:grid-cols-[150px_1fr_auto] sm:items-center">
                    <Link to={`/app/intelligence/${vulnerability.cveId}`} className="font-mono text-xs text-known-accent hover:underline">{vulnerability.cveId}</Link>
                    <div>
                      <p className="text-sm font-medium text-known-text">{vulnerability.title}</p>
                      <p className="mt-1 text-xs text-known-muted">{vulnerability.affectedProduct} · {vulnerability.exploitationStatus}</p>
                    </div>
                    <SeverityBadge severity={vulnerability.severity} />
                  </article>
                ))}
              </div>
            </section>
            <section>
              <SectionTitle eyebrow="Triage desk" title="Research reviews" href="/app/submissions" />
              {orgSubmissions.length ? (
                <ul className="divide-y divide-white/8">
                  {orgSubmissions.slice(0, 5).map((submission) => (
                    <li key={submission.id} className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-known-text">{submission.title}</p>
                        <p className="mt-1 text-xs text-known-muted">{submission.submittedBy} · {submission.submittedAt.slice(0, 10)}</p>
                      </div>
                      <StatusBadge status={submission.status} />
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-known-muted">No organization reviews are currently queued.</p>}
            </section>
          </div>
          <aside className="space-y-8 xl:border-l xl:border-white/8 xl:pl-7">
            <section>
              <SectionTitle eyebrow="Current operations" title="Organization activity" href="/app/collaboration" />
              <ActivityEntries entries={ownActivity} limit={5} />
            </section>
            <section>
              <SectionTitle eyebrow="Threat desk" title="Threat briefings" href="/app/threats" />
              <div className="space-y-4">
                {threatBriefings.map((report) => (
                  <article key={report.id} className="border-b border-white/8 pb-4 last:border-0">
                    <Link to={`/app/threats/${report.id}`} className="text-sm font-medium leading-snug text-known-text hover:text-known-accent">{report.title}</Link>
                    <p className="mt-1 text-xs text-known-muted">{report.threatActor} · {report.publicationDate}</p>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    )
  }

  const trendingVulnerabilities = [...vulnerabilities].sort((first, second) => second.cvssScore - first.cvssScore).slice(0, 6)
  const readerBrief = threatReports[0]

  const submitReaderSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = readerQuery.trim()
    navigate(query ? `/app/intelligence?q=${encodeURIComponent(query)}` : '/app/intelligence')
  }

  return (
    <div>
      <PageHeader title="Intelligence Reader" description="Published vulnerability intelligence, threat briefings, and security research." />
      <form onSubmit={submitReaderSearch} className="mb-8 flex max-w-3xl items-center border-b border-white/15 pb-2 focus-within:border-[#5b8cff]">
        <label htmlFor="reader-search" className="mr-3 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8fd3ff]">Search KNOWN</label>
        <input id="reader-search" value={readerQuery} onChange={(event) => setReaderQuery(event.target.value)} placeholder="CVE, product, threat actor, research…" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-known-text outline-none placeholder:text-known-muted/70" />
        <button type="submit" className="ml-3 border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.13em] text-known-muted transition-colors hover:border-[#5b8cff]/50 hover:text-known-text">Search</button>
      </form>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(285px,0.65fr)]">
        <section>
          <article className="mb-8 border-l-2 border-[#8fd3ff]/70 bg-[#101a2a] px-5 py-5 sm:px-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8fd3ff]">Featured intelligence · {readerBrief.severity}</p>
            <Link to={`/app/threats/${readerBrief.id}`} className="mt-3 block max-w-3xl font-serif text-3xl font-medium leading-tight tracking-[-0.04em] text-known-text hover:text-known-accent">{readerBrief.title}</Link>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-known-muted">{readerBrief.summary}</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-known-muted">{readerBrief.threatActor} · {readerBrief.publicationDate}</p>
          </article>
          <section>
            <SectionTitle eyebrow="Threat intelligence" title="Latest briefings" href="/app/threats" />
            <div className="divide-y divide-white/8">
              {threatReports.slice(1, 5).map((report, index) => (
                <article key={report.id} className="grid gap-3 py-4 sm:grid-cols-[36px_1fr_auto]">
                  <span className="font-serif text-xl text-known-muted/60">0{index + 1}</span>
                  <div>
                    <Link to={`/app/threats/${report.id}`} className="text-base font-medium text-known-text hover:text-known-accent">{report.title}</Link>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-known-muted">{report.summary}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.13em] text-known-muted">{report.threatActor} · {report.publicationDate}</p>
                  </div>
                  <SeverityBadge severity={report.severity} />
                </article>
              ))}
            </div>
          </section>
          <section className="mt-9">
            <SectionTitle eyebrow="Security journal" title="Research discovery" href="/app/research" />
            <div className="grid gap-x-8 sm:grid-cols-2">
              {researchArticles.slice(0, 4).map((article) => (
                <article key={article.id} className="border-t border-white/10 py-3">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#c7b8ff]">{article.category}</p>
                  <Link to={`/app/research/${article.id}`} className="mt-2 block text-sm font-medium leading-snug text-known-text hover:text-known-accent">{article.title}</Link>
                  <p className="mt-2 text-[10px] text-known-muted">{article.author} · {article.date}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
        <aside className="space-y-8 xl:border-l xl:border-white/8 xl:pl-7">
          <SeveritySpectrum vulnerabilities={vulnerabilities} />
          <section>
            <SectionTitle eyebrow="Highest exposure" title="Trending vulnerabilities" href="/app/intelligence" />
            <ol className="divide-y divide-white/8">
              {trendingVulnerabilities.map((vulnerability, index) => (
                <li key={vulnerability.id} className="grid grid-cols-[24px_1fr_auto] items-start gap-2 py-3">
                  <span className="font-mono text-[10px] text-known-muted">0{index + 1}</span>
                  <div>
                    <Link to={`/app/intelligence/${vulnerability.cveId}`} className="font-mono text-xs text-known-accent hover:underline">{vulnerability.cveId}</Link>
                    <p className="mt-1 text-xs leading-snug text-known-text">{vulnerability.title}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-known-muted">CVSS {vulnerability.cvssScore.toFixed(1)} · {vulnerability.exploitationStatus}</p>
                  </div>
                  <span className="mt-1 h-2 w-2" style={{ backgroundColor: vulnerability.severity === 'Critical' ? '#f87171' : vulnerability.severity === 'High' ? '#fb923c' : vulnerability.severity === 'Medium' ? '#facc15' : '#34d399' }} />
                </li>
              ))}
            </ol>
          </section>
          <section>
            <SectionTitle eyebrow="New signal" title="Platform activity" href="/app/collaboration" />
            <ActivityEntries entries={activityFeed} limit={4} />
          </section>
        </aside>
      </div>
    </div>
  )
}
