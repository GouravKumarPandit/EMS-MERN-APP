import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

const Footer = () => {
    const { companyName } = useSettings();

    return (
        <footer className="border-t border-app-line mt-10">
            <div className="px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-sm text-app-subtle">
                    © {new Date().getFullYear()} {companyName}
                </p>

                <div className="flex items-center gap-4 text-sm text-app-subtle">
                    <Link to="/privacy" className="hover:text-app-text transition">
                        Privacy
                    </Link>
                    <Link to="/terms" className="hover:text-app-text transition">
                        Terms
                    </Link>
                    <span className="flex items-center gap-1">EMS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
