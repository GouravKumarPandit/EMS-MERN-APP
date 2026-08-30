import { useEffect, useState } from "react";
import TaskFilters from "../../components/Tasks/TaskFilters";
import TaskTable from "../../components/Tasks/TaskTable";
import CreateTaskModel from "../../components/Tasks/CreateTaskModel";
import ViewTaskModel from "../../components/Tasks/ViewTaskModel";
import EditTaskModel from "../../components/Tasks/EditTaskModel";
import ChangeStatusModel from "../../components/Tasks/ChangeStatusModel";
import DeleteTaskModel from "../../components/Tasks/DeleteTaskModel";
import { getAllTask, getTaskById } from "../../api/task";
import { toast } from "react-toastify";
import { getFilterAllStaff } from "../../api/staff";
import CardHeader from "../../components/Layout/CardHeader";

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [modal, setModal] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 3
    });
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
        staff: ""
    });
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

    const filterInputHandler = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePageChange = (page) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };


    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await getAllTask(
                    filters.search, 
                    filters.status, 
                    filters.priority, 
                    filters.staff, 
                    pagination.currentPage, pagination.limit
                );

                if (response.data.success) {
                    const { tasks, pagination: paginationData } =
                        response.data.data;

                    setTasks(tasks);
                    setPagination(paginationData);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        loadTasks();
    }, [modal, filters.search, filters.status, filters.priority, filters.staff,  pagination.currentPage, pagination.limit])

    useEffect(() => {
        const loadStaff = async () => {
            try {
                const response = await getFilterAllStaff();
                setStaffs(response.data.data);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        loadStaff();
    }, [modal])

	return (
		<div className="min-h-screen bg-black text-white p-4 md:p-6">
            <CardHeader 
                cardHeading="All Tasks" 
                headingDescription="Manage and monitor all employee tasks." 
                buttonText="+ Create Task" 
                onClick={() => openModal("create")}
            />
			<TaskFilters filters={filters} filterInputHandler={filterInputHandler} staffs={staffs} />
			<TaskTable tasks={tasks} openModal={openModal} 
                pagination={pagination} onPageChange={handlePageChange} 
            />
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