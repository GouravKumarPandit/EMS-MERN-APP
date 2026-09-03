import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import createError from "../utils/createError.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const taskUploadsDir = path.join(__dirname, "../../uploads/tasks");
export const logoUploadsDir = path.join(__dirname, "../../uploads/logo");

fs.mkdirSync(taskUploadsDir, { recursive: true });
fs.mkdirSync(logoUploadsDir, { recursive: true });

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, taskUploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"].includes(ext)
            ? ext
            : "";
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
        cb(null, true);
        return;
    }

    cb(createError("Only images (JPG, PNG, WEBP, GIF) and PDF files are allowed.", 400));
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5,
    },
});

export const uploadTaskAttachments = (req, res, next) => {
    upload.array("attachments", 5)(req, res, (error) => {
        if (!error) {
            next();
            return;
        }

        if (error instanceof multer.MulterError) {
            if (error.code === "LIMIT_FILE_SIZE") {
                return next(createError("Each file must be 5MB or smaller.", 400));
            }
            if (error.code === "LIMIT_FILE_COUNT") {
                return next(createError("You can upload up to 5 attachments.", 400));
            }
            return next(createError(error.message, 400));
        }

        next(error);
    });
};

export const mapUploadedFiles = (files = []) =>
    files.map((file) => ({
        original_name: file.originalname,
        file_name: file.filename,
        path: `/uploads/tasks/${file.filename}`,
        mime_type: file.mimetype,
        size: file.size,
    }));

export const deleteTaskFiles = (attachments = []) => {
    attachments.forEach((attachment) => {
        if (!attachment?.file_name) return;
        const filePath = path.join(taskUploadsDir, path.basename(attachment.file_name));
        fs.unlink(filePath, () => {});
    });
};

const LOGO_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
];

const logoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, logoUploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) ? ext : "";
        cb(null, `logo-${Date.now()}${safeExt}`);
    },
});

const logoUpload = multer({
    storage: logoStorage,
    fileFilter: (req, file, cb) => {
        if (LOGO_TYPES.includes(file.mimetype)) {
            cb(null, true);
            return;
        }
        cb(createError("Logo must be a JPG, PNG, WEBP, or GIF image.", 400));
    },
    limits: {
        fileSize: 2 * 1024 * 1024,
        files: 1,
    },
});

export const uploadCompanyLogo = (req, res, next) => {
    logoUpload.single("logo")(req, res, (error) => {
        if (!error) {
            next();
            return;
        }

        if (error instanceof multer.MulterError) {
            if (error.code === "LIMIT_FILE_SIZE") {
                return next(createError("Logo must be 2MB or smaller.", 400));
            }
            return next(createError(error.message, 400));
        }

        next(error);
    });
};

export const mapLogoFile = (file) => {
    if (!file) return null;
    return {
        original_name: file.originalname,
        file_name: file.filename,
        path: `/uploads/logo/${file.filename}`,
    };
};

export const deleteLogoFile = (logo) => {
    if (!logo?.file_name) return;
    const filePath = path.join(logoUploadsDir, path.basename(logo.file_name));
    fs.unlink(filePath, () => {});
};

