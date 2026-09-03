function CancelButton({ children, buttonClass = "", ...props }) {
    return (
        <button
            className={`rounded-lg border border-app-line px-5 py-2.5 text-sm font-medium text-app-muted hover:bg-app-hover transition ${buttonClass}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default CancelButton;