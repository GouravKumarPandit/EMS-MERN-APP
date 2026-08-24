import { X } from "lucide-react";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import CancelButton from "../Ui/CancelButton";
import Select from "../Ui/Select";
import { toast } from "react-toastify";
import { useState } from "react";
import { updateStaff } from "../../api/staff";

const EditStaffModal = ({ modal, selectedStaff, createFormData, inputHandler, createFormErrorData, setCreateFormErrorData, closeModal }) => {
    const [submitLoader, setSubmitLoader] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await updateStaff(selectedStaff._id, createFormData);
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

    if (modal !== "edit" || !selectedStaff) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#303030] bg-[#111111] shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#252525] bg-[#111111] px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            Edit Staff
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update staff information
                        </p>
                    </div>

                    <Button
                        buttonClass="rounded-lg p-2 text-gray-400 hover:bg-[#222] hover:text-white"
                        onClick={closeModal}
                    >
                        <X size={20} />
                    </Button>
                </div>

                <form className="p-6" onSubmit={submitHandler}>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Input
                            label="First Name" 
                            type="text"
                            placeholder="Enter first name"
                            name="first_name"
                            required="required"
                            value={createFormData.first_name}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.first_name}
                        />
                        <Input
                            label="Last Name" 
                            type="text"
                            placeholder="Enter last name"
                            name="last_name"
                            required="required"
                            value={createFormData.last_name}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.last_name}
                        />

                        <Input
                            label="Username" 
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            required="required"
                            value={selectedStaff.username}
                            readOnly
                        />

                        <Input
                            label="Email" 
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            required="required"
                            value={createFormData.email}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.email}
                        />

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Phone Number
                            </label>

                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    value={createFormData.dialcode}
                                    name="dialcode"
                                    className="w-20 rounded-lg border border-[#303030] bg-[#191919] px-3 py-2.5 text-white outline-none focus:border-violet-500"
                                    onChange={inputHandler}
                                />

                                <Input
                                    type="number"
                                    name="phone_number"
                                    className="min-w-0 flex-1 rounded-lg border border-[#303030] bg-[#191919] px-4 py-2.5 text-white outline-none focus:border-violet-500"
                                    value={createFormData.phone_number}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.phone_number}
                                />
                            </div>
                        </div>

                        <Select
                            label="Gender"
                            name="gender"
                            options={[
                                { label: "Male", value: "Male" },
                                { label: "Female", value: "Female" },
                                { label: "Others", value: "Others" }
                            ]}
                            value={createFormData.gender}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.gender}
                        />

                        <Input
                            label="Date of Birth" 
                            type="date"
                            placeholder="Enter date of birth"
                            name="dob"
                            value={createFormData.dob}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.dob}
                        />

                        <Select
                            label="Role"
                            name="role"
                            options={[
                                { label: "Staff", value: "staff" },
                                { label: "Admin", value: "administrator" }
                            ]}
                            value={createFormData.role}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.role}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-3 border-t border-[#252525] pt-5">
                        <CancelButton type="button" onClick={closeModal}>
                            Cancel
                        </CancelButton>

                        <Button
                            type="submit"
                            disabled={submitLoader}
                            buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                        >
                            {
                                submitLoader ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        Updating Staff...
                                    </>
                                ) : "Save Changes"
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStaffModal;