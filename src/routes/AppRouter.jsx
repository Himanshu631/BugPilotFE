import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import OnboardClient from '../pages/client/OnboardClient';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import UserDashboard from '../pages/dashboard/UserDashboard';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboard" element={<OnboardClient />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}
