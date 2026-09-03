import { Building2, Mail, Phone, Save, Shield, FileText, ExternalLink, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Ui/Input";
import Button from "../../components/Ui/Button";
import TextArea from "../../components/Ui/TextArea";
import { updateSettings } from "../../api/settings";
import { toast } from "react-toastify";
import { useSettings } from "../../context/SettingsContext";

const Settings = () => {
    const { settings, refreshSettings, logoUrl } = useSettings();
    const [settingsData, setSettingsData] = useState({
        company_name: "",
        company_email: "",
        company_phone: "",
        privacy_policy: "",
        terms_of_service: "",
    });
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [removeLogo, setRemoveLogo] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setSettingsData((prev) => ({
            ...prev, 
            [name]: value
        }));
    }

    const handleLogoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLogoFile(file);
        setRemoveLogo(false);
        setLogoPreview(URL.createObjectURL(file));
        event.target.value = "";
    }

    const handleRemoveLogo = () => {
        setLogoFile(null);
        setLogoPreview("");
        setRemoveLogo(true);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setSubmitLoader(true);
        
        try {
            const formData = new FormData();
            Object.entries(settingsData).forEach(([key, value]) => {
                formData.append(key, value ?? "");
            });
            if (logoFile) {
                formData.append("logo", logoFile);
            }
            if (removeLogo) {
                formData.append("remove_logo", "true");
            }

            const response = await updateSettings(formData);
            if(response.data.success){
                toast.success(response?.data?.message);
                setLogoFile(null);
                setRemoveLogo(false);
                await refreshSettings();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update settings");
        } finally{
            setSubmitLoader(false);
        }
    }

    useEffect(() => {
        setSettingsData({
            company_name: settings.company_name || "",
            company_email: settings.company_email || "",
            company_phone: settings.company_phone || "",
            privacy_policy: settings.privacy_policy || "",
            terms_of_service: settings.terms_of_service || "",
        });
        if (!logoFile) {
            setLogoPreview(removeLogo ? "" : (logoUrl || ""));
        }
    }, [settings, logoUrl]);

    return (
        <div className="min-h-screen bg-app-bg text-app-text p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="text-app-muted mt-1">
                    Manage your company information and configuration
                </p>
            </div>

            <form onSubmit={submitHandler} className="max-w-4xl space-y-6">
                <div className="bg-app-card border border-app-line rounded-2xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-app-line">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                <Building2
                                    size={20}
                                    className="text-violet-500"
                                />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">
                                    Company Information
                                </h2>

                                <p className="text-sm text-app-subtle">
                                    Update your company details
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-7">
                        <div>
                            <label className="block text-sm font-medium mb-3">
                                Company Logo
                            </label>
                            <p className="mb-3 text-xs text-app-subtle">
                                JPG, PNG, WEBP or GIF. Maximum 2MB. If no logo is set, the company name is shown instead.
                            </p>

                            <div className="flex items-center gap-5">
                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-app-line bg-app-soft">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Company logo"
                                            className="h-full w-full object-contain p-2"
                                        />
                                    ) : (
                                        <Building2 size={35} className="text-app-subtle" />
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <label
                                        htmlFor="company-logo"
                                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-app-line bg-app-hover px-4 py-2.5 text-sm transition hover:border-violet-500"
                                    >
                                        <Upload size={17} />
                                        Upload Logo
                                    </label>
                                    <input
                                        id="company-logo"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                                        className="hidden"
                                        onChange={handleLogoChange}
                                    />
                                    {logoPreview ? (
                                        <button
                                            type="button"
                                            onClick={handleRemoveLogo}
                                            className="inline-flex items-center gap-2 rounded-lg border border-app-line px-4 py-2.5 text-sm text-red-400 transition hover:border-red-500"
                                        >
                                            <X size={17} />
                                            Remove
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="company-name"
                                className="block text-sm font-medium mb-2"
                            >
                                Company Name
                            </label>

                            <div className="relative">
                                <Building2
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-app-subtle"
                                />
                                <Input
                                    id="company-name"
                                    type="text"
                                    placeholder="Enter company name"
                                    name="company_name"
                                    className="w-full bg-app-soft border border-app-line rounded-lg pl-10 pr-4 py-3 outline-none focus:border-violet-500 transition"
                                    value={settingsData?.company_name || ""}
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="company-email"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Company Email
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-app-subtle"
                                    />
                                    <Input
                                        id="company-email"
                                        type="email"
                                        placeholder="company@example.com"
                                        name="company_email"
                                        className="w-full bg-app-soft border border-app-line rounded-lg pl-10 pr-4 py-3 outline-none focus:border-violet-500 transition"
                                        value={settingsData?.company_email || ""}
                                        onChange={inputHandler}
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="company-phone"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Company Phone
                                </label>
                                <div className="relative">
                                    <Phone
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-app-subtle"
                                    />
                                    <Input
                                        id="company-phone"
                                        type="tel"
                                        placeholder="+91 9876543210"
                                        name="company_phone"
                                        className="w-full bg-app-soft border border-app-line rounded-lg pl-10 pr-4 py-3 outline-none focus:border-violet-500 transition"
                                        value={settingsData?.company_phone || ""}
                                        onChange={inputHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-app-card border border-app-line rounded-2xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-app-line">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                    <Shield
                                        size={20}
                                        className="text-violet-500"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Privacy Policy
                                    </h2>
                                    <p className="text-sm text-app-subtle">
                                        Stored text shown on the Privacy page
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/privacy"
                                className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
                            >
                                View page <ExternalLink size={14} />
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <TextArea
                            label="Privacy Policy"
                            placeholder="Write your privacy policy..."
                            name="privacy_policy"
                            row={8}
                            value={settingsData.privacy_policy}
                            onChange={inputHandler}
                            inputClass="min-h-40 bg-app-soft border-app-line"
                        />
                    </div>
                </div>

                <div className="bg-app-card border border-app-line rounded-2xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-app-line">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                    <FileText
                                        size={20}
                                        className="text-violet-500"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Terms of Service
                                    </h2>
                                    <p className="text-sm text-app-subtle">
                                        Stored text shown on the Terms page
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/terms"
                                className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
                            >
                                View page <ExternalLink size={14} />
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        <TextArea
                            label="Terms of Service"
                            placeholder="Write your terms of service..."
                            name="terms_of_service"
                            row={8}
                            value={settingsData.terms_of_service}
                            onChange={inputHandler}
                            inputClass="min-h-40 bg-app-soft border-app-line"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={submitLoader}
                        buttonClass="flex items-center justify-center gap-2 rounded-xl py-3"
                    >
                        {submitLoader ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Saving...
                            </>
                        ) : (
                            <><Save size={17} /> Save Changes</>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
