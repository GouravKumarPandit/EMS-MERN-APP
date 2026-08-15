function CancelButton({ children, buttonClass = "", ...props }) {
    return (
        <button
            className={`rounded-lg border border-[#303030] px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#222] transition ${buttonClass}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default CancelButton;