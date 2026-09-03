import {
	X
} from "lucide-react";
import Input from "../Ui/Input";
import CancelButton from "../Ui/CancelButton";
import Button from "../Ui/Button";
import TextArea from "../Ui/TextArea";
import Select from "../Ui/Select";
import { useEffect, useState } from "react";
import { updateTask } from "../../api/task";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import formatDateForInput from "../../utils/formatDateForInput";

function EditTaskModel({ modal, selectedTask, staffs, closeModal }) {
	const { user } = useAuth();
	const [submitLoader, setSubmitLoader] = useState(false);
	const [editFormData, setEditFormData] = useState({
        task: "",
        task_description: "",
        priority: "",
        status: "",
        status_description: "",
        due_date: "",
        assigned_staff: ""
    });
    const [editFormErrorData, setEditFormErrorData] = useState({
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
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setEditFormErrorData((prev) => ({
            ...prev,
            [name]: ""
        }))
    }
	
	const submitHandler = async (event) => {
		event.preventDefault();

		try {
			const response = await updateTask(selectedTask._id, editFormData);
			if(response.data.success){
				toast.success(response?.data?.message);
			}
			setEditFormData({
                task: "",
                task_description: "",
                priority: "",
                status: "",
                status_description: "",
                due_date: "",
                assigned_staff: ""
            });
            setEditFormErrorData({
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
			error?.response?.data?.errors?.length > 0 ? error.response.data.errors.map((error) => {
				setEditFormErrorData((prev) => ({
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
			setEditFormData({
                task: selectedTask?.task || "",
                task_description: selectedTask?.task_description || "",
                priority: selectedTask?.priority || "",
                status: selectedTask?.status || "",
                status_description: selectedTask?.status_description || "",
                due_date: selectedTask?.due_date || "",
                assigned_staff: selectedTask?.assigned_staff?._id || ""
            });
		}

		fetchEditData();
	}, [selectedTask])

    return (
		<>
			{modal === "edit" && selectedTask && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
					<div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl border border-neutral-800 bg-[#111111] shadow-2xl">
						<div className="flex shrink-0 items-center justify-between border-b border-neutral-800 px-6 py-4">
							<div>
								<h2 className="font-semibold">
									Edit Task
								</h2>

								<p className="mt-1 text-xs text-neutral-400">
									Update task information.
								</p>
							</div>

							<button
								type="button"
								onClick={closeModal}
								className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white"
							>
								<X size={18} />
							</button>
						</div>

						<form className="overflow-y-auto p-6" onSubmit={submitHandler}>
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
								<Input
									label="Task"
									type="text"
									placeholder="Enter task title"
									name="task"
									required
									divClass="md:col-span-2"
									value={editFormData.task}
									onChange={inputHandler}
									errorMessage={editFormErrorData.task}
								/>

								<TextArea
									label="Description"
									divClass="md:col-span-2"
									placeholder="Enter task description"
									row={4}
									name="task_description"
									value={editFormData.task_description}
									onChange={inputHandler}
									errorMessage={editFormErrorData.task_description}
								/>

								{user?.role === "admin" ? (
									<Select
										label="Assign Staff"
										name="assigned_staff"
										options={
											staffs.map((staff) => ({
												label: `${staff.first_name} ${staff.last_name} ${
													staff._id === user._id ? "(Me)" : ""
												}`,
												value: staff._id
											}))
										}
										value={editFormData.assigned_staff}
										onChange={inputHandler}
										errorMessage={editFormErrorData.assigned_staff}
									/>
								) : null}

								<Select
									label="Status"
									name="status"
									options={[
										{
											label: "Pending",
											value: "pending"
										},
										{
											label: "Accepted",
											value: "accepted"
										},
										{
											label: "Completed",
											value: "completed"
										},
										{
											label: "Failed",
											value: "failed"
										}
									]}
									value={editFormData.status}
									onChange={inputHandler}
									errorMessage={editFormErrorData.status}
								/>

								<TextArea
									label="Status Description"
									placeholder="Enter status description"
									row={4}
									name="status_description"
									value={editFormData.status_description}
									onChange={inputHandler}
									errorMessage={editFormErrorData.status_description}
								/>

								<Select
									label="Priority"
									name="priority"
									options={[
										{
											label: "Low",
											value: "low"
										},
										{
											label: "Medium",
											value: "medium"
										},
										{
											label: "High",
											value: "high"
										},
										{
											label: "Urgent",
											value: "urgent"
										}
									]}
									value={editFormData.priority}
									onChange={inputHandler}
									errorMessage={editFormErrorData.priority}
								/>

								<Input
									label="Due Date"
									type="date"
									placeholder="Enter due date"
									name="due_date"
									value={formatDateForInput(editFormData.due_date)}
									onChange={inputHandler}
									errorMessage={editFormErrorData.due_date}
								/>
							</div>

							{/* Buttons */}
							<div className="mt-6 flex justify-end gap-3">
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
											Updating Task...
										</>
									) : (
										"Save Changes"
									)}
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default EditTaskModel;