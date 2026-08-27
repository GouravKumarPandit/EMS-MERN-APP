import {
	RefreshCw,
	X,
	CheckCircle2,
} from "lucide-react";
import Select from "../Ui/Select";
import Input from "../Ui/Input";
import TextArea from "../Ui/TextArea";
import CancelButton from "../Ui/CancelButton";
import Button from "../Ui/Button";
import { useState } from "react";
import formatDateForInput from "../../utils/formatDateForInput";
import { formatDateTime } from "../../utils/date";
import NoData from "../Ui/NoData";
import { toast } from "react-toastify";
import { changeStatus } from "../../api/task";

function ChangeStatusModel({ modal, selectedTask, createFormData, inputHandler, createFormErrorData, setCreateFormErrorData, closeModal }) {
    const [submitLoader, setSubmitLoader] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const response = await changeStatus(selectedTask?.task?._id, createFormData);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
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
            {modal === "status" && selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
                            <div>
                                <p className="text-xs text-neutral-400">
                                    {selectedTask?.task?.task_id}
                                </p>
                                <h2 className="mt-1 font-semibold">
                                    Change Status
                                </h2>
                            </div>

                            <button
                                onClick={closeModal}
                                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={submitHandler} >
                            <div className="max-h-[75vh] overflow-y-auto p-6">
                                <div className="mb-5 rounded-lg border border-neutral-800 bg-black p-4">
                                    <p className="text-xs text-neutral-400">
                                        Current Status
                                    </p>
                                    <p className="mt-2 text-sm capitalize text-white">
                                        {selectedTask?.task?.status}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <Select
                                        label="Status"
                                        name="status"
                                        options={[
                                            { label: "Pending", value: "pending" },
                                            { label: "Accepted", value: "accepted" },
                                            { label: "Completed", value: "completed" },
                                            { label: "Failed", value: "failed" }
                                        ]}
                                        required
                                        value={createFormData.status}
                                        onChange={inputHandler}
                                        errorMessage={createFormErrorData.status}
                                    />

                                    <TextArea
                                        label="Status Description"
                                        placeholder="Enter status description"
                                        row={4}
                                        name="status_description"
                                        value={createFormData.status_description}
                                        onChange={inputHandler}
                                        errorMessage={createFormErrorData.status_description}
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
                                        value={formatDateForInput(createFormData.due_date)}
                                        onChange={inputHandler}
                                        errorMessage={createFormErrorData.due_date}
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

                                <div className="mt-7">
                                    <h3 className="mb-4 text-sm font-medium">
                                        Status History
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedTask?.activities?.length ? selectedTask.activities.map(
                                            (history, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-3 rounded-lg border border-neutral-800 bg-black p-3"
                                                >
                                                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900">
                                                        <CheckCircle2
                                                            size={15}
                                                            className="text-green-400"
                                                        />
                                                    </div>

                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="text-sm capitalize">
                                                                {history?.task_type.replace("_", " ")}
                                                            </span>
                                                            <span className="text-xs text-neutral-400">
                                                                {formatDateTime(history?.createdAt)}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-xs text-neutral-400">
                                                            {history?.task_activity} <br />
                                                            Updated By: {history?.updated_by?.first_name} {history?.updated_by?.last_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        ) : <NoData message="No task activity found" />}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChangeStatusModel;