import {
	RefreshCw,
	X
} from "lucide-react";
import Select from "../Ui/Select";
import TextArea from "../Ui/TextArea";
import CancelButton from "../Ui/CancelButton";
import Button from "../Ui/Button";
import { useEffect, useState } from "react";
import NoData from "../Ui/NoData";
import { toast } from "react-toastify";
import { changeStatus, getTaskActivities } from "../../api/task";
import Status from "../Ui/Status";
import TaskHistory from "./TaskHistory";

function ChangeStatusModel({ modal, selectedTask, closeModal }) {
    const [taskActivity, setTaskActivity] = useState([]);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [changeStatusFormData, setChangeStatusFormData] = useState({
        status: "",
        status_description: ""
    });
    const [changeStatusFormErrorData, setChangeStatusFormErrorData] = useState({
        status: "",
        status_description: ""
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setChangeStatusFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setChangeStatusFormErrorData((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const response = await changeStatus(selectedTask?._id, changeStatusFormData);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
            setChangeStatusFormData({
                status: "",
                status_description: ""
            });
            setChangeStatusFormErrorData({
                status: "",
                status_description: ""
            });
            closeModal();
        } catch (error) {
            error?.response?.data?.errors?.length > 0 ? error.response.data.errors.map((error) => {
                setChangeStatusFormErrorData((prev) => ({
                    ...prev,
                    [error.path]: error.msg
                }))
            }) : toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    useEffect(() => {
        const fetchEditData = async () => {
            setChangeStatusFormData({
                status: selectedTask?.status || "",
                status_description: selectedTask?.status_description || ""
            });
        }

        const fetchTaskActivity = async (taskId) => {
            try {
                const response = await getTaskActivities(taskId, "status_changed");
                setTaskActivity(response.data.data || []);
            } catch (error) {
                setTaskActivity([]);
            }
        }

        if (modal === "status" && selectedTask?._id) {
            fetchEditData();
            fetchTaskActivity(selectedTask._id);
        } else {
            setTaskActivity([]);
        }
    }, [modal, selectedTask])

    return (
        <>
            {modal === "status" && selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-xl border border-app-line bg-app-card shadow-2xl">
                        <div className="flex items-center justify-between border-b border-app-line px-6 py-4">
                            <div>
                                <h2 className="mt-1 font-semibold">
                                    Change Status
                                </h2>
                                <p className="text-xs text-app-muted">
                                    Task ID # {selectedTask?.task_id}
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="rounded-lg p-2 text-app-muted hover:bg-app-hover hover:text-app-text"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="max-h-[75vh] overflow-y-auto p-6">
                            <form onSubmit={submitHandler} >
                                <div className="mb-5 rounded-lg border border-app-line bg-app-bg p-4">
                                    <p className="text-xs text-app-muted">
                                        Current Status
                                    </p>
                                    <p className="mt-2 text-sm capitalize text-app-text">
                                        <Status status={selectedTask?.status} />
                                    </p>
                                </div>
                                <div className="grid grid-cols-1">
                                    <Select
                                        label="Status"
                                        name="status"
                                        options={[
                                            { label: "Pending", value: "pending" },
                                            { label: "Accepted", value: "accepted" },
                                            { label: "Completed", value: "completed" },
                                            { label: "Failed", value: "failed" }
                                        ]}
                                        divClass="mb-5"
                                        required
                                        value={changeStatusFormData?.status}
                                        onChange={inputHandler}
                                        errorMessage={changeStatusFormErrorData?.status}
                                    />

                                    <TextArea
                                        label="Status Description"
                                        placeholder="Enter status description"
                                        row={4}
                                        name="status_description"
                                        value={changeStatusFormData?.status_description}
                                        onChange={inputHandler}
                                        errorMessage={changeStatusFormErrorData?.status_description}
                                    />
                                </div>

                                <div className="mt-6 flex justify-center gap-3">
                                    <CancelButton onClick={closeModal}>
                                        Cancel
                                    </CancelButton>

                                    <Button
                                        type="submit"
                                        disabled={submitLoader}
                                        buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                                    >
                                        {submitLoader ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            <><RefreshCw size={16} /> Save Changes</>
                                        )}
                                    </Button>
                                </div>
                            </form>
                            {
                                taskActivity?.length > 0 ? 
                                    <TaskHistory activities={taskActivity} title="Status History" /> : 
                                    <NoData message="No status activity found" />
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChangeStatusModel;