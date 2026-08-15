import {
    X,
} from "lucide-react";
import Input from "../Ui/Input";
import Button from "../Ui/Button";
import CancelButton from "../Ui/CancelButton";
import TextArea from "../Ui/TextArea";
import Select from "../Ui/Select";

function CreateTaskModel({ modal, closeModal }) {

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
                                <p className="mt-1 text-xs text-neutral-500">
                                    Create and assign a new task.
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-900 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="max-h-[75vh] overflow-y-auto p-6">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Task" 
                                    type="text"
                                    placeholder="Enter task title"
                                    name="task"
                                    required="required"
                                    divClass="md:col-span-2"
                                    inputClass="bg-black placeholder:text-neutral-600"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                />

                                <TextArea 
                                    label="Description" 
                                    divClass="md:col-span-2" 
                                    placeholder="Enter task description" 
                                    row={4}
                                />

                                <Select
                                    label="Priority"
                                    options={[
                                        { label: "Low", value: "low" },
                                        { label: "Medium", value: "medium" },
                                        { label: "High", value: "high" }
                                    ]}
                                />

                                <Input
                                    label="Due Date" 
                                    type="date"
                                    placeholder="Enter due date"
                                    name="dueDate"
                                    inputClass="bg-black placeholder:text-neutral-600"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                />

                                <Select
                                    label="Assign Staff"
                                    options={[
                                        { label: "Medium", value: "Gourav Pandit" },
                                        { label: "High", value: "Rahul Sharma" },
                                        { label: "High", value: "Amit Kumar" },
                                        { label: "High", value: "Priya Singh" }
                                    ]}
                                    divClass="md:col-span-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <CancelButton onClick={closeModal}>Cancel</CancelButton>
                                <Button type="submit">Create Task</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateTaskModel;