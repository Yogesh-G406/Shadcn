import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { UserDashboard } from './pages/UserDashboard'
import { ManagerDashboard } from './pages/ManagerDashboard'
import { AdminDashboard } from './pages/AdminDashboard'
import { AccessRequestForm } from './pages/AccessRequestForm'
import { RequestStatusTracking } from './pages/RequestStatusTracking'
import { UserManagement } from './pages/UserManagement'
import { AuditLogViewer } from './pages/AuditLogViewer'
import { ReportsDashboard } from './pages/ReportsDashboard'
import { SystemSettings } from './pages/SystemSettings'
import { PermissionsManagement } from './pages/PermissionsManagement'
import { RolesManagement } from './pages/RolesManagement'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="manager" element={<ManagerDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="access-request" element={<AccessRequestForm />} />
        <Route path="requests" element={<RequestStatusTracking />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="roles" element={<RolesManagement />} />
        <Route path="permissions" element={<PermissionsManagement />} />
        <Route path="audit" element={<AuditLogViewer />} />
        <Route path="reports" element={<ReportsDashboard />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>
    </Routes>
  )
}

export default App
