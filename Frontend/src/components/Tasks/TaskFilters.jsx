import {
	Search,
	Filter,
	ChevronDown,
} from "lucide-react";

function TaskFilters() {
    return (
        <div className="mb-6 rounded-xl border border-neutral-800 bg-[#111111] p-4">
            <div className="mb-4 flex items-center gap-2">
                <Filter
                    size={18}
                    className="text-neutral-400"
                />
                <h2 className="text-sm font-medium">
                    Filter Tasks
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                        type="text"
                        placeholder="Search task..."
                        className="h-10 w-full rounded-lg border border-neutral-800 bg-black pl-10 pr-3 text-sm text-white outline-none placeholder:text-neutral-400 focus:border-violet-500"
                    />
                </div>

                <div className="relative">
                    <select
                        className="h-10 w-full appearance-none rounded-lg border border-neutral-800 bg-black px-3 text-sm text-neutral-400 outline-none focus:border-violet-500"
                    >
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Accepted</option>
                        <option>Completed</option>
                        <option>Failed</option>
                    </select>

                    <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                </div>

                <div className="relative">
                    <select
                        className="h-10 w-full appearance-none rounded-lg border border-neutral-800 bg-black px-3 text-sm text-neutral-400 outline-none focus:border-violet-500"
                    >
                        <option>All Priority</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                </div>

                <div className="relative">
                    <select
                        className="h-10 w-full appearance-none rounded-lg border border-neutral-800 bg-black px-3 text-sm text-neutral-400 outline-none focus:border-violet-500"
                    >
                        <option>All Staff</option>
                        <option>Gourav Pandit</option>
                        <option>Rahul Sharma</option>
                        <option>Amit Kumar</option>
                        <option>Priya Singh</option>
                    </select>

                    <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskFilters