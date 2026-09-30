import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { seedSubmissions } from '../data/submissions'
import { loadJson, saveJson } from '../utils/storage'
import type { ResearchSubmission, Severity } from '../types'

interface NewSubmissionInput {
  title: string
  category: string
  severity: Severity
  tags: string[]
  summary: string
  technicalDetails: string
  references: string
}

interface SubmissionsContextValue {
  submissions: ResearchSubmission[]
  addSubmission: (
    input: NewSubmissionInput,
    meta: {
      submittedBy: string
      submitterId: string
      submitterRole: ResearchSubmission['submitterRole']
      instituteId?: string
      organizationId?: string
    },
  ) => void
  updateStatus: (id: string, status: ResearchSubmission['status']) => void
}

const SubmissionsContext = createContext<SubmissionsContextValue | null>(null)

const KEY = 'submissions'

export function SubmissionsProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<ResearchSubmission[]>(() =>
    loadJson(KEY, seedSubmissions),
  )

  const persist = useCallback((next: ResearchSubmission[]) => {
    setSubmissions(next)
    saveJson(KEY, next)
  }, [])

  const addSubmission = useCallback(
    (
      input: NewSubmissionInput,
      meta: {
        submittedBy: string
        submitterId: string
        submitterRole: ResearchSubmission['submitterRole']
        instituteId?: string
        organizationId?: string
      },
    ) => {
      const item: ResearchSubmission = {
        id: `sub-${Date.now()}`,
        ...input,
        status: 'Pending Review',
        submittedAt: new Date().toISOString(),
        ...meta,
      }
      persist([item, ...submissions])
    },
    [persist, submissions],
  )

  const updateStatus = useCallback(
    (id: string, status: ResearchSubmission['status']) => {
      persist(
        submissions.map((s) => (s.id === id ? { ...s, status } : s)),
      )
    },
    [persist, submissions],
  )

  const value = useMemo(
    () => ({ submissions, addSubmission, updateStatus }),
    [submissions, addSubmission, updateStatus],
  )

  return (
    <SubmissionsContext.Provider value={value}>{children}</SubmissionsContext.Provider>
  )
}

export function useSubmissions(): SubmissionsContextValue {
  const ctx = useContext(SubmissionsContext)
  if (!ctx) throw new Error('useSubmissions must be used within SubmissionsProvider')
  return ctx
}
