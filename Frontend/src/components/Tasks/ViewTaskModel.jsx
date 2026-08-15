import {
	X,
	CalendarDays,
	User,
	Clock3,
	CheckCircle2,
} from "lucide-react";

function ViewTaskModel({ modal, selectedTask, closeModal }) {

    return (
        <>
            {modal === "view" && selectedTask && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
					<div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl">
						<div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
							<div>
								<p className="text-xs text-neutral-600">
									{selectedTask.id}
								</p>
								<h2 className="mt-1 font-semibold">
									{selectedTask.task}
								</h2>
							</div>
							<button
								onClick={closeModal}
								className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-900 hover:text-white"
							>
								<X size={18} />
							</button>
						</div>

						<div className="max-h-[75vh] overflow-y-auto p-6">
							<div className="mb-5 flex gap-2">
								<span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs capitalize text-blue-400">
									{selectedTask.status}
								</span>
								<span className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs capitalize text-red-400">
									{selectedTask.priority} priority
								</span>
							</div>

							<div className="mb-6">
								<p className="mb-2 text-xs uppercase tracking-wide text-neutral-600">
									Description
								</p>
								<p className="text-sm leading-6 text-neutral-400">
									{selectedTask.description}
								</p>
							</div>

							<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
								<div className="rounded-lg border border-neutral-800 bg-black p-4">
									<CalendarDays
										size={18}
										className="mb-2 text-red-400"
									/>
									<p className="text-xs text-neutral-600">
										Due Date
									</p>
									<p className="mt-1 text-sm">
										{selectedTask.dueDate}
									</p>
								</div>

								<div className="rounded-lg border border-neutral-800 bg-black p-4">
									<User
										size={18}
										className="mb-2 text-blue-400"
									/>
									<p className="text-xs text-neutral-600">
										Assigned Staff
									</p>
									<p className="mt-1 text-sm">
										{selectedTask.assignedStaff}
									</p>
								</div>

								<div className="rounded-lg border border-neutral-800 bg-black p-4">
									<Clock3
										size={18}
										className="mb-2 text-green-400"
									/>
									<p className="text-xs text-neutral-600">
										Created
									</p>
									<p className="mt-1 text-sm">
										{selectedTask.createdAt}
									</p>
								</div>
							</div>

							<div className="mt-6 rounded-lg border border-neutral-800 bg-black p-4">
								<p className="mb-2 text-xs uppercase tracking-wide text-neutral-600">
									Status Description
								</p>
								<p className="text-sm text-neutral-400">
									{selectedTask.statusDescription}
								</p>
							</div>

							<div className="mt-6">
								<h3 className="mb-4 text-sm font-medium">
									Status History
								</h3>

								<div className="space-y-3">
									{selectedTask.statusHistory.map(
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
															{history.status}
														</span>
														<span className="text-xs text-neutral-600">
															{history.date}
														</span>
													</div>
													<p className="mt-1 text-xs text-neutral-500">
														{history.description}
													</p>
												</div>
											</div>
										)
									)}
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