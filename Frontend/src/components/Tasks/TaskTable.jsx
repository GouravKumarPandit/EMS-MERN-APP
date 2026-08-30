import {
    Eye,
    Pencil,
    Trash2,
    RefreshCw,
    CalendarDays,
    User
} from "lucide-react";
import { formatDateTime } from "../../utils/date";
import NoData from "../Ui/NoData";
import Pagination from "../Ui/Pagination";

function TaskTable({ tasks, openModal, pagination, onPageChange }) {
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-[#111111]">
                <div className="hidden grid-cols-[1.5fr_2fr_1fr_1fr_1fr_1.5fr] gap-4 border-b border-neutral-800 bg-[#151515] px-5 py-4 text-xs uppercase tracking-wide text-neutral-400 lg:grid">
                    <span>Task</span>
                    <span>Description</span>
                    <span>Priority</span>
                    <span>Status</span>
                    <span>Due Date</span>
                    <span>Actions</span>
                </div>

                {tasks.length > 0 ? (tasks.map((task) => (
                    <div
                        key={task.task_id}
                        className="grid grid-cols-1 gap-4 border-b border-neutral-800 px-5 py-5 last:border-b-0 lg:grid-cols-[1.5fr_2fr_1fr_1fr_1fr_1.5fr] lg:items-center"
                    >
                        <div>
                            <p className="font-medium text-white">
                                {task.task}
                            </p>
                            <p className="mt-1 text-xs text-neutral-400">
                                ID: {task.task_id}
                            </p>
                            {
                                task?.assigned_staff ?
                                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
                                    <User size={13} />
                                    {task?.assigned_staff?.first_name} {task?.assigned_staff?.last_name}
                                </div> :
                                <p className="mt-1 text-xs text-neutral-400">No Staff Assigned</p>
                            }
                        </div>

                        <p className="line-clamp-2 text-sm text-neutral-400">
                            {task?.task_description ? task?.task_description : "--"}
                        </p>

                        <div>
                            <span
                                className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium capitalize ${task.priority === "high"
                                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                                    : task.priority === "medium"
                                        ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                                        : task.priority === "low"
                                            ?"border-green-500/20 bg-green-500/10 text-green-400"
                                            : "border-red-500/20 bg-red-500/10 text-red-400"
                                    }`}
                            >
                                {task.priority ? task.priority : "None"}
                            </span>
                        </div>

                        <div>
                            <span
                                className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium capitalize ${task.status === "pending"
                                    ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                                    : task.status === "accepted"
                                        ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                                        : task.status === "completed"
                                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                                            : "border-red-500/20 bg-red-500/10 text-red-400"
                                    }`}
                            >
                                {task.status ? task.status : "None"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <CalendarDays size={15} />
                            {task.due_date ? formatDateTime(task.due_date) : "--"}
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => openModal("view", task)}
                                title="View"
                                className="rounded-lg p-2 text-neutral-400 transition hover:bg-blue-500/10 hover:text-blue-400"
                            >
                                <Eye size={17} />
                            </button>

                            <button
                                onClick={() => openModal("edit", task)}
                                title="Edit"
                                className="rounded-lg p-2 text-neutral-400 transition hover:bg-yellow-500/10 hover:text-yellow-400"
                            >
                                <Pencil size={17} />
                            </button>

                            <button
                                onClick={() => openModal("status", task)}
                                title="Change Status"
                                className="rounded-lg p-2 text-neutral-400 transition hover:bg-green-500/10 hover:text-green-400"
                            >
                                <RefreshCw size={17} />
                            </button>

                            <button
                                onClick={() => openModal("delete", task)}
                                title="Delete"
                                className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-500/10 hover:text-red-400"
                            >
                                <Trash2 size={17} />
                            </button>
                        </div>
                    </div>
                ))) : <NoData message={"No Task Found!"} />}
            </div>
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={onPageChange} />
        </>
    )
}

export default TaskTable;