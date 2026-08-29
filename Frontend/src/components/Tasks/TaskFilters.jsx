import { Filter } from "lucide-react";
import Select from "../Ui/Select";
import { useAuth } from "../../context/AuthContext";
import Input from "../Ui/Input";

function TaskFilters({ filters, filterInputHandler, staffs }) {
    const { user } = useAuth();

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
                <Input
                    label="Search Task"
                    type="text"
                    placeholder="Search task..."
                    className="h-10 w-full rounded-lg border border-neutral-800 bg-black pl-4 pr-3 text-sm text-white outline-none placeholder:text-neutral-400 focus:border-violet-500"
                    name="search"
                    value={filters.search}
                    onChange={filterInputHandler}
                />

                <Select
                    label="Status"
                    name="status"
                    options={[
                        { label: "Pending", value: "pending" },
                        { label: "Accepted", value: "accepted" },
                        { label: "Completed", value: "completed" },
                        { label: "Failed", value: "failed" }
                    ]}
                    value={filters.status}
                    onChange={filterInputHandler}
                />

                <Select
                    label="Priority"
                    name="priority"
                    value={filters.priority}
                    onChange={filterInputHandler}
                    options={[
                        { label: "Low", value: "low" },
                        { label: "Medium", value: "medium" },
                        { label: "High", value: "high" }
                    ]}
                />

                <Select
                    label="Assign Staff"
                    name="staff"
                    options={
                        staffs.map((staff) => ({ label: `${staff.first_name} ${staff.last_name} ${staff._id === user._id ? "(Me)" : ""}`, value: staff._id }))
                    }
                    value={filters.staff}
                    onChange={filterInputHandler}
                />
            </div>
        </div>
    )
}

export default TaskFilters