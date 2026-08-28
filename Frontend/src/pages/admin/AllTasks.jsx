import { useEffect, useState } from "react";
import TaskFilters from "../../components/Tasks/TaskFilters";
import TaskTable from "../../components/Tasks/TaskTable";
import CreateTaskModel from "../../components/Tasks/CreateTaskModel";
import ViewTaskModel from "../../components/Tasks/ViewTaskModel";
import EditTaskModel from "../../components/Tasks/EditTaskModel";
import ChangeStatusModel from "../../components/Tasks/ChangeStatusModel";
import DeleteTaskModel from "../../components/Tasks/DeleteTaskModel";
import { Plus } from "lucide-react";
import { getAllTask, getTaskById } from "../../api/task";
import { toast } from "react-toastify";
import { getAllStaff } from "../../api/staff";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [modal, setModal] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [createFormData, setCreateFormData] = useState({
        task: "",
        task_description: "",
        priority: "",
        status: "",
        status_description: "",
        due_date: "",
        assigned_staff: ""
    });
    const [createFormErrorData, setCreateFormErrorData] = useState({
        task: "",
        task_description: "",
        priority: "",
        status: "",
        status_description: "",
        due_date: "",
        assigned_staff: ""
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setCreateFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setCreateFormErrorData((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

    const openModal = (type, task = null) => {
        setSelectedTask(task);
        setModal(type);

        if (type === "view" || type === "status") {
            const getTask = async (taskId) => {
                const response = await getTaskById(taskId);
                setSelectedTask(response.data.data);
            }
            getTask(task?._id);
        }

        if(type === "edit" || type === "status"){
            setCreateFormData({
                task: task?.task || "",
                task_description: task?.task_description || "",
                priority: task?.priority || "",
                status: task?.status || "",
                status_description: task?.status_description || "",
                due_date: task?.due_date || "",
                assigned_staff: task?.assigned_staff?._id || ""
            });
        }
    };
    const closeModal = () => {
        setModal(null);
        setSelectedTask(null);
        setCreateFormErrorData({
            task: "",
            task_description: "",
            priority: "",
            status: "",
            status_description: "",
            due_date: "",
            assigned_staff: ""
        });
        setCreateFormData({
            task: "",
            task_description: "",
            priority: "",
            status: "",
            status_description: "",
            due_date: "",
            assigned_staff: ""
        });
    };

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await getAllTask();
                setTasks(response.data.data);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        loadTasks();
    }, [modal])

    useEffect(() => {
        const loadStaff = async () => {
            try {
                const response = await getAllStaff();
                setStaffs(response.data.data);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        loadStaff();
    }, [modal])

	return (
		<div className="min-h-screen bg-black text-white">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 className="text-2xl font-semibold">
						All Tasks
					</h1>

					<p className="mt-1 text-sm text-neutral-400">
						Manage and monitor all employee tasks.
					</p>
				</div>

				<button
					onClick={() => openModal("create")}
					className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium transition hover:bg-violet-700"
				>
					<Plus size={18} />
					Create Task
				</button>
			</div>	
			<TaskFilters />
			<TaskTable tasks={tasks} openModal={openModal} />
			<CreateTaskModel 
                modal={modal} closeModal={closeModal} staffs={staffs}
                createFormData={createFormData} setCreateFormData={setCreateFormData} inputHandler={inputHandler} 
                createFormErrorData={createFormErrorData} setCreateFormErrorData={setCreateFormErrorData}    
            />
			<ViewTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
            <EditTaskModel 
                modal={modal} selectedTask={selectedTask} closeModal={closeModal}
                staffs={staffs}
                createFormData={createFormData} inputHandler={inputHandler} 
                createFormErrorData={createFormErrorData} setCreateFormErrorData={setCreateFormErrorData}
            />
            <ChangeStatusModel 
                modal={modal} selectedTask={selectedTask} closeModal={closeModal}
                createFormData={createFormData} inputHandler={inputHandler} 
                createFormErrorData={createFormErrorData} setCreateFormErrorData={setCreateFormErrorData}
            />
            <DeleteTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
		</div>
	);
};

export default AllTasks;