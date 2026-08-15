import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Sidebar />
            <div className="ml-64 min-h-screen">
                <Header />
                <main className="p-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;