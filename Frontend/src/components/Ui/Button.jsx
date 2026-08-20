function Button({ children, buttonClass = "", ...props }) {
    return (
        <button
            className={`rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition cursor-pointer ${buttonClass}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;