import asyncHandler from "../utils/asyncHandler.js";
import { Setting } from "../models/settings.model.js";
import { deleteLogoFile, mapLogoFile } from "../middleware/upload.middleware.js";

export const fetchSetting = asyncHandler(async (req, res) => {
    const setting = await Setting.findOne().lean();

    return res.status(200).json({
        success: true,
        data: setting || {}
    });
});

export const updateSettings = asyncHandler(async (req, res) => {
    const { company_name, company_email, company_phone, privacy_policy, terms_of_service, remove_logo } = req.body;
    const current = await Setting.findOne().lean();

    const payload = {
        company_name,
        company_email,
        company_phone,
        privacy_policy: privacy_policy || "",
        terms_of_service: terms_of_service || "",
    };

    if (req.file) {
        deleteLogoFile(current?.company_logo);
        payload.company_logo = mapLogoFile(req.file);
    } else if (remove_logo === "true") {
        deleteLogoFile(current?.company_logo);
        payload.company_logo = {
            original_name: "",
            file_name: "",
            path: "",
        };
    }

    const settings = await Setting.findOneAndUpdate(
        {},
        payload,
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    );

    return res.status(200).json({
        success: true,
        message: "Settings updated successfully!",
        data: settings
    });
});
