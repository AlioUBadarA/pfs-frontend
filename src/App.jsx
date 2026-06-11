import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import VentesGroup from './pages/VentesGroup'
import CRMGroup from './pages/CRMGroup'
import PilotageGroup from './pages/PilotageGroup'
import EquipeGroup from './pages/EquipeGroup'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUserDetail from './pages/admin/AdminUserDetail'
import AdminAudit from './pages/admin/AdminAudit'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/" replace /> : children
}

function RootRedirect() {
  const { isAdmin } = useAuth()
  return isAdmin ? <Navigate to="/admin" replace /> : <Dashboard />
}

function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}

function RizierRoute({ children }) {
  const { user, isAdmin, isVendeur } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (isAdmin) return <Navigate to="/admin" replace />
  if (isVendeur) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<Navigate to="/login" replace />} />

      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index       element={<RootRedirect />} />
        <Route path="ventes"  element={<VentesGroup />} />
        <Route path="crm"     element={<CRMGroup />} />
        <Route path="pilotage" element={<PilotageGroup />} />
        <Route path="equipe"  element={<RizierRoute><EquipeGroup /></RizierRoute>} />

        {/* Redirects anciens liens */}
        <Route path="creances"    element={<Navigate to="/ventes" replace />} />
        <Route path="rentabilite" element={<Navigate to="/ventes" replace />} />
        <Route path="clients"     element={<Navigate to="/crm" replace />} />
        <Route path="prospection" element={<Navigate to="/crm" replace />} />
        <Route path="forecast"    element={<Navigate to="/pilotage" replace />} />
        <Route path="actions"     element={<Navigate to="/pilotage" replace />} />

        {/* Admin */}
        <Route path="admin"           element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="admin/users/:id" element={<AdminRoute><AdminUserDetail /></AdminRoute>} />
        <Route path="admin/audit"     element={<AdminRoute><AdminAudit /></AdminRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
