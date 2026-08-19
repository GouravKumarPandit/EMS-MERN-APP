import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom"
import AdminDashboard from './pages/admin/AdminDashboard';
import AllStaff from './pages/admin/AllStaff';
import AllTasks from './pages/admin/AllTasks';
import Settings from './pages/admin/Settings';
import ChangePassword from './pages/admin/ChangePassword';
import Profile from './pages/admin/Profile';
import DashboardLayout from './pages/admin/DashboardLayout';
import Login from './pages/public/Login';

function App() {

	return (
		<>
			<Routes>
				{/* Public Routes */}
				<Route
					path="/login"
					element={<Login />}
				/>

				{/* Protected/Application Layout */}
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<AdminDashboard />} />
					<Route path="/tasks" element={<AllTasks />} />
					<Route path="/staffs" element={<AllStaff />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/change-password" element={<ChangePassword />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>

			<ToastContainer position="top-right" autoClose={5000} theme="dark" />
		</>
	);
}

export default App;
