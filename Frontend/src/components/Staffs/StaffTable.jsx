import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

const StaffTable = ({ openModal }) => {
    // Dummy data
    const staffs = [
        {
            _id: "1",
            first_name: "Gourav",
            last_name: "Pandit",
            username: "gourav123",
            email: "gourav@example.com",
            dialcode: 91,
            phone_number: 9876543210,
            gender: "male",
            dob: "1998-05-15",
            role: "admin",
            createdAt: "2026-08-10",
        },
        {
            _id: "2",
            first_name: "Rahul",
            last_name: "Kumar",
            username: "rahul123",
            email: "rahul@example.com",
            dialcode: 91,
            phone_number: 9876543211,
            gender: "male",
            dob: "1997-08-20",
            role: "staff",
            createdAt: "2026-08-11",
        },
        {
            _id: "3",
            first_name: "Priya",
            last_name: "Sharma",
            username: "priya123",
            email: "priya@example.com",
            dialcode: 91,
            phone_number: 9876543212,
            gender: "female",
            dob: "1999-02-12",
            role: "staff",
            createdAt: "2026-08-12",
        },
        {
            _id: "4",
            first_name: "Amit",
            last_name: "Singh",
            username: "amit123",
            email: "amit@example.com",
            dialcode: 91,
            phone_number: 9876543213,
            gender: "male",
            dob: "1996-11-03",
            role: "staff",
            createdAt: "2026-08-13",
        },
    ];

    const getFullName = (staff) => {
        return `${staff.first_name} ${staff.last_name}`;
    };

    return (
        <div className="overflow-hidden rounded-xl border border-[#252525] bg-[#111111]">
            <div className="border-b border-[#252525] px-5 py-4">
                <h2 className="font-semibold text-lg">
                    Staff List
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Manage all staff members
                </p>
            </div>

            {/* Horizontal Scroll */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                    <thead className="bg-[#171717] text-xs uppercase tracking-wider text-gray-500">
                        <tr>
                            <th className="px-5 py-4">Staff</th>
                            <th className="px-5 py-4">Username</th>
                            <th className="px-5 py-4">Email</th>
                            <th className="px-5 py-4">Phone</th>
                            <th className="px-5 py-4">Gender</th>
                            <th className="px-5 py-4">Role</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#252525]">
                        {staffs.map((staff) => (
                            <tr
                                key={staff._id}
                                className="hover:bg-[#171717] transition"
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

                                            <p className="text-xs text-gray-500">
                                                {staff.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Username */}
                                <td className="px-5 py-4 text-sm text-gray-300">
                                    @{staff.username}
                                </td>

                                {/* Email */}
                                <td className="px-5 py-4 text-sm text-gray-400">
                                    {staff.email}
                                </td>

                                {/* Phone */}
                                <td className="px-5 py-4 text-sm text-gray-400">
                                    +{staff.dialcode} {staff.phone_number}
                                </td>

                                {/* Gender */}
                                <td className="px-5 py-4">

                                    <span className="capitalize text-sm text-gray-300">
                                        {staff.gender}
                                    </span>

                                </td>

                                {/* Role */}
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

                                {/* Actions */}
                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-2">
                                        {/* View */}
                                        <button
                                            onClick={() =>
                                                openModal("view", staff)
                                            }
                                            title="View"
                                            className="rounded-lg border border-[#303030] p-2 text-gray-400 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 transition"
                                        >
                                            <Eye size={17} />
                                        </button>

                                        {/* Edit */}
                                        <button
                                            onClick={() =>
                                                openModal("edit", staff)
                                            }
                                            title="Edit"
                                            className="rounded-lg border border-[#303030] p-2 text-gray-400 hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 transition"
                                        >
                                            <Pencil size={17} />
                                        </button>

                                        {/* Delete */}
                                        <button
                                            onClick={() =>
                                                openModal("delete", staff)
                                            }
                                            title="Delete"
                                            className="rounded-lg border border-[#303030] p-2 text-gray-400 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 transition"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffTable;