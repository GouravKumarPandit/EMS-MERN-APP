import {
    Home,
    ClipboardList,
    Users,
    Settings
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const sidebarOptions = [
    {
        id: "1",
        link: "/dashboard",
        label: "Dashboard",
        icon: <Home size={20} />
    },
    {
        id: "2",
        link: "/tasks",
        label: "All Tasks",
        icon: <ClipboardList size={20} />
    },
    {
        id: "3",
        link: "/staffs",
        label: "Staffs",
        icon: <Users size={20} />
    },
    {
        id: "4",
        link: "/settings",
        label: "Settings",
        icon: <Settings size={20} />
    }
]

const Sidebar = () => {
    const currentURI = useLocation();

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-neutral-800 bg-black px-4 py-6">
            <div className="mb-10 px-3">
                <h1 className="text-2xl font-bold text-white">
                    MY COMPANY
                </h1>
            </div>

            <nav className="flex flex-1 flex-col gap-2">
                {
                    sidebarOptions.map((sidebar) => (
                        <Link to={sidebar.link} key={sidebar.id}
                            className={`flex items-center gap-3 rounded-lg ${currentURI.pathname === sidebar.link ? "bg-violet-600" : "" } px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-700`}
                        >
                            {sidebar.icon}
                            <span>{sidebar.label}</span>
                        </Link>
                    ))
                }
            </nav>

            <div className="border-t border-neutral-800 pt-4">
                <p className="px-3 text-xs text-neutral-400">
                    EMS Dashboard
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;