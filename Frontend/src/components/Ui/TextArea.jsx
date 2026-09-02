import ValidationError from "./ValidationError";

function TextArea({ label, labelClass = "", divClass = "", inputClass = "", errorMessage = "", ...props }) {
    return (
        <div className={`md:col-span-2 ${divClass}`}>
            {label && <label className={`mb-2 block text-sm text-neutral-300 ${labelClass}`}>{label}</label>}
            <textarea
                {...props}
                className={`w-full resize-none rounded-lg border border-neutral-800 bg-black px-3 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-violet-500 ${inputClass}`}
            />
            {
                errorMessage && <ValidationError error={errorMessage} /> 
            }
        </div>
    )
}

export default TextArea;