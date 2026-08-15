import StaffTaskStats from "../../components/Dashboard/StaffTaskStats";
import TaskCountCard from "../../components/Dashboard/TaskCountCard";
import TaskSummaryCard from "../../components/Dashboard/TaskSummaryCard";
import Button from "../../components/Ui/Button";

function AdminDashboard() {
    return (
        <>
            <div className="min-h-screen bg-black text-white p-6 space-y-6">
                {/* Task Status Wise Count */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <TaskCountCard taskName={"New Task"} taskCount="0" taskDetail="Tasks assigned to you" cardBg="bg-blue-500" hoverBg="hover:border-blue-500/60" />
                    <TaskCountCard taskName={"Completed"} taskCount="3" taskDetail="Tasks completed" cardBg="bg-green-500" hoverBg="hover:border-green-500/60" />
                    <TaskCountCard taskName={"Accepted"} taskCount="0" taskDetail="Tasks accepted" cardBg="bg-yellow-500" hoverBg="hover:border-yellow-500/60" />
                    <TaskCountCard taskName={"Failed"} taskCount="1" taskDetail="Tasks failed" cardBg="bg-orange-500" hoverBg="hover:border-orange-500/60" />
                </div>

                {/* Task */}
                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                My Tasks
                            </h2>

                            <p className="mt-1 text-sm text-neutral-500">
                                Recently assigned tasks
                            </p>
                        </div>

                        <Button>
                            View All
                        </Button>
                    </div>

                    {/* Horizontal Task List */}
                    <div
                        id="taskList"
                        className="flex gap-4 overflow-x-auto pb-3"
                    >
                        <TaskSummaryCard task={{}} />
                    </div>
                </div>
                <StaffTaskStats />
            </div >
        </>
    )
}

export default AdminDashboard;