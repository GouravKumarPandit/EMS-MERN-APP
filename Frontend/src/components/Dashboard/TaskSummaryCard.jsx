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
        <div className="flex h-full min-h-[220px] w-full flex-col rounded-xl border border-app-line bg-app-raised p-4 transition hover:border-violet-500/50">
            <div className="mb-4 flex items-center justify-between gap-2 text-xs">
                <span className={`shrink-0 rounded-md border px-3 py-1 text-xs capitalize ${task?.priority === "urgent"
                    ? "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400"
                    : task?.priority === "high"
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : task?.priority === "medium"
                        ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                        : task?.priority === "low"
                            ? "border-green-500/20 bg-green-500/10 text-green-400"
                            : "border-red-500/20 bg-red-500/10 text-red-400"
                    }`}>
                    {task?.priority ? task?.priority : "None"}
                </span>
                <span className="truncate text-app-muted">
                    {
                        task?.due_date ? formatDateTime(task?.due_date) : formatDateTime(task?.createdAt)
                    }
                </span>
            </div>

            <h3 className="line-clamp-2 min-h-12 font-semibold text-app-text">
                { task?.task }
            </h3>

            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-app-muted">
                { task?.task_description || "--" }
            </p>

            <div className="mt-auto flex items-center justify-between gap-2 border-t border-app-line pt-3">
                <span className="truncate text-xs text-app-muted">
                    Task #{ task?.task_id }
                </span>

                <Button 
                    onClick={() => openModal("view", task)} 
                    title="View"
                    buttonClass="shrink-0 px-3 py-1.5 text-xs font-medium"
                >
                    View
                </Button>
            </div>

            <ViewTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
        </div>
    )
}

export default TaskSummaryCard;