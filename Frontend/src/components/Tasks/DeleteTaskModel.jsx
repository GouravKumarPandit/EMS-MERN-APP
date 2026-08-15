import {
	Trash2,
} from "lucide-react";

function DeleteTaskModel({ modal, selectedTask, closeModal }) {

    return (
        <>
            {modal === "delete" && selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-[#111111] p-6 shadow-2xl">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                            <Trash2
                                size={22}
                                className="text-red-500"
                            />
                        </div>
                        <h2 className="mt-5 text-lg font-semibold">
                            Delete Task?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Are you sure you want to delete{" "}
                            <span className="text-neutral-300">
                                "{selectedTask.task}"
                            </span>
                            ?
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="rounded-lg border border-neutral-800 px-4 py-2.5 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteTaskModel