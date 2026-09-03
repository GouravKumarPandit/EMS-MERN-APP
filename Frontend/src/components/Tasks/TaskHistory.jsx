import { formatDateTime } from '../../utils/date';
import { CheckCircle2 } from 'lucide-react';

function TaskHistory({ activities, title = "Task History" }) {
    return (
        <>
            <div className="mt-6">
                <h3 className="mb-4 text-sm font-medium">
                    {title}
                </h3>

                <div className="space-y-3">
                    {activities.map(
                        (history, index) => (
                            <div key={index} className="flex gap-3 rounded-lg border border-app-line bg-app-bg p-3">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-app-hover">
                                    <CheckCircle2
                                        size={15}
                                        className="text-green-400"
                                    />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm capitalize">
                                            {history?.task_type.replace("_", " ")}
                                        </span>
                                        <span className="text-xs text-app-muted">
                                            {formatDateTime(history?.createdAt)}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-app-muted">
                                        {history?.task_activity} <br />
                                        Updated By: {history?.updated_by?.first_name} {history?.updated_by?.last_name}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default TaskHistory;