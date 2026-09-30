import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const features = [
  {
    title: 'Vulnerability Intelligence',
    desc: 'CVE-centric intelligence with CVSS, exploitation status, and cross-links.',
  },
  {
    title: 'Threat Intelligence',
    desc: 'Threat reports, actors, IOCs, and MITRE ATT&CK mapping.',
  },
  {
    title: 'Security Research',
    desc: 'Peer-reviewed technical write-ups and coordinated findings.',
  },
  {
    title: 'Collaboration',
    desc: 'Shared findings, discussions, and organization-wide activity.',
  },
  {
    title: 'Role-Based Access',
    desc: 'Separate experiences for researchers, students, orgs, and admins.',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-known-bg text-known-text">
      <header className="border-b border-white/8 bg-[#0b1220]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-known-text">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#5b8cff]/30 bg-[#5b8cff]/10 text-sm font-semibold text-known-accent">
              K
            </div>
            <span className="text-base font-semibold tracking-[0.22em]">KNOWN</span>
          </div>
          <Link to="/login">
            <Button variant="secondary">Access platform</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14 lg:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-known-accent">
              Threat intelligence platform
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-known-text lg:text-7xl">
              Threat Intelligence.<br />
              Research.<br />
              Shared Security Knowledge.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-known-muted">
              A centralized platform for vulnerability intelligence, threat analysis, research
              publication, and collaborative security programs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login">
                <Button className="px-6 py-3 text-base">Launch platform</Button>
              </Link>
              <Link to="/app/intelligence">
                <Button variant="secondary" className="px-6 py-3 text-base">
                  Review intelligence
                </Button>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(17,24,39,0.96),rgba(10,15,27,0.92))] p-5 shadow-[0_24px_60px_rgba(2,6,23,0.28)]">
            <div className="flex items-center justify-between border-b border-white/8 pb-3">
              <span className="text-[10px] uppercase tracking-[0.22em] text-known-muted">Signal board</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                Live
              </span>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-known-muted">Priority findings</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-known-text">132</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-known-muted">Threat actors</p>
                  <p className="mt-2 text-xl font-semibold text-known-text">26</p>
                </div>
                <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-known-muted">Research pulse</p>
                  <p className="mt-2 text-xl font-semibold text-known-text">+18.4%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="border-t border-white/8 bg-[#0d1320]/60">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="h-full">
              <div className="mb-3 h-px w-10 bg-[#5b8cff]/60" />
              <h3 className="font-semibold tracking-[-0.03em] text-known-text">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-known-muted">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/8 py-8 text-center text-[10px] uppercase tracking-[0.2em] text-known-muted">
        KNOWN platform
      </footer>
    </div>
  )
}
