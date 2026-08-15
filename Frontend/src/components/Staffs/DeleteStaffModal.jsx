import { AlertTriangle, X } from "lucide-react";

const DeleteStaffModal = ({
    modal,
    selectedStaff,
    closeModal,
}) => {

    if (modal !== "delete" || !selectedStaff) {
        return null;
    }

    const fullName = `${selectedStaff.first_name} ${selectedStaff.last_name}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl border border-[#303030] bg-[#111111] shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#252525] px-6 py-4">

                    <h2 className="text-lg font-bold">
                        Delete Staff
                    </h2>

                    <button
                        onClick={closeModal}
                        className="rounded-lg p-2 text-gray-400 hover:bg-[#222] hover:text-white"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Content */}
                <div className="p-6 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                        <AlertTriangle size={28} />
                    </div>

                    <h3 className="text-lg font-semibold">
                        Delete {fullName}?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Are you sure you want to delete this staff member?
                        This action cannot be undone.
                    </p>

                    <div className="mt-6 flex justify-center gap-3">

                        <button
                            onClick={closeModal}
                            className="rounded-lg border border-[#303030] px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#222] transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => {
                                // Delete functionality will be implemented later
                                closeModal();
                            }}
                            className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold hover:bg-red-600 transition"
                        >
                            Delete Staff
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DeleteStaffModal;