import {
	X,
	CalendarDays,
	User,
	Clock3
} from "lucide-react";
import { formatDateTime } from "../../utils/date";
import NoData from "../Ui/NoData";
import TaskComment from "./TaskComment";
import TaskHistory from "./TaskHistory";
import Status from "../Ui/Status";
import Priority from "../Ui/Priority";

function ViewTaskModel({ modal, selectedTask, closeModal }) {

    return (
        <>
            {modal === "view" && selectedTask && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
					<div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl">
						<div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
							<div>
								<p className="text-xs text-neutral-400">
									{selectedTask?.task?.task_id}
								</p>
								<h2 className="mt-1 font-semibold">
									{selectedTask?.task?.task}
								</h2>
							</div>
							<button
								onClick={closeModal}
								className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white"
							>
								<X size={18} />
							</button>
						</div>

						<div className="max-h-[75vh] overflow-y-auto p-6">
							<div className="mb-5 flex gap-2">
								{
									(selectedTask?.task?.priority) ? 
									<Priority priority={selectedTask.task.priority} /> : 
									"None priority"
								}
								{
									(selectedTask?.task?.status) ? 
									<Status status={selectedTask.task.status} /> : 
									"None"
								}
							</div>

							<div className="mb-6">
								<p className="mb-2 text-xs uppercase tracking-wide text-neutral-400">
									Description
								</p>
								<p className="text-sm leading-6 text-neutral-400">
									{selectedTask?.task?.task_description ? selectedTask?.task?.task_description : "--"}
								</p>
							</div>

							<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
								<div className="rounded-lg border border-neutral-800 bg-black p-4">
									<CalendarDays
										size={18}
										className="mb-2 text-violet-400"
									/>
									<p className="text-xs text-neutral-400">
										Due Date
									</p>
									<p className="mt-1 text-sm">
										{selectedTask?.task?.due_date ? formatDateTime(selectedTask.task.due_date) : "--"}
									</p>
								</div>

								<div className="rounded-lg border border-neutral-800 bg-black p-4">
									<User
										size={18}
										className="mb-2 text-blue-400"
									/>
									<p className="text-xs text-neutral-400">
										Assigned Staff
									</p>
									<p className="mt-1 text-sm">
										{
											selectedTask?.task?.assigned_staff ?
											<span className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
												<User size={13} />
												{selectedTask?.task?.assigned_staff?.first_name} {selectedTask?.task?.assigned_staff?.last_name}
											</span> :
											<span className="mt-1 text-xs">--</span>
										}
									</p>
								</div>

								<div className="rounded-lg border border-neutral-800 bg-black p-4">
									<Clock3
										size={18}
										className="mb-2 text-green-400"
									/>
									<p className="text-xs text-neutral-400">
										Created
									</p>
									<p className="mt-1 text-sm">
										{formatDateTime(selectedTask?.task?.createdAt)}
									</p>
								</div>
							</div>

							<div className="mt-6 rounded-lg border border-neutral-800 bg-black p-4">
								<p className="mb-2 text-xs uppercase tracking-wide text-neutral-400">
									Status Description
								</p>
								<p className="text-sm text-neutral-400">
									{selectedTask?.task?.status_description ? selectedTask.task.status_description : "--"}
								</p>
							</div>

							{
								selectedTask?.activities?.length > 0 ? 
									<TaskHistory activities={selectedTask.activities} /> : 
									<NoData message="No task activity found" />
							}

							<TaskComment />
						</div>
					</div>
				</div>
			)}
        </>
    )
}

export default ViewTaskModel;