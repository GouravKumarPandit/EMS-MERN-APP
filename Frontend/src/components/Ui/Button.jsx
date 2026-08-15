function Button({ children, buttonClass = "", ...props }) {
    return (
        <button
            className={`rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition ${buttonClass}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;