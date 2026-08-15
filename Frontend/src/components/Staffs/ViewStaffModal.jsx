import { X } from "lucide-react";
import TaskCountCard from "../Dashboard/TaskCountCard";
import Button from "../Ui/Button";

const ViewStaffModal = ({
    modal,
    selectedStaff,
    closeModal,
}) => {

    if (modal !== "view" || !selectedStaff) {
        return null;
    }

    const fullName = `${selectedStaff.first_name} ${selectedStaff.last_name}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#303030] bg-[#111111] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#252525] px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            Staff Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            View staff information
                        </p>
                    </div>
                    <Button
                        buttonClass="rounded-lg p-2 text-gray-400 hover:bg-[#222] hover:text-white"
                        onClick={closeModal}
                    >
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#252525] bg-[#171717] p-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 text-xl font-bold text-red-400">
                            {selectedStaff.first_name.charAt(0)}
                            {selectedStaff.last_name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                {fullName}
                            </h3>

                            <p className="text-sm text-gray-500">
                                @{selectedStaff.username}
                            </p>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Info label="First Name" value={selectedStaff.first_name} />
                        <Info label="Last Name" value={selectedStaff.last_name} />
                        <Info label="Username" value={`@${selectedStaff.username}`} />
                        <Info label="Email" value={selectedStaff.email} />
                        <Info label="Phone" value={`+${selectedStaff.dialcode} ${selectedStaff.phone_number}`} />
                        <Info label="Gender" value={selectedStaff.gender} />
                        <Info label="Date of Birth" value={selectedStaff.dob} />
                        <Info label="Role" value={selectedStaff.role} />
                        <Info label="Created At" value={selectedStaff.createdAt} />
                    </div>

                    {/* <TaskStats /> */}
                    <h3 className="text-2xl font-bold mt-8">Staff Task Stats</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <TaskCountCard taskName={"New Task"} taskCount="0" taskDetail="Tasks assigned to you" cardBg="bg-blue-500" hoverBg="hover:border-blue-500/60" />
                        <TaskCountCard taskName={"Completed"} taskCount="3" taskDetail="Tasks completed" cardBg="bg-green-500" hoverBg="hover:border-green-500/60" />
                        <TaskCountCard taskName={"Accepted"} taskCount="0" taskDetail="Tasks accepted" cardBg="bg-yellow-500" hoverBg="hover:border-yellow-500/60" />
                        <TaskCountCard taskName={"Failed"} taskCount="1" taskDetail="Tasks failed" cardBg="bg-orange-500" hoverBg="hover:border-orange-500/60" />
                    </div>


                    {/* Close */}
                    <div className="mt-6 flex justify-end border-t border-[#252525] pt-5">
                        <Button
                            buttonClass="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold hover:bg-red-600 transition"
                            onClick={closeModal}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Info = ({ label, value }) => {
    return (
        <div className="rounded-lg border border-[#252525] bg-[#171717] p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
                {label}
            </p>
            <p className="mt-1 break-words text-sm text-gray-200 capitalize">
                {value || "Not provided"}
            </p>
        </div>
    );
};

export default ViewStaffModal;