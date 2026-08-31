function TaskComment() {
    return (
        <>
            <div className="mt-6 border-t border-neutral-800 pt-6">

                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Task Comments
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">
                            Add updates, notes, or discussions related to this task.
                        </p>
                    </div>

                    <span className="rounded-full bg-neutral-800 px-2.5 py-1 text-xs text-neutral-400">
                        3 Comments
                    </span>
                </div>


                {/* Existing Comments */}
                <div className="space-y-3">

                    {/* Comment 1 */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">

                        <div className="flex items-start gap-3">

                            {/* Avatar */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-violet-400">
                                GK
                            </div>

                            {/* Comment Content */}
                            <div className="min-w-0 flex-1">

                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <span className="text-sm font-medium text-white">
                                            Gourav Kumar
                                        </span>

                                        <span className="ml-2 text-xs text-neutral-500">
                                            2 hours ago
                                        </span>
                                    </div>

                                    {/* More */}
                                    <button
                                        type="button"
                                        className="rounded-md p-1 text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
                                    >
                                        ⋮
                                    </button>
                                </div>

                                <p className="mt-2 text-sm leading-6 text-neutral-400">
                                    I have completed the initial implementation.
                                    Need to verify the validation before moving this
                                    task to completed.
                                </p>

                            </div>
                        </div>
                    </div>


                    {/* Comment 2 */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">

                        <div className="flex items-start gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-semibold text-blue-400">
                                AS
                            </div>

                            <div className="min-w-0 flex-1">

                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <span className="text-sm font-medium text-white">
                                            Amit Sharma
                                        </span>

                                        <span className="ml-2 text-xs text-neutral-500">
                                            Yesterday
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-md p-1 text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
                                    >
                                        ⋮
                                    </button>
                                </div>

                                <p className="mt-2 text-sm leading-6 text-neutral-400">
                                    Please make sure the error messages are displayed
                                    properly on the frontend.
                                </p>

                            </div>
                        </div>
                    </div>


                    {/* Comment 3 */}
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">

                        <div className="flex items-start gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                                RS
                            </div>

                            <div className="min-w-0 flex-1">

                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <span className="text-sm font-medium text-white">
                                            Rahul Singh
                                        </span>

                                        <span className="ml-2 text-xs text-neutral-500">
                                            2 days ago
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="rounded-md p-1 text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
                                    >
                                        ⋮
                                    </button>
                                </div>

                                <p className="mt-2 text-sm leading-6 text-neutral-400">
                                    The requirements have been updated. Please review
                                    the latest task description.
                                </p>

                            </div>
                        </div>
                    </div>

                </div>


                {/* Add Comment */}
                <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">

                    <div className="flex items-start gap-3">

                        {/* Current User Avatar */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-violet-400">
                            GK
                        </div>

                        <div className="flex-1">

                            <textarea
                                rows={3}
                                placeholder="Write a comment..."
                                className="w-full resize-none rounded-lg border border-neutral-800 bg-black px-3 py-3 text-sm text-neutral-300 placeholder:text-neutral-600 outline-none transition focus:border-violet-500"
                            />

                            <div className="mt-3 flex items-center justify-between">

                                <span className="text-xs text-neutral-600">
                                    Keep your comment clear and relevant.
                                </span>

                                <button
                                    type="button"
                                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
                                >
                                    Add Comment
                                </button>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TaskComment;