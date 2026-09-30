export type UserRole =
  | 'researcher'
  | 'student'
  | 'organization'
  | 'user'
  | 'admin'

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low'

export type ExploitationStatus =
  | 'Active Exploitation'
  | 'PoC Available'
  | 'Unverified'
  | 'Not Observed'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId?: string
  instituteId?: string
  title?: string
}

export interface Vulnerability {
  id: string
  cveId: string
  title: string
  severity: Severity
  cvssScore: number
  cvssVector: string
  category: string
  affectedProduct: string
  affectedVersion: string
  publishedDate: string
  updatedDate: string
  exploitationStatus: ExploitationStatus
  summary: string
  technicalDescription: string
  affectedProducts: string[]
  affectedVersions: string[]
  attackVector: string
  technologies: string[]
  references: { label: string; url: string }[]
  relatedResearchIds: string[]
  relatedThreatIds: string[]
  relatedProgramIds: string[]
}

export interface ThreatReport {
  id: string
  title: string
  threatActor: string
  severity: Severity
  publicationDate: string
  affectedSectors: string[]
  tactics: string[]
  techniques: string[]
  indicators: string[]
  summary: string
  technicalAnalysis: string
  references: { label: string; url: string }[]
  mitreMapping: {
    initialAccess: string[]
    execution: string[]
    persistence: string[]
    credentialAccess: string[]
    defenseEvasion: string[]
    impact: string[]
  }
  relatedVulnerabilityIds: string[]
}

export interface ResearchArticle {
  id: string
  title: string
  author: string
  authorId: string
  date: string
  category: string
  severity: Severity
  tags: string[]
  summary: string
  technicalDetails: string
  findings: string
  recommendations: string
  references: { label: string; url: string }[]
  relatedCveIds: string[]
  relatedThreatIds: string[]
}

export type SubmissionStatus = 'Pending Review' | 'Approved' | 'Rejected'

export interface ResearchSubmission {
  id: string
  title: string
  category: string
  severity: Severity
  tags: string[]
  summary: string
  technicalDetails: string
  references: string
  status: SubmissionStatus
  submittedBy: string
  submitterId: string
  submitterRole: UserRole
  instituteId?: string
  organizationId?: string
  submittedAt: string
}

export interface SecurityProgram {
  id: string
  name: string
  organization: string
  organizationId: string
  scope: string
  severityPolicy: string
  submissionStatus: string
  rewardInfo: string
  active: boolean
  description: string
  relatedCveIds: string[]
}

export interface Institute {
  id: string
  name: string
  location: string
  focus: string
  resources: { title: string; type: string; url: string }[]
  repository: { title: string; description: string; date: string }[]
  assignments: { title: string; due: string; status: string }[]
}

export interface Organization {
  id: string
  name: string
  industry: string
  members: { name: string; role: string }[]
  programs: string[]
}

export interface ActivityItem {
  id: string
  type:
    | 'research_submitted'
    | 'threat_published'
    | 'program_updated'
    | 'finding_shared'
    | 'discussion_created'
    | 'research_approved'
  actor: string
  actorRole: string
  message: string
  timestamp: string
  organizationId?: string
  instituteId?: string
  link?: string
}

export interface CollaborationFinding {
  id: string
  title: string
  author: string
  severity: Severity
  sharedAt: string
  summary: string
}

export interface Discussion {
  id: string
  title: string
  author: string
  replies: number
  lastActivity: string
  preview: string
}

export interface DemoAccount {
  email: string
  password: string
  user: User
}
