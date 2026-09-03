import ValidationError from "./ValidationError";

export default function Select({ label, options = [], required = false, divClass = "", selectClass = "", labelClass = "", errorMessage = "", ...props }) {
    return (
        <div className={divClass}>
            {label && <label className={`mb-2 block text-sm text-app-muted ${labelClass}`}>
                {label}
                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>}
            <select
                className={`h-11 w-full rounded-lg border border-app-line bg-app-field px-3 text-sm text-app-muted outline-none focus:border-violet-500 ${selectClass}`}
                {...props}
            >
                <option value="" >Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {
                errorMessage && <ValidationError error={errorMessage} /> 
            }
        </div>
    )
}
