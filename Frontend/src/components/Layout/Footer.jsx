const Footer = () => {
    return (
        <footer className="border-t border-neutral-800 mt-10">
            <div className="px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} My Company
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="hover:text-white cursor-pointer transition">Privacy</span>
                    <span className="hover:text-white cursor-pointer transition">Terms</span>
                    <span className="flex items-center gap-1">EMS</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;