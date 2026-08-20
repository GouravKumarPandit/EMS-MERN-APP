import { X } from "lucide-react";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import CancelButton from "../Ui/CancelButton";
import Select from "../Ui/Select";

const CreateStaffModal = ({ modal, closeModal }) => {

    if (modal !== "create") {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#303030] bg-[#111111] shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#252525] bg-[#111111] px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            Create Staff
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a new staff member
                        </p>
                    </div>

                    <button
                        onClick={closeModal}
                        className="rounded-lg p-2 text-gray-400 hover:bg-[#222] hover:text-white"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}
                <form className="p-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Input
                            label="First Name" 
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            required="required"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label="Last Name" 
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            required="required"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label="Username" 
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            required="required"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label="Email" 
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            required="required"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label="Password" 
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            required="required"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Phone Number
                            </label>

                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value="91"
                                    className="w-20 rounded-lg border border-[#303030] bg-[#191919] px-3 py-2.5 text-white outline-none focus:border-violet-500"
                                />

                                <input
                                    type="number"
                                    placeholder="Phone number"
                                    className="min-w-0 flex-1 rounded-lg border border-[#303030] bg-[#191919] px-4 py-2.5 text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
                                />
                            </div>
                        </div>

                        <Select
                            label="Gender"
                            options={[
                                { label: "male", value: "Male" },
                                { label: "female", value: "Female" },
                                { label: "others", value: "Others" }
                            ]}
                        />

                        <Input
                            label="Date of Birth" 
                            type="date"
                            placeholder="Enter date of birth"
                            name="dob"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Select
                            label="Role"
                            options={[
                                { label: "staff", value: "Staff" },
                                { label: "admin", value: "Administrator" }
                            ]}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-3 border-t border-[#252525] pt-5">
                        <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                        <Button type="submit">Create Staff</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStaffModal;