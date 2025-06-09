import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import OnboardClient from '../pages/client/OnboardClient';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import BugStatsDashboard from '../components/BugStatsDashboard';
import PrivateRoute from '../components/PrivateRoute';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboard" element={<OnboardClient />} />

        <Route path="/admin/dashboard" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />
        
        <Route path="/dashboard" element={
          <PrivateRoute><BugStatsDashboard /></PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}
