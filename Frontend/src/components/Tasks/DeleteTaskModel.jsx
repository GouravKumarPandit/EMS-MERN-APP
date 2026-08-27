import {
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { deleteTask } from "../../api/task";
import { toast } from "react-toastify";
import CancelButton from "../Ui/CancelButton";
import Button from "../Ui/Button";

function DeleteTaskModel({ modal, selectedTask, closeModal }) {
    const [submitLoader, setSubmitLoader] = useState(false);


    const deleteHandler = async (id) => {
        try {
            const response = await deleteTask(id);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
            closeModal();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    return (
        <>
            {modal === "delete" && selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-[#111111] p-6 shadow-2xl">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                            <Trash2
                                size={22}
                                className="text-red-500"
                            />
                        </div>
                        <h2 className="mt-6 text-lg font-semibold text-center">
                            Delete Task{" "}
                            <span className="text-neutral-300">
                                "{selectedTask.task_id}"
                            </span> ?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-neutral-400 text-center">
                            Are you sure you want to delete{" "}
                            <span className="text-neutral-300">
                                "{selectedTask.task}"
                            </span>
                            ?
                        </p>
                        <div className="mt-8 flex justify-center gap-3">
                            <CancelButton
                                onClick={closeModal}
                                className="rounded-lg border border-[#303030] px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#222] transition"
                            >
                                Cancel
                            </CancelButton>

                            <Button
                                onClick={() => {
                                    deleteHandler(selectedTask._id);
                                }}
                                disabled={submitLoader}
                                buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                            >
                                {
                                    submitLoader ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            Deleting Task...
                                        </>
                                    ) : "Delete Task"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteTaskModel