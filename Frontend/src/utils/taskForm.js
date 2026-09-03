const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getAttachmentUrl = (filePath = "") => {
    if (!filePath) return "";
    if (filePath.startsWith("http")) return filePath;
    return `${API_BASE}${filePath}`;
};

export const isImageAttachment = (mimeType = "") => mimeType.startsWith("image/");

export const buildTaskFormData = (fields, files = [], removedAttachments = []) => {
    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value ?? "");
    });

    files.forEach((file) => {
        formData.append("attachments", file);
    });

    if (removedAttachments.length) {
        formData.append("removed_attachments", JSON.stringify(removedAttachments));
    }

    return formData;
};
