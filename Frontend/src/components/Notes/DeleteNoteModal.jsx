import { AlertTriangle, X } from "lucide-react";
import Button from "../Ui/Button";
import CancelButton from "../Ui/CancelButton";
import { toast } from "react-toastify";
import { useState } from "react";
import { deleteNote } from "../../api/note";

const DeleteNoteModal = ({ isDeleteModalOpen, selectedNote, closeDeleteModal }) => {
    const [submitLoader, setSubmitLoader] = useState(false);

    const deleteHandler = async (id) => {
        try {
            const response = await deleteNote(id);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
            closeDeleteModal();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    return (
        <>
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-[#303030] bg-[#111111] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#252525] px-6 py-4">
                            <h2 className="text-lg font-bold">
                                Delete Note
                            </h2>

                            <button
                                onClick={closeDeleteModal}
                                className="rounded-lg p-2 text-gray-400 hover:bg-[#222] hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                                <AlertTriangle size={28} />
                            </div>

                            <h3 className="text-lg font-semibold">
                                Delete {selectedNote?.notes}?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Are you sure you want to delete this note?
                                This action cannot be undone.
                            </p>

                            <div className="mt-6 flex justify-center gap-3">
                                <CancelButton
                                    onClick={closeDeleteModal}
                                    className="rounded-lg border border-[#303030] px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#222] transition"
                                >
                                    Cancel
                                </CancelButton>

                                <Button
                                    onClick={() => {
                                        deleteHandler(selectedNote?._id);
                                    }}
                                    disabled={submitLoader}
                                    buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                                >
                                    {
                                        submitLoader ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                Deleting Note...
                                            </>
                                        ) : "Delete Note"
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteNoteModal;