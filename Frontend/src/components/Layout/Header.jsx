import { useState } from "react";
import {
    User,
    ChevronDown,
    UserCircle,
    LockKeyhole,
    LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import CompanyBrand from "./CompanyBrand";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success("Logout Successfully!");
        navigate("/login", { replace: true });
    };

    return (
        <header className="flex h-20 items-center justify-between border-b border-app-line bg-app-bg px-8">
            <div>
                <CompanyBrand />
                <p className="mt-1 text-sm text-app-muted">
                    Hello, {user?.first_name} {user?.last_name} 👋
                </p>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />

                <div className="relative">
                    <button onClick={() => setIsOpen(!isOpen)} className="group flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-app-hover">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white">
                            <User size={20} />
                        </div>

                        <div className="hidden text-left sm:block">
                            <p className="text-sm font-medium text-app-text">
                                {user?.first_name} {user?.last_name}
                            </p>

                            <p className="text-xs text-app-muted">
                                {
                                    user?.role === "admin" ? "Administrator" : "Staff"
                                }
                            </p>
                        </div>

                        <ChevronDown
                            size={18}
                            className="text-app-muted transition group-hover:text-app-text"
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-app-line bg-app-card shadow-2xl">
                            <div className="border-b border-app-line px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-white">
                                        <User size={21} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-app-text">
                                            {user?.first_name} {user?.last_name}
                                        </p>

                                        <p className="text-xs text-app-muted">
                                            {
                                                user?.role === "admin" ? "Administrator" : "Staff"
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2">
                                <button onClick={() => {
                                    setIsOpen(false);
                                    navigate("/profile");
                                }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-app-muted transition hover:bg-app-hover hover:text-app-text">
                                    <UserCircle size={18} />
                                    <span>Profile</span>
                                </button>

                                <button onClick={() => {
                                    setIsOpen(false);
                                    navigate("/change-password");
                                }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-app-muted transition hover:bg-app-hover hover:text-app-text">
                                    <LockKeyhole size={18} />
                                    <span>Change Password</span>
                                </button>

                                <div className="my-2 border-t border-app-line" />

                                <button onClick={() => handleLogout()} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300">
                                    <LogOut size={18} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
