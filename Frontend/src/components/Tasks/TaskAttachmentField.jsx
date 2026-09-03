import { Paperclip, X } from "lucide-react";
import { getAttachmentUrl, isImageAttachment } from "../../utils/taskForm";

function TaskAttachmentField({
    files,
    onFilesChange,
    existingAttachments = [],
    onRemoveExisting,
}) {
    const remainingSlots = Math.max(0, 5 - existingAttachments.length - files.length);

    const handleFileChange = (event) => {
        const selected = Array.from(event.target.files || []);
        if (!selected.length) return;

        onFilesChange([...files, ...selected].slice(0, remainingSlots + files.length));
        event.target.value = "";
    };

    return (
        <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-app-muted">
                Attachments
            </label>
            <p className="mb-3 text-xs text-app-subtle">
                Images or PDF, up to 5 files, 5MB each.
            </p>

            {existingAttachments.length > 0 && (
                <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {existingAttachments.map((attachment) => (
                        <div
                            key={attachment.file_name}
                            className="relative overflow-hidden rounded-lg border border-app-line bg-app-bg"
                        >
                            {isImageAttachment(attachment.mime_type) ? (
                                <img
                                    src={getAttachmentUrl(attachment.path)}
                                    alt={attachment.original_name}
                                    className="h-24 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-24 items-center justify-center px-2 text-center text-xs text-app-muted">
                                    {attachment.original_name}
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => onRemoveExisting(attachment.file_name)}
                                className="absolute right-1 top-1 rounded-full bg-black/80 p-1 text-white hover:bg-red-600"
                                title="Remove"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {files.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {files.map((file, index) => (
                        <span
                            key={`${file.name}-${index}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-app-line bg-app-bg px-3 py-1.5 text-xs text-app-muted"
                        >
                            {file.name}
                            <button
                                type="button"
                                onClick={() => onFilesChange(files.filter((_, i) => i !== index))}
                                className="text-app-subtle hover:text-red-400"
                            >
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {remainingSlots > 0 && (
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-app-line px-4 py-3 text-sm text-app-muted transition hover:border-violet-500 hover:text-app-text">
                    <Paperclip size={16} />
                    Add files
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}
        </div>
    );
}

export default TaskAttachmentField;
