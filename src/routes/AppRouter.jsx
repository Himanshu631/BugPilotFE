import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import OnboardClient from '../pages/client/OnboardClient';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ModulesPage from '../pages/modules/ModulesPage';
import BugStatsDashboard from '../components/BugStatsDashboard';
import MainLayout from '../layouts/MainLayout';


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<MainLayout><ProjectsPage /></MainLayout>} />
        <Route path="/modules" element={<MainLayout><ModulesPage /></MainLayout>} />
        <Route path="/onboard" element={<MainLayout><OnboardClient /></MainLayout>} />
        <Route path="/admin/dashboard" element={<MainLayout><AdminDashboard /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><BugStatsDashboard /></MainLayout>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
