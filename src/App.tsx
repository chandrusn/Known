import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { AdminLayout } from './components/layout/AdminLayout'
import { AuthProvider } from './contexts/AuthContext'
import { SubmissionsProvider } from './contexts/SubmissionsContext'
import { CollaborationPage } from './pages/CollaborationPage'
import { DashboardPage } from './pages/DashboardPage'
import { AdminAnalyticsPage, AdminInstitutesPage, AdminModerationPage, AdminOrganizationsPage, AdminOverviewPage, AdminResearchPage, AdminThreatReportsPage, AdminUsersPage, AdminVulnerabilitiesPage, InstitutePage, OrganizationPage, SubmissionsPage, WorkspacePage } from './pages/ExtendedPages'
import { IntelligencePage } from './pages/IntelligencePage'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { ProgramDetailPage } from './pages/ProgramDetailPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { ResearchDetailPage } from './pages/ResearchDetailPage'
import { ResearchPage } from './pages/ResearchPage'
import { ThreatDetailPage } from './pages/ThreatDetailPage'
import { ThreatsPage } from './pages/ThreatsPage'
import { VulnerabilityDetailPage } from './pages/VulnerabilityDetailPage'

export default function App() {
  return (
    <AuthProvider>
      <SubmissionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="intelligence" element={<IntelligencePage />} />
              <Route path="intelligence/:cveId" element={<VulnerabilityDetailPage />} />
              <Route path="threats" element={<ThreatsPage />} />
              <Route path="threats/:id" element={<ThreatDetailPage />} />
              <Route path="research" element={<ResearchPage />} />
              <Route path="research/:id" element={<ResearchDetailPage />} />
              <Route path="programs" element={<ProgramsPage />} />
              <Route path="programs/:id" element={<ProgramDetailPage />} />
              <Route path="collaboration" element={<CollaborationPage />} />
              <Route path="workspace" element={<WorkspacePage />} />
              <Route path="institute" element={<InstitutePage />} />
              <Route path="organization" element={<OrganizationPage />} />
              <Route path="submissions" element={<SubmissionsPage />} />
              <Route path="submissions/new" element={<SubmissionsPage />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AdminOverviewPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="organizations" element={<AdminOrganizationsPage />} />
              <Route path="institutes" element={<AdminInstitutesPage />} />
              <Route path="research" element={<AdminResearchPage />} />
              <Route path="threats" element={<AdminThreatReportsPage />} />
              <Route path="vulnerabilities" element={<AdminVulnerabilitiesPage />} />
              <Route path="moderation" element={<AdminModerationPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SubmissionsProvider>
    </AuthProvider>
  )
}
