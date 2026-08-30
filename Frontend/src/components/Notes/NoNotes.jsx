import { FileText, Plus } from 'lucide-react';

function NoNotes({ cardHeading, cardDescription, buttonText, openCreateModal }) {
    return (
        <div className="flex min-h-[450px] flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-950">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
                <FileText
                    size={28}
                    className="text-violet-500"
                />
            </div>

            <h3 className="text-lg font-semibold text-white">
                {cardHeading}
            </h3>

            <p className="mt-2 max-w-sm text-center text-sm leading-6 text-neutral-500">
                {cardDescription}
            </p>

            <button
                onClick={openCreateModal}
                className="mt-6 flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
            >
                <Plus size={18} />
                {buttonText}
            </button>
        </div>
    )
}

export default NoNotes