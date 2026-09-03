import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

const Footer = () => {
    const { companyName } = useSettings();

    return (
        <footer className="border-t border-neutral-800 mt-10">
            <div className="px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} {companyName}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <Link to="/privacy" className="hover:text-white transition">
                        Privacy
                    </Link>
                    <Link to="/terms" className="hover:text-white transition">
                        Terms
                    </Link>
                    <span className="flex items-center gap-1">EMS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
