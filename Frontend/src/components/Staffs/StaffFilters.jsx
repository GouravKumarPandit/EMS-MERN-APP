import { Search, SlidersHorizontal } from "lucide-react";

const StaffFilters = ({ search, setSearch, role, setRole, gender, setGender }) => {
    return (
        <div className="mb-5 rounded-xl border border-[#252525] bg-[#111111] p-4">
            <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                        type="text"
                        placeholder="Search staff by Name, Email or Username..."
                        className="w-full rounded-lg border border-[#303030] bg-[#191919] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="relative md:w-52">
                    <SlidersHorizontal
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-[#303030] bg-[#191919] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-violet-500"
                    >
                        <option value="">Select Roles</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>

                <div className="relative md:w-52">
                    <SlidersHorizontal
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />

                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full appearance-none rounded-lg border border-[#303030] bg-[#191919] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-violet-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StaffFilters;