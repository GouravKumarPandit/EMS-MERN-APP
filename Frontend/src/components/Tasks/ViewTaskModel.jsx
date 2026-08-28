import {
	X,
	CalendarDays,
	User,
	Clock3,
	CheckCircle2,
} from "lucide-react";
import { formatDateTime } from "../../utils/date";
import NoData from "../Ui/NoData";

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
								<span className={`rounded-md border px-3 py-1 text-xs capitalize ${selectedTask?.task?.status === "pending"
                                    ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                                    : selectedTask?.task?.status === "accepted"
                                        ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                                        : selectedTask?.task?.status === "completed"
                                            ?"border-green-500/20 bg-green-500/10 text-green-400"
                                            : "border-red-500/20 bg-red-500/10 text-red-400"
                                    }`}>
									{selectedTask?.task?.status ? selectedTask?.task?.status : "None"}
								</span>
								<span className={`rounded-md border px-3 py-1 text-xs capitalize ${selectedTask?.task?.priority === "high"
                                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                                    : selectedTask?.task?.priority === "medium"
                                        ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                                        : selectedTask?.task?.priority === "low"
                                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                                            : "border-red-500/20 bg-red-500/10 text-red-400"
                                    }`}>
									{selectedTask?.task?.priority ? selectedTask?.task?.priority : "None"} priority
								</span>
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
											<div className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
												<User size={13} />
												{selectedTask?.task?.assigned_staff?.first_name} {selectedTask?.task?.assigned_staff?.last_name}
											</div> :
											<p className="mt-1 text-xs">--</p>
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

							<div className="mt-6">
								<h3 className="mb-4 text-sm font-medium">
									Task History
								</h3>

								<div className="space-y-3">
									{selectedTask?.activities?.length ? selectedTask.activities.map(
										(history, index) => (
											<div
												key={index}
												className="flex gap-3 rounded-lg border border-neutral-800 bg-black p-3"
											>
												<div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900">
													<CheckCircle2
														size={15}
														className="text-green-400"
													/>
												</div>

												<div>
													<div className="flex flex-wrap items-center gap-2">
														<span className="text-sm capitalize">
															{history?.task_type.replace("_", " ")}
														</span>
														<span className="text-xs text-neutral-400">
															{formatDateTime(history?.createdAt)}
														</span>
													</div>
													<p className="mt-1 text-xs text-neutral-400">
														{history?.task_activity} <br />
														Updated By: {history?.updated_by?.first_name} {history?.updated_by?.last_name}
													</p>
												</div>
											</div>
										)
									) : <NoData message="No task activity found" />}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
        </>
    )
}

export default ViewTaskModel;