import { useState } from "react";
import {
    User,
    ChevronDown,
    UserCircle,
    LockKeyhole,
    LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex h-20 items-center justify-between border-b border-neutral-800 bg-black px-8">

            {/* Greeting */}
            <div>
                <p className="text-sm text-neutral-400">
                    Hello,
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-white">
                    Gourav Pandit 👋
                </h1>
            </div>

            {/* Profile */}
            <div className="relative">

                {/* Profile Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="group flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-neutral-900">

                    {/* Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
                        <User size={20} />
                    </div>

                    {/* Name & Role */}
                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium text-white">
                            Gourav Pandit
                        </p>

                        <p className="text-xs text-neutral-500">
                            Administrator
                        </p>
                    </div>

                    {/* Arrow */}
                    <ChevronDown
                        size={18}
                        className="text-neutral-500 transition group-hover:text-white"
                    />
                </button>
                
                {isOpen && (
                    <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl">

                        {/* User Information */}
                        <div className="border-b border-neutral-800 px-4 py-4">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white">
                                    <User size={21} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        Gourav Pandit
                                    </p>

                                    <p className="text-xs text-neutral-500">
                                        Administrator
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Menu */}
                        <div className="p-2">

                            {/* Profile */}
                            <Link to={"/profile"} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-neutral-900 hover:text-white">
                                <UserCircle size={18} />
                                <span>Profile</span>
                            </Link>

                            {/* Change Password */}
                            <Link to={"/change-password"} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-neutral-900 hover:text-white">
                                <LockKeyhole size={18} />
                                <span>Change Password</span>
                            </Link>

                            {/* Divider */}
                            <div className="my-2 border-t border-neutral-800" />

                            {/* Sign Out */}
                            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300">
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </header>
    );
};

export default Header;