import Button from '../Ui/Button';
import { formatDateTime } from '../../utils/date'
import ViewTaskModel from '../Tasks/ViewTaskModel';
import { useState } from 'react';
import { Eye } from 'lucide-react';

function TaskSummaryCard({ task }) {
    const [modal, setModal] = useState(null);
    const openModal = (type) => {
        setModal(type);
    };
    const closeModal = () => {
        setModal(null);
    };

    return (
        <div className="min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl border border-neutral-800 bg-[#151515] p-4 transition hover:border-violet-500/50">
            <div className="mb-4 flex items-center justify-between text-xs">
                <span className="rounded-md bg-red-500/15 px-2 py-1 font-medium text-red-400">
                    {
                        task?.priority ? task?.priority : "None"
                    }
                </span>
                <span className="text-neutral-400">
                    {
                        task?.due_date ? formatDateTime(task?.due_date) : formatDateTime(task?.createdAt)
                    }
                </span>
            </div>

            <h3 className="font-semibold text-white">
                { task?.task }
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-5 text-neutral-400">
                { task?.task_description }
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-3">
                <span className="text-xs text-neutral-400">
                    Task #{ task?.task_id }
                </span>

                <Button 
                    onClick={() => openModal("view", task)} 
                    title="View"
                    buttonClass="text-xs font-medium text-violet-500 hover:text-white"
                >
                    View
                </Button>
            </div>

            <ViewTaskModel modal={modal} selectedTask={task} closeModal={closeModal} />
        </div>
    )
}

export default TaskSummaryCard;