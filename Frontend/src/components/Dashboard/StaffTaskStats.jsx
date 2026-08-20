const StaffTaskStats = () => {
    const staffStats = [
        {
            id: 1,
            first_name: "Gourav",
            last_name: "Pandit",
            pending: 4,
            accepted: 2,
            completed: 8,
            failed: 1,
        },
        {
            id: 2,
            first_name: "Rahul",
            last_name: "Kumar",
            pending: 3,
            accepted: 5,
            completed: 6,
            failed: 0,
        },
        {
            id: 3,
            first_name: "Amit",
            last_name: "Sharma",
            pending: 1,
            accepted: 4,
            completed: 10,
            failed: 2,
        },
        {
            id: 4,
            first_name: "Priya",
            last_name: "Singh",
            pending: 5,
            accepted: 1,
            completed: 7,
            failed: 1,
        },
        {
            id: 5,
            first_name: "Ankit",
            last_name: "Verma",
            pending: 2,
            accepted: 3,
            completed: 5,
            failed: 0,
        },
    ];

    return (
        <div className="mt-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">
                    Staff Task Statistics
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Task performance overview for each staff member
                </p>
            </div>

            <div className="bg-[#111111] border border-neutral-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px] text-sm">
                        <thead className="bg-[#181818] border-b border-neutral-800">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium text-gray-400">Staff Name</th>
                                <th className="px-6 py-4 text-center font-medium text-gray-400">Pending</th>
                                <th className="px-6 py-4 text-center font-medium text-gray-400">Accepted</th>
                                <th className="px-6 py-4 text-center font-medium text-gray-400">Completed</th>
                                <th className="px-6 py-4 text-center font-medium text-gray-400">Failed</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-800">
                            {staffStats.map((staff) => (
                                <tr
                                    key={staff.id}
                                    className="hover:bg-[#181818] transition"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-semibold">
                                                {staff.first_name.charAt(0)}
                                                {staff.last_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">
                                                    {staff.first_name}{" "}
                                                    {staff.last_name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Staff
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex min-w-[35px] justify-center px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-medium">
                                            {staff.pending}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex min-w-[35px] justify-center px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                                            {staff.accepted}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex min-w-[35px] justify-center px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                                            {staff.completed}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex min-w-[35px] justify-center px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                                            {staff.failed}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffTaskStats;