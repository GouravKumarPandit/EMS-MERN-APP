export default function Select({ label, options = [], divClass = "", selectClass = "", labelClass = "", ...props }) {
    return (
        <div className={divClass}>
            {label && <label className={`mb-2 block text-sm text-neutral-300 ${labelClass}`}>{label}</label>}
            <select
                className={`h-11 w-full rounded-lg border border-neutral-800 bg-black px-3 text-sm text-neutral-400 outline-none focus:border-violet-500 ${selectClass}`}
                {...props}
            >
                <option >Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
