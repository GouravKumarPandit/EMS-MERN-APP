import {
    Home,
    ClipboardList,
    Users,
    Settings
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const currentURI = useLocation();

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-neutral-800 bg-black px-4 py-6">

            {/* Logo / Brand */}
            <div className="mb-10 px-3">
                <h1 className="text-2xl font-bold text-white">
                    MY COMPANY
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-2">
                {/* Home */}
                <Link to={"/"}
                    className={`flex items-center gap-3 rounded-lg ${currentURI.pathname === "/" ? "bg-red-500" : "" } px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600`}
                >
                    <Home size={20} />
                    <span>Home</span>
                </Link>

                {/* My All Tasks */}
                <Link to={"/tasks"}
                    className={`flex items-center gap-3 rounded-lg ${currentURI.pathname === "/tasks" ? "bg-red-500" : "" } px-4 py-3 text-sm font-medium text-neutral-400 transition hover:bg-red-600 hover:text-white`}
                >
                    <ClipboardList size={20} />
                    <span>All Tasks</span>
                </Link>

                {/* Staffs */}
                <Link to={"/staffs"}
                    className={`flex items-center gap-3 rounded-lg px-4 ${currentURI.pathname === "/staffs" ? "bg-red-500" : "" } py-3 text-sm font-medium text-neutral-400 transition hover:bg-red-600 hover:text-white`}
                >
                    <Users size={20} />
                    <span>Staffs</span>
                </Link>

                {/* Settings */}
                <Link to={"/settings"}
                    className={`flex items-center gap-3 rounded-lg px-4 ${currentURI.pathname === "/settings" ? "bg-red-500" : "" } py-3 text-sm font-medium text-neutral-400 transition hover:bg-red-600 hover:text-white`}
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-neutral-800 pt-4">
                <p className="px-3 text-xs text-neutral-600">
                    EMS Dashboard
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;