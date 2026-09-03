import { LockKeyhole, Eye, EyeOff, Save, X } from "lucide-react";
import { useState } from "react";
import Button from "../Ui/Button";
import CancelButton from "../Ui/CancelButton";
import { changePassword } from "../../api/staff";
import { toast } from "react-toastify";
import Input from "../Ui/Input";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ChangePasswordForm() {
    const { user } = useAuth();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            setSubmitLoader(true);
            const response = await changePassword(user._id, formData);
            if(response.data.success){
                toast.success(response?.data?.message);
            }
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setSubmitLoader(false);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="p-6 space-y-6">
                {/* Current Password */}
                <div>
                    <label
                        htmlFor="current-password"
                        className="block text-sm font-medium mb-2"
                    >
                        Current Password
                        <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                            id="current-password"
                            type={showCurrent ? "text" : "password"}
                            placeholder="Enter current password"
                            className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-11 py-3 outline-none focus:border-violet-500 transition"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={inputHandler}
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
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                            id="new-password"
                            type={showNew ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-11 py-3 outline-none focus:border-violet-500 transition"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={inputHandler}
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
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <LockKeyhole
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <Input
                            id="confirm-password"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="w-full bg-[#181818] border border-neutral-700 rounded-lg pl-10 pr-11 py-3 outline-none focus:border-violet-500 transition"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={inputHandler}
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
                        <li>• At least 8 characters</li>
                        <li>• Use a combination of letters and numbers</li>
                        <li>• Avoid using easily guessable passwords</li>
                    </ul>
                </div>
            </div>

            <div className="px-6 py-4 border-t border-neutral-800 flex justify-end gap-3">
                <Button
                    type="submit"
                    disabled={submitLoader}
                    buttonClass="flex items-center gap-2"
                >
                    <Save size={17} />
                    {
                        submitLoader ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Saving...
                            </>
                        ) : "Change Password"
                    }
                </Button>

                <CancelButton
                    type="button"
                    onClick={() => (navigate("/dashboard"))}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-[#1c1c1c] transition"
                >
                    <X size={17} />
                    Cancel
                </CancelButton>
            </div>
        </form>
    )
}

export default ChangePasswordForm;