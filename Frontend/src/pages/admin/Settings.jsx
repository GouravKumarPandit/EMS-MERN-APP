import { Building2, Mail, Phone, Upload, Save, X } from "lucide-react";
import SettingForm from "../../components/Settings/SettingForm";

const Settings = () => {

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Page Header */}
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
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <Building2
                                size={20}
                                className="text-red-500"
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

                {/* Form */}
                <SettingForm />

                {/* Footer */}
                <div className="px-6 py-4 border-t border-neutral-800 flex justify-end gap-3">

                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-[#1c1c1c] transition"
                    >
                        <X size={17} />

                        Cancel
                    </button>


                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition"
                    >
                        <Save size={17} />

                        Save Changes
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Settings;