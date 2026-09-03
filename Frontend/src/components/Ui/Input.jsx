import ValidationError from "./ValidationError";

function Input({ label, labelClass, required = false, divClass = "", inputClass = "", errorMessage = "", ...props }) {
    return (
        <>
            <div className={`${divClass}`}>
                {label && <label className={labelClass || "mb-2 block text-sm font-medium"}>
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>}
                <input
                    className={`w-full rounded-lg border border-app-line bg-app-field px-4 py-2.5 text-app-text outline-none placeholder:text-app-subtle focus:border-violet-500 ${inputClass}`}
                    {...props}
                />
                {
                    errorMessage && <ValidationError error={errorMessage} /> 
                }
            </div>
        </>
    )
}

export default Input;