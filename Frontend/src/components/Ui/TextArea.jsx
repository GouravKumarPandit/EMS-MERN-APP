import ValidationError from "./ValidationError";

function TextArea({ label, labelClass = "", divClass = "", inputClass = "", errorMessage = "", ...props }) {
    return (
        <div className={`md:col-span-2 ${divClass}`}>
            {label && <label className={`mb-2 block text-sm text-app-muted ${labelClass}`}>{label}</label>}
            <textarea
                {...props}
                className={`w-full resize-none rounded-lg border border-app-line bg-app-field px-3 py-3 text-sm outline-none placeholder:text-app-muted focus:border-violet-500 ${inputClass}`}
            />
            {
                errorMessage && <ValidationError error={errorMessage} /> 
            }
        </div>
    )
}

export default TextArea;