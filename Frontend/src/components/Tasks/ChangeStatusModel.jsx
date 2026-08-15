import {
	RefreshCw,
	X,
	CheckCircle2,
} from "lucide-react";

function ChangeStatusModel({ modal, selectedTask, closeModal }) {

    return (
        <>
            {modal === "status" && selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl">
=
                        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
                            <div>
                                <p className="text-xs text-neutral-600">
                                    {selectedTask.id}
                                </p>
                                <h2 className="mt-1 font-semibold">
                                    Change Status
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
                            {/* Current Status */}
                            <div className="mb-5 rounded-lg border border-neutral-800 bg-black p-4">
                                <p className="text-xs text-neutral-600">
                                    Current Status
                                </p>
                                <p className="mt-2 text-sm capitalize text-white">
                                    {selectedTask.status}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm text-neutral-300">
                                        Status
                                    </label>
                                    <select
                                        defaultValue={selectedTask.status}
                                        className="h-11 w-full rounded-lg border border-neutral-800 bg-black px-3 text-sm text-neutral-400 outline-none focus:border-red-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="completed">Completed</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-neutral-300">
                                        Priority
                                    </label>
                                    <select
                                        defaultValue={selectedTask.priority}
                                        className="h-11 w-full rounded-lg border border-neutral-800 bg-black px-3 text-sm text-neutral-400 outline-none focus:border-red-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm text-neutral-300">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        className="h-11 w-full rounded-lg border border-neutral-800 bg-black px-3 text-sm outline-none focus:border-red-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm text-neutral-300">
                                        Status Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Add a description for this status change..."
                                        className="w-full resize-none rounded-lg border border-neutral-800 bg-black px-3 py-3 text-sm outline-none placeholder:text-neutral-600 focus:border-red-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-7">
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

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={closeModal}
                                    className="rounded-lg border border-neutral-800 px-4 py-2.5 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium hover:bg-red-600">
                                    <RefreshCw size={16} />
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChangeStatusModel;