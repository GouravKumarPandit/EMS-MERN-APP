const staffStatsStats = ({ staffStats }) => {

    return (
        <div className="mt-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-app-text">
                    Staff Task Statistics
                </h2>

                <p className="text-sm text-app-subtle mt-1">
                    Task performance overview for each staff member
                </p>
            </div>

            <div className="bg-app-card border border-app-line rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px] text-sm">
                        <thead className="bg-app-soft border-b border-app-line">
                            <tr>
                                <th className="px-6 py-4 text-left font-medium text-app-muted">Staff Name</th>
                                <th className="px-6 py-4 text-center font-medium text-app-muted">Pending</th>
                                <th className="px-6 py-4 text-center font-medium text-app-muted">Accepted</th>
                                <th className="px-6 py-4 text-center font-medium text-app-muted">Completed</th>
                                <th className="px-6 py-4 text-center font-medium text-app-muted">Failed</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-app-line">
                            {staffStats.map((staff) => (
                                <tr
                                    key={staff._id || staff.staff_id}
                                    className="hover:bg-app-soft transition"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-semibold">
                                                {staff.first_name.charAt(0)}
                                                {staff.last_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-app-text">
                                                    {staff.first_name}{" "}
                                                    {staff.last_name}
                                                </p>
                                                <p className="text-xs text-app-subtle">
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

export default staffStatsStats;