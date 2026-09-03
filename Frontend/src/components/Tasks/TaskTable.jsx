import {
    Eye,
    Pencil,
    Trash2,
    RefreshCw,
    CalendarDays,
    User
} from "lucide-react";
import { formatDateTime } from "../../utils/date";
import NoData from "../Ui/NoData";
import Pagination from "../Ui/Pagination";
import Priority from "../Ui/Priority";
import Status from "../Ui/Status";
import TaskFilters from "./TaskFilters";
import { useEffect, useState } from "react";
import { getAllTask } from "../../api/task";
import { toast } from "react-toastify";
import IconButton from "../Ui/IconButton";
import useDebounce from "../../utils/useDebounce";

function TaskTable({ modal, openModal, staffs }) {
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        search: "",
        status: "",
        priority: "",
        staff: ""
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 10
    });
    const debouncedSearch = useDebounce(filters.search);

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
                    debouncedSearch, 
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
    }, [modal, debouncedSearch, filters.status, filters.priority, filters.staff,  pagination.currentPage, pagination.limit]);

    return (
        <>
            <TaskFilters filters={filters} filterInputHandler={filterInputHandler} staffs={staffs} />
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-[#111111]">
                <div className="hidden grid-cols-[1.5fr_2fr_1fr_1fr_1fr_1.5fr] gap-4 border-b border-neutral-800 bg-[#151515] px-5 py-4 text-xs uppercase tracking-wide text-neutral-400 lg:grid">
                    <span>Task</span>
                    <span>Description</span>
                    <span>Priority</span>
                    <span>Status</span>
                    <span>Due Date</span>
                    <span>Actions</span>
                </div>

                {tasks.length > 0 ? (tasks.map((task) => (
                    <div
                        key={task.task_id}
                        className="grid grid-cols-1 gap-4 border-b border-neutral-800 px-5 py-5 last:border-b-0 lg:grid-cols-[1.5fr_2fr_1fr_1fr_1fr_1.5fr] lg:items-center"
                    >
                        <div>
                            <p className="font-medium text-white">
                                {task.task}
                            </p>
                            <p className="mt-1 text-xs text-neutral-400">
                                ID: {task.task_id}
                            </p>
                            {
                                task?.assigned_staff ?
                                <div className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
                                    <User size={13} />
                                    {task?.assigned_staff?.first_name} {task?.assigned_staff?.last_name}
                                </div> :
                                <p className="mt-1 text-xs text-neutral-400">No Staff Assigned</p>
                            }
                        </div>

                        <p className="line-clamp-2 text-sm text-neutral-400">
                            {task?.task_description ? task?.task_description : "--"}
                        </p>

                        <div>
                            {
                                (task?.priority) ? 
                                <Priority priority={task.priority} /> : 
                                "None priority"
                            }
                        </div>

                        <div>
                            {
                                (task?.status) ? 
                                <Status status={task.status} /> : 
                                "None"
                            }
                        </div>

                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <CalendarDays size={15} />
                            {task.due_date ? formatDateTime(task.due_date) : "--"}
                        </div>

                        <div className="flex items-center gap-1">
                            <IconButton label={<Eye size={17} />} onClick={() => openModal("view", task)} title="View" />
                            <IconButton label={<Pencil size={17} />} onClick={() => openModal("edit", task)} title="Edit" />
                            <IconButton label={<RefreshCw size={17} />} onClick={() => openModal("status", task)} title="View" />
                            <IconButton label={<Trash2 size={17} />} onClick={() => openModal("delete", task)} title="View" />
                        </div>
                    </div>
                ))) : <NoData message={"No Task Found!"} />}
            </div>
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
        </>
    )
}

export default TaskTable;