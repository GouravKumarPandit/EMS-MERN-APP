import { useState } from "react";
import TaskFilters from "../../components/Tasks/TaskFilters";
import TaskTable from "../../components/Tasks/TaskTable";
import CreateTaskModel from "../../components/Tasks/CreateTaskModel";
import ViewTaskModel from "../../components/Tasks/ViewTaskModel";
import EditTaskModel from "../../components/Tasks/EditTaskModel";
import ChangeStatusModel from "../../components/Tasks/ChangeStatusModel";
import DeleteTaskModel from "../../components/Tasks/DeleteTaskModel";
import { Plus } from "lucide-react";

const AllTasks = () => {
    // Samole Data 
    const tasks = [
        {
            id: "TASK-001",
            task: "Complete employee documentation",
            description:
                "Complete and verify all employee documentation before the deadline.",
            priority: "high",
            status: "pending",
            dueDate: "20 Aug 2026",
            assignedStaff: "Gourav Pandit",
            createdAt: "14 Aug 2026",
            statusDescription: "Task is waiting for staff acceptance.",
            statusHistory: [
                {
                    status: "pending",
                    description: "Task created.",
                    date: "14 Aug 2026, 10:30 AM",
                },
            ],
        },

        {
            id: "TASK-002",
            task: "Update employee records",
            description:
                "Update employee records with the latest employee information.",
            priority: "medium",
            status: "accepted",
            dueDate: "22 Aug 2026",
            assignedStaff: "Rahul Sharma",
            createdAt: "13 Aug 2026",
            statusDescription: "Task accepted by staff.",
            statusHistory: [
                {
                    status: "pending",
                    description: "Task created.",
                    date: "13 Aug 2026, 09:15 AM",
                },
                {
                    status: "accepted",
                    description: "Task accepted by Rahul Sharma.",
                    date: "13 Aug 2026, 11:20 AM",
                },
            ],
        },

        {
            id: "TASK-003",
            task: "Prepare monthly report",
            description:
                "Prepare the monthly employee performance report.",
            priority: "low",
            status: "completed",
            dueDate: "18 Aug 2026",
            assignedStaff: "Amit Kumar",
            createdAt: "10 Aug 2026",
            statusDescription: "Report successfully completed.",
            statusHistory: [
                {
                    status: "pending",
                    description: "Task created.",
                    date: "10 Aug 2026, 09:00 AM",
                },
                {
                    status: "accepted",
                    description: "Task accepted.",
                    date: "10 Aug 2026, 10:00 AM",
                },
                {
                    status: "completed",
                    description: "Task completed successfully.",
                    date: "17 Aug 2026, 04:30 PM",
                },
            ],
        },

        {
            id: "TASK-004",
            task: "Fix attendance records",
            description:
                "Check and fix incorrect attendance records.",
            priority: "high",
            status: "failed",
            dueDate: "15 Aug 2026",
            assignedStaff: "Priya Singh",
            createdAt: "8 Aug 2026",
            statusDescription: "Task could not be completed.",
            statusHistory: [
                {
                    status: "pending",
                    description: "Task created.",
                    date: "8 Aug 2026, 10:00 AM",
                },
                {
                    status: "failed",
                    description: "Task failed because of incomplete data.",
                    date: "14 Aug 2026, 05:30 PM",
                },
            ],
        },
    ];

    const [modal, setModal] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const openModal = (type, task = null) => {
        setSelectedTask(task);
        setModal(type);
    };
    const closeModal = () => {
        setModal(null);
        setSelectedTask(null);
    };

	return (
		<div className="min-h-screen bg-black text-white">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-2xl font-semibold">
						All Tasks
					</h1>

					<p className="mt-1 text-sm text-neutral-500">
						Manage and monitor all employee tasks.
					</p>
				</div>

				<button
					onClick={() => openModal("create")}
					className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium transition hover:bg-red-600"
				>
					<Plus size={18} />
					Create Task
				</button>
			</div>	
			<TaskFilters />
			<TaskTable tasks={tasks} openModal={openModal} />
			<CreateTaskModel modal={modal} closeModal={closeModal} />
			<ViewTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
            <EditTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
            <ChangeStatusModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
            <DeleteTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
		</div>
	);
};

export default AllTasks;