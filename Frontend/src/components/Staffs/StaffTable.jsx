import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import Pagination from "../Ui/Pagination";
import IconButton from "../Ui/IconButton";
import StaffFilters from "./StaffFilters";
import { useEffect, useState } from "react";
import { getAllStaff } from "../../api/staff";
import { toast } from "react-toastify";
import useDebounce from "../../utils/useDebounce";

const StaffTable = ({ modal, openModal }) => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [staffs, setStaffs] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 10
    });
    const debouncedSearch = useDebounce(search);
    const handlePageChange = (page) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };
    const getFullName = (staff) => {
        return `${staff.first_name} ${staff.last_name}`;
    };

    useEffect(() => {
        const loadStaff = async () => {
            try {
                const response = await getAllStaff(debouncedSearch, role, gender, pagination.currentPage, pagination.limit);

                if (response.data.success) {
                    const { staffs, pagination: paginationData } =
                        response.data.data;

                    setStaffs(staffs);
                    setPagination(paginationData);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        loadStaff();
    }, [modal, debouncedSearch, role, gender, pagination.currentPage, pagination.limit])

    return (
        <>
            <StaffFilters search={search} setSearch={setSearch} role={role} setRole={setRole} gender={gender} setGender={setGender} />
            <div className="overflow-hidden rounded-xl border border-app-line bg-app-card">
                <div className="border-b border-app-line px-5 py-4">
                    <h2 className="font-semibold text-lg">
                        Staff List
                    </h2>
                    <p className="text-sm text-app-subtle mt-1">
                        Manage all staff members
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] text-left">
                        <thead className="bg-app-soft text-xs uppercase tracking-wider text-app-subtle">
                            <tr>
                                <th className="px-5 py-4">Staff</th>
                                <th className="px-5 py-4">Email</th>
                                <th className="px-5 py-4">Phone</th>
                                <th className="px-5 py-4">Gender</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-app-line">
                            {staffs?.length ? staffs.map((staff) => (
                                <tr
                                    key={staff._id}
                                    className="hover:bg-app-hover transition"
                                >
                                    {/* Staff */}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-bold text-violet-400">
                                                {staff.first_name.charAt(0)}
                                                {staff.last_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {getFullName(staff)}
                                                </p>
                                                <p className="text-xs text-app-subtle">
                                                    @{staff.username}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-app-muted">
                                        {staff.email}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-app-muted">
                                        +{staff.dialcode} {staff.phone_number}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className="capitalize text-sm text-app-muted">
                                            {staff.gender}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                staff.role === "admin"
                                                    ? "bg-violet-500/15 text-violet-400"
                                                    : "bg-blue-500/15 text-blue-400"
                                            }`}
                                        >
                                            {staff.role}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <IconButton label={<Eye size={17} />} onClick={() => openModal("view", staff)} title="View" />
                                            <IconButton label={<Pencil size={17} />} onClick={() => openModal("edit", staff)} title="Edit" />
                                            <IconButton label={<Trash2 size={17} />} onClick={() => openModal("delete", staff)} title="Delete" />
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr
                                    className="hover:bg-app-hover transition"
                                >
                                    <td colSpan="6" className="px-5 py-4 text-sm text-app-muted text-center">
                                        No staff found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="pb-4 px-4">
                    <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </>
    );
};

export default StaffTable;