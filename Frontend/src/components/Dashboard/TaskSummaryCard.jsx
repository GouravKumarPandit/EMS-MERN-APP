import Button from '../Ui/Button';
import { formatDateTime } from '../../utils/date'
import ViewTaskModel from '../Tasks/ViewTaskModel';
import { useState } from 'react';
import { getTaskById } from '../../api/task';

function TaskSummaryCard({ task }) {
    const [modal, setModal] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const openModal = (type) => {
        setModal(type);

        
        if (type === "view") {
            const getTask = async (taskId) => {
                const response = await getTaskById(taskId);
                setSelectedTask(response.data.data);
            }
            getTask(task?._id);
        }
    };
    const closeModal = () => {
        setModal(null);
    };

    return (
        <div className="min-w-[300px] max-w-[300px] flex-shrink-0 rounded-xl border border-neutral-800 bg-[#151515] p-4 transition hover:border-violet-500/50">
            <div className="mb-4 flex items-center justify-between text-xs">
                <span className={`rounded-md border px-3 py-1 text-xs capitalize ${task?.priority === "high"
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : task?.priority === "medium"
                        ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                        : task?.priority === "low"
                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                    }`}>
                    {task?.priority ? task?.priority : "None"}
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

            <ViewTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
        </div>
    )
}

export default TaskSummaryCard;