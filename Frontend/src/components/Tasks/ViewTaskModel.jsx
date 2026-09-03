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
import { useEffect, useState } from "react";
import { getTaskActivities } from "../../api/task";

function ViewTaskModel({ modal, selectedTask, closeModal }) {
	const [taskActivity, setTaskActivity] = useState([]);
	useEffect(() => {
		const fetchTaskActivity = async (taskId) => {
			try {
				const response = await getTaskActivities(taskId);
				setTaskActivity(response.data.data || []);
			} catch (error) {
				setTaskActivity([]);
			}
		}

		if (modal === "view" && selectedTask?._id) {
			fetchTaskActivity(selectedTask._id);
		} else {
			setTaskActivity([]);
		}
	}, [modal, selectedTask])

    return (
        <>
            {modal === "view" && selectedTask && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
					<div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl">
						<div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
							<div>
								<p className="text-xs text-neutral-400">
									{selectedTask?.task_id}
								</p>
								<h2 className="mt-1 font-semibold">
									{selectedTask?.task}
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
									(selectedTask?.priority) ? 
									<Priority priority={selectedTask.priority} /> : 
									"None priority"
								}
								{
									(selectedTask?.status) ? 
									<Status status={selectedTask.status} /> : 
									"None"
								}
							</div>

							<div className="mb-6">
								<p className="mb-2 text-xs uppercase tracking-wide text-neutral-400">
									Description
								</p>
								<p className="text-sm leading-6 text-neutral-400">
									{selectedTask?.task_description ? selectedTask?.task_description : "--"}
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
										{selectedTask?.due_date ? formatDateTime(selectedTask.due_date) : "--"}
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
											selectedTask?.assigned_staff ?
											<span className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
												<User size={13} />
												{selectedTask?.assigned_staff?.first_name} {selectedTask?.assigned_staff?.last_name}
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
										{formatDateTime(selectedTask?.createdAt)}
									</p>
								</div>
							</div>

							<div className="mt-6 rounded-lg border border-neutral-800 bg-black p-4">
								<p className="mb-2 text-xs uppercase tracking-wide text-neutral-400">
									Status Description
								</p>
								<p className="text-sm text-neutral-400">
									{selectedTask?.status_description ? selectedTask.status_description : "--"}
								</p>
							</div>

							{
								taskActivity?.length > 0 ? 
									<TaskHistory activities={taskActivity} /> : 
									<NoData message="No task activity found" />
							}

							<TaskComment taskId={selectedTask?._id} />
						</div>
					</div>
				</div>
			)}
        </>
    )
}

export default ViewTaskModel;