function TaskCountCard({ taskName, taskCount, taskDetail, cardBg, hoverBg }) {
    return (
        <div className={`rounded-xl border border-blue-500/30 bg-[#151515] p-5 transition ${hoverBg}`}>
            <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-400">
                    {taskName}
                </p>

                <span className={`h-2.5 w-2.5 rounded-full ${cardBg}`} />
            </div>

            <h2 className="text-3xl font-bold text-white">
                {taskCount}
            </h2>

            <p className="mt-1 text-xs text-neutral-400">
                {taskDetail}
            </p>
        </div>
    )
}

export default TaskCountCard;