import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import { Shield, FileText } from "lucide-react";

function LegalPage({ type }) {
    const { settings, companyName } = useSettings();
    const isPrivacy = type === "privacy";
    const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
    const content = isPrivacy ? settings.privacy_policy : settings.terms_of_service;
    const Icon = isPrivacy ? Shield : FileText;

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                        <Icon size={20} className="text-violet-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            {companyName}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl rounded-2xl border border-neutral-800 bg-[#111111] p-6">
                {content?.trim() ? (
                    <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-300">
                        {content}
                    </p>
                ) : (
                    <p className="text-sm text-neutral-500">
                        No {title.toLowerCase()} has been published yet.
                    </p>
                )}
            </div>

            <div className="mt-6 flex gap-4 text-sm">
                <Link to="/privacy" className={`transition ${isPrivacy ? "text-violet-400" : "text-neutral-400 hover:text-white"}`}>
                    Privacy Policy
                </Link>
                <Link to="/terms" className={`transition ${!isPrivacy ? "text-violet-400" : "text-neutral-400 hover:text-white"}`}>
                    Terms of Service
                </Link>
            </div>
        </div>
    );
}

export default LegalPage;
