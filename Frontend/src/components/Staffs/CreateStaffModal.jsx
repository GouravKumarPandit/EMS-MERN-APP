import { X } from "lucide-react";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import CancelButton from "../Ui/CancelButton";
import Select from "../Ui/Select";
import { useState } from "react";
import { createStaff } from "../../api/staff";
import { toast } from "react-toastify";

const CreateStaffModal = ({ modal, closeModal }) => {
    const [submitLoader, setSubmitLoader] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        dialcode: 91,
        phone_number: "",
        gender: "",
        dob: "",
        role: "",
    });
    const [createFormErrorData, setCreateFormErrorData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        dialcode: 91,
        phone_number: "",
        gender: "",
        dob: "",
        role: "",
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

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await createStaff(createFormData);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
            setCreateFormData({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: "",
                dialcode: 91,
                phone_number: "",
                gender: "",
                dob: "",
                role: "",
            });
            setCreateFormErrorData({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: "",
                dialcode: 91,
                phone_number: "",
                gender: "",
                dob: "",
                role: "",
            });
            closeModal();
        } catch (error) {
            error?.response?.data?.errors?.length > 0 ? error.response.data.errors.map((error) => {
                setCreateFormErrorData((prev) => ({
                    ...prev,
                    [error.path]: error.msg
                }))
            }) : toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    if (modal !== "create") {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-app-line bg-app-card shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-app-line bg-app-card px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            Create Staff
                        </h2>

                        <p className="mt-1 text-sm text-app-subtle">
                            Add a new staff member
                        </p>
                    </div>

                    <button
                        onClick={closeModal}
                        className="rounded-lg p-2 text-app-muted hover:bg-app-hover hover:text-app-text"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}
                <form className="p-6" onSubmit={submitHandler}>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Input
                            label="First Name" 
                            type="text"
                            placeholder="Enter first name"
                            name="first_name"
                            required
                            value={createFormData.first_name}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.first_name}
                        />

                        <Input
                            label="Last Name" 
                            type="text"
                            placeholder="Enter last name"
                            name="last_name"
                            required
                            value={createFormData.last_name}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.last_name}
                        />

                        <Input
                            label="Username" 
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            required
                            value={createFormData.username}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.username}
                        />

                        <Input
                            label="Email" 
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            required
                            value={createFormData.email}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.email}
                        />

                        <Input
                            label="Password" 
                            type="password"
                            placeholder="At least 8 characters"
                            name="password"
                            required
                            value={createFormData.password}
                            onChange={inputHandler}
                            errorMessage={createFormErrorData.password}
                        />

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Phone Number
                            </label>

                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    value="91"
                                    name="dialcode"
                                    className="w-20 rounded-lg border border-app-line bg-app-bg px-3 py-2.5 text-app-text outline-none focus:border-violet-500"
                                    onChange={inputHandler}
                                />

                                <Input
                                    type="number"
                                    placeholder="Phone number"
                                    name="phone_number"
                                    value={createFormData.phone_number}
                                    onChange={inputHandler}
                                    errorMessage={createFormErrorData.phone_number}
                                    className="w-62 rounded-lg border border-app-line bg-app-bg px-3 py-2.5 text-app-text outline-none focus:border-violet-500"
                                    // min="10"
                                    // max="10"
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
                            required
                            value={createFormData.role}
                            onChange={inputHandler}
                            options={[
                                { label: "Staff", value: "staff" },
                                { label: "Admin", value: "administrator" }
                            ]}
                            errorMessage={createFormErrorData.role}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-3 border-t border-app-line pt-5">
                        <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                        <Button
                            type="submit"
                            disabled={submitLoader}
                            buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                        >
                            {
                                submitLoader ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        Creating Staff...
                                    </>
                                ) : "Create Staff"
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStaffModal;