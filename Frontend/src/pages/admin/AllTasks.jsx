import { useEffect, useState } from "react";
import TaskTable from "../../components/Tasks/TaskTable";
import CreateTaskModel from "../../components/Tasks/CreateTaskModel";
import ViewTaskModel from "../../components/Tasks/ViewTaskModel";
import EditTaskModel from "../../components/Tasks/EditTaskModel";
import ChangeStatusModel from "../../components/Tasks/ChangeStatusModel";
import DeleteTaskModel from "../../components/Tasks/DeleteTaskModel";
import CardHeader from "../../components/Layout/CardHeader";
import { getFilterAllStaff } from "../../api/staff";
import { toast } from "react-toastify";

const AllTasks = () => {
    const [staffs, setStaffs] = useState([]);
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
    }, [])

	return (
		<div className="min-h-screen bg-black text-white p-4 md:p-6">
            <CardHeader 
                cardHeading="All Tasks" 
                headingDescription="Manage and monitor all employee tasks." 
                buttonText="+ Create Task" 
                onClick={() => openModal("create")}
            />
			
			<TaskTable modal={modal} openModal={openModal} staffs={staffs} />
			<CreateTaskModel modal={modal} closeModal={closeModal} staffs={staffs} />
			<ViewTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
            <EditTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} staffs={staffs} />
            <ChangeStatusModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
            <DeleteTaskModel modal={modal} selectedTask={selectedTask} closeModal={closeModal} />
		</div>
	);
};

export default AllTasks;