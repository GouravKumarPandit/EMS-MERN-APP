import {
    Home,
    ClipboardList,
    Users,
    Settings,
    StickyNote
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CompanyBrand from "./CompanyBrand";

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
        icon: <Users size={20} />,
        adminOnly: true
    },
    {
        id: "4",
        link: "/notes",
        label: "Your Notes",
        icon: <StickyNote size={20} />
    },
    {
        id: "5",
        link: "/settings",
        label: "Settings",
        icon: <Settings size={20} />,
        adminOnly: true
    }
]

const Sidebar = () => {
    const currentURI = useLocation();
    const { isAdmin } = useAuth();
    const visibleOptions = sidebarOptions.filter((item) => !item.adminOnly || isAdmin);

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-app-line bg-app-bg px-4 py-6">
            <div className="mb-10 px-3">
                <CompanyBrand textClass="text-2xl font-bold text-app-text break-words" imgClass="h-12 max-h-14 max-w-full object-contain object-left" />
            </div>

            <nav className="flex flex-1 flex-col gap-2">
                {
                    visibleOptions.map((sidebar) => (
                        <Link to={sidebar.link} key={sidebar.id}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                currentURI.pathname === sidebar.link
                                    ? "bg-violet-600 text-white hover:bg-violet-700"
                                    : "text-app-text hover:bg-violet-700 hover:text-white"
                            }`}
                        >
                            {sidebar.icon}
                            <span>{sidebar.label}</span>
                        </Link>
                    ))
                }
            </nav>

            <div className="border-t border-app-line pt-4">
                <p className="px-3 text-xs text-app-muted">
                    EMS Dashboard
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
