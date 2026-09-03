import { X } from 'lucide-react';
import { createNotes, updateNote } from '../../api/note';
import { toast } from 'react-toastify';
import Input from '../Ui/Input';
import TextArea from '../Ui/TextArea';
import Button from '../Ui/Button';
import CancelButton from '../Ui/CancelButton';

function CreateEditNote({ isModalOpen, modalMode, setFormData, closeModal, formData, inputHandler }) {
    const submitNote = async (event) => {
        event.preventDefault();
        
        try {
            if(modalMode === "create"){
                const response = await createNotes(formData);
                if(response.data.success){
                    toast.success(response?.data?.message);
                }
                setFormData({
                    notes: "",
                    notes_description: "",
                });
                closeModal();
            } else{
                const response = await updateNote(formData.id, formData);
                if(response.data.success){
                    toast.success(response?.data?.message);
                }
                setFormData({
                    id: "",
                    notes: "",
                    notes_description: "",
                });
                closeModal();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
                <div className="w-full max-w-lg overflow-hidden rounded-xl border border-app-line bg-app-card shadow-2xl">
                    <div className="flex items-center justify-between border-b border-app-line px-6 py-5">
                        <div>
                            <h2 className="text-lg font-semibold">
                                {modalMode === "create"
                                    ? "Create Note"
                                    : "Edit Note"}
                            </h2>

                            <p className="mt-1 text-xs text-app-subtle">
                                {modalMode === "create"
                                    ? "Create a new personal note."
                                    : "Update your note details."}
                            </p>
                        </div>

                        <button
                            onClick={closeModal}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-app-subtle hover:bg-app-hover hover:text-app-text">
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={submitNote}>
                        <div className="space-y-5 p-6">
                            <Input
                                type="text"
                                required
                                name="notes"
                                value={formData.notes}
                                onChange={inputHandler}
                                placeholder="Enter note title"                                
                            />
                            <TextArea
                                name="notes_description"
                                required
                                value={formData.notes_description}
                                onChange={inputHandler}
                                rows={7}
                                placeholder="Write your note..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 border-t border-app-line px-6 py-4">
                            <CancelButton
                                type="button"
                                onClick={closeModal}
                                className="rounded-lg border border-app-line px-5 py-2.5 text-sm font-medium text-app-muted transition hover:bg-app-hover hover:text-app-text">Cancel
                            </CancelButton>

                            <Button
                                type="submit"
                                className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500">
                                {modalMode === "create"
                                    ? "Create Note"
                                    : "Update Note"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default CreateEditNote;