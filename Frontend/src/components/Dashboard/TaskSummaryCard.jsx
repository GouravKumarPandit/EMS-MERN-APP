import Button from '../Ui/Button';

function TaskSummaryCard({ task }) {
    return (
        <div className="min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl border border-neutral-800 bg-[#151515] p-4 transition hover:border-red-500/50">
            <div className="mb-4 flex items-center justify-between text-xs">
                <span className="rounded-md bg-red-500/15 px-2 py-1 font-medium text-red-400">
                    High
                </span>
                <span className="text-neutral-500">
                    20 Feb 2024
                </span>
            </div>

            <h3 className="font-semibold text-white">
                Ek aur task
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-5 text-neutral-500">
                Task jaisa kabhi nahi dekha hoga waisa.
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-3">
                <span className="text-xs text-neutral-600">
                    Task #001
                </span>

                <Button buttonClass="text-xs font-medium text-red-500 hover:text-red-400">
                    View
                </Button>
            </div>
        </div>
    )
}

export default TaskSummaryCard;