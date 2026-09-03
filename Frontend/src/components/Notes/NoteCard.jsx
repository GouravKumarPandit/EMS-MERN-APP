import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import { formatDateTime } from '../../utils/date';
import { useState } from 'react';

function NoteCard({ note, color, openEditModal, openDeleteModal }) {
    const [expandedNote, setExpandedNote] = useState(null);
    const toggleNoteDetail = (noteId) => {
        setExpandedNote((prev) =>
            prev === noteId ? null : noteId
        );
    };
    const isExpanded = expandedNote === note.id;

    return (
        <>
            <div
                key={note.notes_id}
                className={`group overflow-hidden rounded-xl border ${color.border} ${color.bg} transition duration-200 hover:-translate-y-0.5 hover:border-opacity-60`}>

                {/* Card Header */}
                <div className="flex items-start justify-between p-5">
                    <div className="flex min-w-0 items-start gap-3">
                        <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${color.icon}`} />
                        <div className="min-w-0">
                            <h2 className={`truncate text-base font-semibold ${color.notes}`}>
                                {note.notes}
                            </h2>
                            <p className="mt-1 text-xs text-app-muted">
                                {formatDateTime(note.createdAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => openEditModal(note)}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-app-subtle transition hover:bg-app-hover hover:text-app-text">
                            <Edit2 size={16} />
                        </button>

                        <button
                            onClick={() => openDeleteModal(note)}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-app-subtle transition hover:bg-red-500/10 hover:text-red-400">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Note Description */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out
                        ${
                            isExpanded
                                ? "max-h-[500px] opacity-100"
                                : "max-h-[72px] opacity-80"
                        }
                    `}>
                    <div className="px-5 pb-4">
                        <p className={`text-sm leading-6 text-app-muted`}>
                            {note.notes_description}
                        </p>
                    </div>
                </div>

                {/* Bottom / Expand */}
                <div
                    className="flex items-center justify-between border-t border-app-line/60 px-5 py-3">
                    <span className="text-xs text-app-muted">
                        Note #{note.notes_id}
                    </span>

                    <button
                        onClick={() =>
                            toggleNoteDetail(note.id)
                        }
                        className="flex items-center gap-1.5 text-xs font-medium text-app-subtle transition hover:text-app-text"
                    >
                        {isExpanded ? "Hide Details" : "View Details"}
                        {isExpanded ? (
                            <ChevronUp size={16} />
                        ) : (
                            <ChevronDown size={16} />
                        )}
                    </button>
                </div>
            </div>
        </>
    )
}

export default NoteCard;