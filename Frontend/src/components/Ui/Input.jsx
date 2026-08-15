function Input({ label, labelClass, divClass = "", inputClass = "", ...props }) {
    return (
        <div className={`${divClass}`}>
            {label && <label className={labelClass || "mb-2 block text-sm font-medium"}>{label}</label>}
            <input
                className={`w-full rounded-lg border border-[#303030] bg-[#191919] px-4 py-2.5 text-white outline-none placeholder:text-gray-600 focus:border-red-500 ${inputClass}`}
                {...props}
            />
        </div>
    )
}

export default Input;