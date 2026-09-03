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
import { getAttachmentUrl, isImageAttachment } from "../../utils/taskForm";

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
					<div className="w-full max-w-2xl rounded-xl border border-app-line bg-app-card shadow-2xl">
						<div className="flex items-center justify-between border-b border-app-line px-6 py-4">
							<div>
								<p className="text-xs text-app-muted">
									{selectedTask?.task_id}
								</p>
								<h2 className="mt-1 font-semibold">
									{selectedTask?.task}
								</h2>
							</div>
							<button
								onClick={closeModal}
								className="rounded-lg p-2 text-app-muted hover:bg-app-hover hover:text-app-text"
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
								<p className="mb-2 text-xs uppercase tracking-wide text-app-muted">
									Description
								</p>
								<p className="text-sm leading-6 text-app-muted">
									{selectedTask?.task_description ? selectedTask?.task_description : "--"}
								</p>
							</div>

							<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
								<div className="rounded-lg border border-app-line bg-app-bg p-4">
									<CalendarDays
										size={18}
										className="mb-2 text-violet-400"
									/>
									<p className="text-xs text-app-muted">
										Due Date
									</p>
									<p className="mt-1 text-sm">
										{selectedTask?.due_date ? formatDateTime(selectedTask.due_date) : "--"}
									</p>
								</div>

								<div className="rounded-lg border border-app-line bg-app-bg p-4">
									<User
										size={18}
										className="mb-2 text-blue-400"
									/>
									<p className="text-xs text-app-muted">
										Assigned Staff
									</p>
									<p className="mt-1 text-sm">
										{
											selectedTask?.assigned_staff ?
											<span className="mt-2 flex items-center gap-1 text-xs text-app-muted">
												<User size={13} />
												{selectedTask?.assigned_staff?.first_name} {selectedTask?.assigned_staff?.last_name}
											</span> :
											<span className="mt-1 text-xs">--</span>
										}
									</p>
								</div>

								<div className="rounded-lg border border-app-line bg-app-bg p-4">
									<Clock3
										size={18}
										className="mb-2 text-green-400"
									/>
									<p className="text-xs text-app-muted">
										Created
									</p>
									<p className="mt-1 text-sm">
										{formatDateTime(selectedTask?.createdAt)}
									</p>
								</div>
							</div>

							<div className="mt-6 rounded-lg border border-app-line bg-app-bg p-4">
								<p className="mb-2 text-xs uppercase tracking-wide text-app-muted">
									Status Description
								</p>
								<p className="text-sm text-app-muted">
									{selectedTask?.status_description ? selectedTask.status_description : "--"}
								</p>
							</div>

                            {selectedTask?.attachments?.length > 0 && (
                                <div className="mt-6">
                                    <p className="mb-3 text-xs uppercase tracking-wide text-app-muted">
                                        Attachments
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {selectedTask.attachments.map((attachment) => (
                                            <a
                                                key={attachment.file_name}
                                                href={getAttachmentUrl(attachment.path)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="overflow-hidden rounded-lg border border-app-line bg-app-bg transition hover:border-violet-500"
                                            >
                                                {isImageAttachment(attachment.mime_type) ? (
                                                    <img
                                                        src={getAttachmentUrl(attachment.path)}
                                                        alt={attachment.original_name}
                                                        className="h-28 w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-28 items-center justify-center px-3 text-center text-xs text-app-muted">
                                                        {attachment.original_name}
                                                    </div>
                                                )}
                                                <p className="truncate px-2 py-2 text-xs text-app-muted">
                                                    {attachment.original_name}
                                                </p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

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