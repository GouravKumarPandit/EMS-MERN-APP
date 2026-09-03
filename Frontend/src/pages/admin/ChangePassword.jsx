import { LockKeyhole } from "lucide-react";
import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";

const ChangePassword = () => {

    return (
        <div className="min-h-screen bg-app-bg text-app-text p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Change Password
                </h1>

                <p className="text-app-muted mt-1">
                    Update your account password to keep your account secure
                </p>
            </div>

            <div className="max-w-2xl bg-app-card border border-app-line rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-app-line">
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

                            <p className="text-sm text-app-subtle">
                                Create a strong password for your account
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <ChangePasswordForm />
            </div>
        </div>
    );
};

export default ChangePassword;