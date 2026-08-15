import { X } from "lucide-react";

function Profile({selectedStaff}) {
    const fullName = `${selectedStaff?.first_name} ${selectedStaff?.last_name}`;

    return (
        <>
            <div className="min-h-screen bg-black text-white p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Staff Profile
                    </h1>
                </div>

                <div className="max-w-2xl bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="p-6">
                        {/* Profile */}
                        <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#252525] bg-[#171717] p-5">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 text-xl font-bold text-red-400">
                                {selectedStaff?.first_name?.charAt(0)}
                                {selectedStaff?.last_name?.charAt(0)}
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold">
                                    {fullName}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    @{selectedStaff?.username}
                                </p>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Info label="First Name" value={selectedStaff?.first_name} />
                            <Info label="Last Name" value={selectedStaff?.last_name} />
                            <Info label="Username" value={`@${selectedStaff?.username}`} />
                            <Info label="Email" value={selectedStaff?.email} />
                            <Info label="Phone" value={`+${selectedStaff?.dialcode} ${selectedStaff?.phone_number}`} />
                            <Info label="Gender" value={selectedStaff?.gender} />
                            <Info label="Date of Birth" value={selectedStaff?.dob} />
                            <Info label="Role" value={selectedStaff?.role} />
                            <Info label="Created At" value={selectedStaff?.createdAt} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

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

export default Profile;