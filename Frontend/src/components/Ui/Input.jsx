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
                    className={`w-full rounded-lg border border-[#303030] bg-black px-4 py-2.5 text-white outline-none placeholder:text-gray-600 focus:border-violet-500 ${inputClass}`}
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