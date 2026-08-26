import { AlertTriangle, X } from "lucide-react";
import Button from "../Ui/Button";
import CancelButton from "../Ui/CancelButton";
import { deleteStaff } from "../../api/staff";
import { toast } from "react-toastify";
import { useState } from "react";

const DeleteStaffModal = ({ modal, selectedStaff, closeModal }) => {
    const [submitLoader, setSubmitLoader] = useState(false);
    if (modal !== "delete" || !selectedStaff) {
        return null;
    }

    const fullName = `${selectedStaff.first_name} ${selectedStaff.last_name}`;

    const deleteHandler = async (id) => {
        try {
            const response = await deleteStaff(id);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
            closeModal();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-[#303030] bg-[#111111] shadow-2xl">
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
                        <CancelButton
                            onClick={closeModal}
                            className="rounded-lg border border-[#303030] px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#222] transition"
                        >
                            Cancel
                        </CancelButton>

                        <Button
                            onClick={() => {
                                deleteHandler(selectedStaff._id);
                            }}
                            disabled={submitLoader}
                            buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                        >
                            {
                                submitLoader ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                        Deleting Staff...
                                    </>
                                ) : "Delete Staff"
                            }
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteStaffModal;