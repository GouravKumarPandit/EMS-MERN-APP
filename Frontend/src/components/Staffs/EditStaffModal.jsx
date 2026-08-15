import { X } from "lucide-react";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import CancelButton from "../Ui/CancelButton";
import Select from "../Ui/Select";

const EditStaffModal = ({ modal, selectedStaff, closeModal }) => {

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

                <form className="p-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Input
                            label="First Name" 
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            required="required"
                            defaultValue={selectedStaff.first_name}
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            label="Last Name" 
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            required="required"
                            defaultValue={selectedStaff.last_name}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label="Username" 
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            required="required"
                            value={selectedStaff.username}
                            readOnly
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            label="Email" 
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            required="required"
                            value={selectedStaff.email}
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
                                    defaultValue={selectedStaff.dialcode}
                                    className="w-20 rounded-lg border border-[#303030] bg-[#191919] px-3 py-2.5 text-white outline-none focus:border-red-500"
                                />

                                <input
                                    type="number"
                                    defaultValue={selectedStaff.phone_number}
                                    className="min-w-0 flex-1 rounded-lg border border-[#303030] bg-[#191919] px-4 py-2.5 text-white outline-none focus:border-red-500"
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
                            defaultValue={selectedStaff.gender}
                        />

                        <Input
                            label="Date of Birth" 
                            type="date"
                            placeholder="Enter date of birth"
                            name="dob"
                            defaultValue={selectedStaff.dob}
                            // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Select
                            label="Role"
                            options={[
                                { label: "staff", value: "Staff" },
                                { label: "admin", value: "Administrator" }
                            ]}
                            defaultValue={selectedStaff.role}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-3 border-t border-[#252525] pt-5">
                        <Button type="button" onClick={closeModal}>
                            Cancel
                        </Button>

                        <CancelButton type="submit">
                            Save Changes
                        </CancelButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStaffModal;