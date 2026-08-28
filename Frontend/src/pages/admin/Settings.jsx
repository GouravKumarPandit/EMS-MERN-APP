import { Building2, Mail, Phone, Upload, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "../../components/Ui/Input";
import Button from "../../components/Ui/Button";
import CancelButton from "../../components/Ui/CancelButton";
import { settings, updateSettings } from "../../api/settings";
import { toast } from "react-toastify";

const Settings = () => {
    const [settingsData, setSettingsData] = useState({});
    const [logoPreview, setLogoPreview] = useState(null);
    const [submitLoader, setSubmitLoader] = useState(false);
    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setSettingsData((prev) => ({
            ...prev, 
            [name]: value
        }));
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const response = await updateSettings(settingsData);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const response = await settings();
                const [ setting ] = response.data.data;
                setSettingsData(setting);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        fetchSetting();
    }, [])

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="text-gray-400 mt-1">
                    Manage your company information and configuration
                </p>
            </div>

            {/* Company Settings Card */}
            <div className="max-w-4xl bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-5 border-b border-neutral-800">
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

                            <p className="text-sm text-gray-500">
                                Update your company details
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submitHandler} >
                    <div className="p-6 space-y-7">
                        <div>
                            <label className="block text-sm font-medium mb-3">
                                Company Logo
                            </label>

                            <div className="flex items-center gap-5">
                                <div className="w-24 h-24 rounded-xl border border-neutral-700 bg-[#181818] flex items-center justify-center overflow-hidden">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Company Logo"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Building2
                                            size={35}
                                            className="text-gray-600"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="company-logo"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1c] border border-neutral-700 hover:border-violet-500 rounded-lg cursor-pointer transition"
                                    >
                                        <Upload size={17} />
                                        <span className="text-sm">
                                            Upload Logo
                                        </span>
                                    </label>

                                    <input
                                        id="company-logo"
                                        type="file"
                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                        className="hidden"
                                        onChange={handleLogoChange}
                                    />

                                    <p className="text-xs text-gray-500 mt-2">
                                        PNG, JPG or WEBP. Maximum size 2MB.
                                    </p>
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
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                />
                                <Input
                                    id="company-name"
                                    type="text"
                                    placeholder="Enter company name"
                                    name="company_name"
                                    className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-violet-500 transition"
                                    value={settingsData?.company_name}
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
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                    <Input
                                        id="company-email"
                                        type="email"
                                        placeholder="company@example.com"
                                        name="company_email"
                                        className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-violet-500 transition"
                                        value={settingsData?.company_email}
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
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                    <Input
                                        id="company-phone"
                                        type="tel"
                                        placeholder="+91 9876543210"
                                        name="company_phone"
                                        className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-violet-500 transition"
                                        value={settingsData?.company_phone}
                                        onChange={inputHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-neutral-800 flex justify-end gap-3">
                        <CancelButton
                            type="button"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-[#1c1c1c] transition"
                        >
                            <X size={17} /> Cancel
                        </CancelButton>

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
        </div>
    );
};

export default Settings;