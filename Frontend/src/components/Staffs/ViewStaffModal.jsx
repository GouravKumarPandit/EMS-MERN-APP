import { X } from "lucide-react";
import TaskCountCard from "../Dashboard/TaskCountCard";
import Button from "../Ui/Button";
import { formatDateTime } from "../../utils/date";

const ViewStaffModal = ({ modal, selectedStaff, closeModal }) => {    
    if (modal !== "view") {
        return null;
    }

    const fullName = `${selectedStaff?.staff?.first_name} ${selectedStaff?.staff?.last_name}`;

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
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/15 text-xl font-bold text-violet-400">
                            {selectedStaff?.staff?.first_name.charAt(0)}
                            {selectedStaff?.staff?.last_name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                {fullName}
                            </h3>

                            <p className="text-sm text-gray-500">
                                @{selectedStaff?.staff?.username}
                            </p>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Info label="First Name" value={selectedStaff?.staff?.first_name} />
                        <Info label="Last Name" value={selectedStaff?.staff?.last_name} />
                        <Info label="Username" value={`@${selectedStaff?.staff?.username}`} />
                        <Info label="Email" value={selectedStaff?.staff?.email} />
                        <Info label="Phone" value={`+${selectedStaff?.staff?.dialcode} ${selectedStaff?.staff?.phone_number}`} />
                        <Info label="Gender" value={selectedStaff?.staff?.gender} />
                        <Info label="Date of Birth" value={formatDateTime(selectedStaff?.staff?.dob)} />
                        <Info label="Role" value={selectedStaff?.staff?.role} />
                        <Info label="Created At" value={formatDateTime(selectedStaff?.staff?.createdAt)} />
                    </div>

                    {/* <TaskStats /> */}
                    <h3 className="text-2xl font-bold mt-8">Staff Task Stats</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <TaskCountCard taskName={"Pending"} taskCount={selectedStaff?.taskStats?.pending} taskDetail="Tasks pending" cardBg="bg-blue-500" hoverBg="hover:border-blue-500/60" />
                        <TaskCountCard taskName={"Completed"} taskCount={selectedStaff?.taskStats?.completed} taskDetail="Tasks completed" cardBg="bg-green-500" hoverBg="hover:border-green-500/60" />
                        <TaskCountCard taskName={"Accepted"} taskCount={selectedStaff?.taskStats?.accepted} taskDetail="Tasks accepted" cardBg="bg-yellow-500" hoverBg="hover:border-yellow-500/60" />
                        <TaskCountCard taskName={"Failed"} taskCount={selectedStaff?.taskStats?.failed} taskDetail="Tasks failed" cardBg="bg-orange-500" hoverBg="hover:border-orange-500/60" />
                    </div>


                    {/* Close */}
                    <div className="mt-6 flex justify-end border-t border-[#252525] pt-5">
                        <Button
                            buttonClass="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-700 transition"
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