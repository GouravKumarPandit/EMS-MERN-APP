import { LockKeyhole, Save, X } from "lucide-react";
import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";

const ChangePassword = () => {

    return (
        <div className="min-h-screen bg-black text-white p-6">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Change Password
                </h1>

                <p className="text-gray-400 mt-1">
                    Update your account password to keep your account secure
                </p>
            </div>

            {/* Password Card */}
            <div className="max-w-2xl bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden">

                {/* Card Header */}
                <div className="px-6 py-5 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                            <LockKeyhole
                                size={20}
                                className="text-violet-500"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">
                                Password Security
                            </h2>

                            <p className="text-sm text-gray-500">
                                Create a strong password for your account
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <ChangePasswordForm />

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
                        className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium transition"
                    >
                        <Save size={17} />
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;