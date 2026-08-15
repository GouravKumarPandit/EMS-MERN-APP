import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function ChangePasswordForm() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <div className="p-6 space-y-6">
                {/* Current Password */}
                <div>
                    <label
                        htmlFor="current-password"
                        className="block text-sm font-medium mb-2"
                    >
                        Current Password
                    </label>

                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            id="current-password"
                            type={showCurrent ? "text" : "password"}
                            placeholder="Enter current password"
                            className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-11 py-3 outline-none focus:border-red-500 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                        >
                            {showCurrent ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="new-password"
                        className="block text-sm font-medium mb-2"
                    >
                        New Password
                    </label>
                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            id="new-password"
                            type={showNew ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-11 py-3 outline-none focus:border-red-500 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                        >
                            {showNew ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium mb-2"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            id="confirm-password"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-11 py-3 outline-none focus:border-red-500 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                        >
                            {showConfirm ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>

                <div className="bg-[#181818] border border-neutral-800 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">
                        Password requirements
                    </p>

                    <ul className="text-xs text-gray-500 space-y-1">
                        <li>• At least 6 characters</li>
                        <li>• Use a combination of letters and numbers</li>
                        <li>• Avoid using easily guessable passwords</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ChangePasswordForm;