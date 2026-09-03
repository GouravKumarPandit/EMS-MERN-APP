import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom"
import AdminDashboard from './pages/admin/AdminDashboard';
import AllStaff from './pages/admin/AllStaff';
import AllTasks from './pages/admin/AllTasks';
import Settings from './pages/admin/Settings';
import ChangePassword from './pages/admin/ChangePassword';
import Profile from './pages/admin/Profile';
import DashboardLayout from './pages/admin/DashboardLayout';
import Login from './pages/public/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminRoute from './components/Auth/AdminRoute';
import AllNotes from './pages/admin/AllNotes';
import LegalPage from './pages/admin/LegalPage';

function App() {

	return (
		<>
			<Routes>
				{/* Public Routes */}
				<Route path="/login" element={<Login />} />

				{/* Protected/Application Layout */}
				<Route element={<ProtectedRoute />}>
					<Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<AdminDashboard />} />
                        <Route path="/tasks" element={<AllTasks />} />
                        <Route path="/notes" element={<AllNotes />} />

                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/privacy" element={<LegalPage type="privacy" />} />
                        <Route path="/terms" element={<LegalPage type="terms" />} />

                        {/* Admin Only */}
                        <Route element={<AdminRoute />}>
                            <Route path="/staffs" element={<AllStaff />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>
                    </Route>
				</Route>

				{/* Unknown URL */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
			</Routes>

			<ToastContainer position="top-right" autoClose={5000} theme="dark" />
		</>
	);
}

export default App;
