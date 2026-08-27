import {
    X,
} from "lucide-react";
import Input from "../Ui/Input";
import Button from "../Ui/Button";
import CancelButton from "../Ui/CancelButton";
import TextArea from "../Ui/TextArea";
import Select from "../Ui/Select";
import { useState } from "react";
import { createTask } from "../../api/task";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function CreateTaskModel({ modal, staffs, createFormData, setCreateFormData, inputHandler, createFormErrorData, setCreateFormErrorData, closeModal }) {
    const [submitLoader, setSubmitLoader] = useState(false);
    const { user } = useAuth();
    
    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await createTask(createFormData);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
            setCreateFormData({
                task: "",
                task_description: "",
                priority: "",
                status: "",
                status_description: "",
                due_date: "",
                assigned_staff: ""
            });
            setCreateFormErrorData({
                task: "",
                task_description: "",
                priority: "",
                status: "",
                status_description: "",
                due_date: "",
                assigned_staff: ""
            });
            closeModal();
        } catch (error) {
            error.response.data.errors.map((error) => {
                setCreateFormErrorData((prev) => ({
                    ...prev,
                    [error.path]: error.msg
                }))
            })
            toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    return (
        <>
            {modal === "create" && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
                            <div>
                                <h2 className="font-semibold">
                                    Create Task
                                </h2>
                                <p className="mt-1 text-xs text-neutral-400">
                                    Create and assign a new task.
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form className="p-6" onSubmit={submitHandler}>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Task" 
                                    type="text"
                                    placeholder="Enter task title"
                                    name="task"
                                    required
                                    divClass="md:col-span-2"
                                    value={createFormData.task}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.task}
                                />

                                <TextArea 
                                    label="Description" 
                                    divClass="md:col-span-2" 
                                    placeholder="Enter task description" 
                                    row={4}
                                    name="task_description"
                                    value={createFormData.task_description}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.task_description}
                                />

                                <Select
                                    label="Status"
                                    name="status"
                                    options={[
                                        { label: "Pending", value: "pending" },
                                        { label: "Accepted", value: "accepted" },
                                        { label: "Completed", value: "completed" },
                                        { label: "Failed", value: "failed" }
                                    ]}
                                    value={createFormData.status}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.status}
                                />

                                <Select
                                    label="Priority"
                                    name="priority"
                                    options={[
                                        { label: "Low", value: "low" },
                                        { label: "Medium", value: "medium" },
                                        { label: "High", value: "high" }
                                    ]}
                                    value={createFormData.priority}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.priority}
                                />

                                <Input
                                    label="Due Date" 
                                    type="date"
                                    placeholder="Enter due date"
                                    name="due_date"
                                    value={createFormData.due_date}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.due_date}
                                />

                                <Select
                                    label="Assign Staff"
                                    name="assigned_staff"
                                    options={
                                        staffs.map((staff) => ({ label: `${staff.first_name} ${staff.last_name} ${staff._id === user._id ? "(Me)" : ""}`, value: staff._id }))
                                    }
                                    value={createFormData.assigned_staff}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.assigned_staff}
                                />
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <CancelButton onClick={closeModal}>Cancel</CancelButton>
                                <Button
                                    type="submit"
                                    disabled={submitLoader}
                                    buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                                >
                                    {
                                        submitLoader ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                Creating Task...
                                            </>
                                        ) : "Create Task"
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateTaskModel;