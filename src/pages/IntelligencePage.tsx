import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { vulnerabilities } from '../data/vulnerabilities'
import type { Severity } from '../types'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Input, Select } from '../components/ui/Input'
import { SeverityBadge } from '../components/ui/Badge'

const severities: Severity[] = ['Critical', 'High', 'Medium', 'Low']

export function IntelligencePage() {
  const [params, setParams] = useSearchParams()
  const qParam = params.get('q') ?? ''
  const [search, setSearch] = useState(qParam)
  const [severity, setSeverity] = useState<string>('all')
  const [category, setCategory] = useState<string>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [sort, setSort] = useState('cvss-desc')

  const categories = useMemo(
    () => [...new Set(vulnerabilities.map((v) => v.category))].sort(),
    [],
  )

  const filtered = useMemo(() => {
    let list = [...vulnerabilities]
    const q = (search || qParam).trim().toLowerCase()
    if (q) {
      list = list.filter(
        (v) =>
          v.cveId.toLowerCase().includes(q) ||
          v.title.toLowerCase().includes(q) ||
          v.affectedProduct.toLowerCase().includes(q),
      )
    }
    if (severity !== 'all') list = list.filter((v) => v.severity === severity)
    if (category !== 'all') list = list.filter((v) => v.category === category)
    if (dateFrom) list = list.filter((v) => v.publishedDate >= dateFrom)
    if (sort === 'cvss-desc') list.sort((a, b) => b.cvssScore - a.cvssScore)
    if (sort === 'date-desc') list.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    if (sort === 'date-asc') list.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate))
    return list
  }, [search, qParam, severity, category, dateFrom, sort])

  const topCritical = vulnerabilities.filter((v) => v.severity === 'Critical').slice(0, 3)

  const applySearch = () => {
    if (search) setParams({ q: search })
    else setParams({})
  }

  return (
    <div>
      <PageHeader
        title="Intelligence Overview"
        description="Operational visibility across active vulnerabilities, exploitation activity, and intelligence updates."
      />

      <div className="mb-6 grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <Card className="overflow-hidden">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-known-border pb-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-known-muted">Critical vulnerabilities</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-known-text">Priority exposure stack</h2>
            </div>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-red-300">
              {topCritical.length} active
            </span>
          </div>
          <div className="space-y-3">
            {topCritical.map((v) => (
              <div key={v.id} className="flex items-start justify-between gap-4 rounded-lg border border-known-border bg-known-bg/40 p-3">
                <div>
                  <Link to={`/app/intelligence/${v.cveId}`} className="text-sm font-medium text-known-text hover:text-known-accent">
                    {v.cveId}
                  </Link>
                  <p className="mt-1 text-xs text-known-muted line-clamp-2">{v.title}</p>
                </div>
                <div className="text-right">
                  <SeverityBadge severity={v.severity} />
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-known-muted">CVSS {v.cvssScore.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-[10px] uppercase tracking-[0.24em] text-known-muted">Trend signal</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-known-text">Trending exploitation activity</h2>
          <div className="mt-4 space-y-4">
            {['Citrix Bleed', 'MOVEit exploitation', 'PAN-OS edge devices'].map((item, index) => (
              <div key={item} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-known-text">{item}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-known-muted">#{index + 1}</span>
                </div>
                <p className="mt-2 text-xs text-known-muted">
                  {index === 0 ? 'High-confidence session hijack activity' : index === 1 ? 'Ransomware-linked exploitation cluster' : 'Perimeter appliance compromise pattern'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="grid gap-4 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label className="mb-1 block text-xs text-known-muted">Search</label>
            <div className="flex gap-2">
              <Input
                placeholder="CVE ID, product, keyword…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applySearch()}
              />
              <button
                type="button"
                onClick={applySearch}
                className="rounded-md border border-known-border bg-known-bg px-3 text-known-muted hover:text-known-text"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-known-muted">Severity</label>
            <Select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="all">All</option>
              {severities.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-known-muted">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-known-muted">Published after</label>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-known-muted">Sort</label>
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="cvss-desc">CVSS (high to low)</option>
              <option value="date-desc">Date (newest)</option>
              <option value="date-asc">Date (oldest)</option>
            </Select>
          </div>
        </div>
        <p className="mt-4 text-xs text-known-muted">{filtered.length} intelligence entries</p>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(17,24,39,0.96),rgba(10,15,27,0.92))] shadow-[0_24px_60px_rgba(2,6,23,0.18)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-known-muted">
              <tr>
                <th className="px-4 py-3 font-medium">CVE</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">CVSS</th>
                <th className="px-4 py-3 font-medium">Published</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 bg-transparent">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <Link to={`/app/intelligence/${v.cveId}`} className="font-medium text-known-accent hover:underline">
                      {v.cveId}
                    </Link>
                  </td>
                  <td className="max-w-md truncate px-4 py-3 text-known-text">{v.title}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={v.severity} /></td>
                  <td className="px-4 py-3 font-mono text-known-text">{v.cvssScore.toFixed(1)}</td>
                  <td className="px-4 py-3 text-known-muted">{v.publishedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Card>
          <p className="text-[10px] uppercase tracking-[0.24em] text-known-muted">Selected vulnerability</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-known-text">{filtered[0]?.cveId ?? 'No result'}</h3>
          <p className="mt-2 text-sm text-known-muted">{filtered[0]?.title ?? 'Adjust filters to see intelligence.'}</p>
          <div className="mt-4 space-y-3 text-sm text-known-muted">
            <div className="flex items-center justify-between border-b border-white/8 pb-2">
              <span>Severity</span>
              <span>{filtered[0]?.severity ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/8 pb-2">
              <span>Product</span>
              <span>{filtered[0]?.affectedProduct ?? '—'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/8 pb-2">
              <span>Exploitation</span>
              <span>{filtered[0]?.exploitationStatus ?? '—'}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
