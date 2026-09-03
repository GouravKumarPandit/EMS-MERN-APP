import asyncHandler from "../utils/asyncHandler.js";
import { Setting } from "../models/settings.model.js";

export const fetchSetting = asyncHandler(async (req, res) => {
    const setting = await Setting.findOne().lean();

    return res.status(200).json({
        success: true,
        data: setting || {}
    });
});

export const updateSettings = asyncHandler(async (req, res) => {
    const { company_name, company_email, company_phone, privacy_policy, terms_of_service } = req.body;

    const settings = await Setting.findOneAndUpdate(
        {},
        {
            company_name,
            company_email,
            company_phone,
            privacy_policy: privacy_policy || "",
            terms_of_service: terms_of_service || "",
        },
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
