import { useEffect, useState } from "react";
import StaffTaskStats from "../../components/Dashboard/StaffTaskStats";
import TaskCountCard from "../../components/Dashboard/TaskCountCard";
import TaskCarousel from "../../components/Dashboard/TaskCarousel";
import Button from "../../components/Ui/Button";
import { dashboard } from "../../api/staff";
import { toast } from "react-toastify";
import NoData from "../../components/Ui/NoData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
    const [loginStaffTaskData, setLoginStaffTaskData] = useState({});
    const [allStaffTaskCount, setAllStaffTaskCount] = useState([]);
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    const handleViewAll = () => {
        navigate("/tasks");
    }

    useEffect(() => {
        const dashboardFetch = async () => {
            try {
                const response = await dashboard();
                if(response.data.success) {
                    const { loggedInStaffTask, staffTaskCount } = response.data.data;
                    setLoginStaffTaskData(loggedInStaffTask);
                    setAllStaffTaskCount(staffTaskCount || []);
                }

            } catch (error) {
                toast.error(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
                );
            }
        }

        dashboardFetch();
    }, [])

    return (
        <>
            <div className="min-h-screen min-w-0 bg-black text-white p-6 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Task Status
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <TaskCountCard taskName={"Pending"} taskCount={loginStaffTaskData?.taskCount?.pending} taskDetail="Tasks assigned to you" cardBg="bg-blue-500" hoverBg="hover:border-blue-500/60" />
                    <TaskCountCard taskName={"Accepted"} taskCount={loginStaffTaskData?.taskCount?.accepted} taskDetail="Tasks accepted" cardBg="bg-yellow-500" hoverBg="hover:border-yellow-500/60" />
                    <TaskCountCard taskName={"Completed"} taskCount={loginStaffTaskData?.taskCount?.completed} taskDetail="Tasks completed" cardBg="bg-green-500" hoverBg="hover:border-green-500/60" />
                    <TaskCountCard taskName={"Failed"} taskCount={loginStaffTaskData?.taskCount?.failed} taskDetail="Tasks failed" cardBg="bg-orange-500" hoverBg="hover:border-orange-500/60" />
                </div>

                {/* Task */}
                <div className="mt-8 min-w-0">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                My Tasks
                            </h2>

                            <p className="mt-1 text-sm text-neutral-400">
                                Recently assigned tasks
                            </p>
                        </div>

                        <Button onClick={handleViewAll}>
                            View All
                        </Button>
                    </div>

                    <div className="w-full min-w-0">
                        {
                            (loginStaffTaskData?.recentTasks?.length > 0) ?
                            <TaskCarousel tasks={loginStaffTaskData.recentTasks} /> :
                            <NoData message={"No task found!"} />
                        }
                    </div>
                </div>
                {
                    isAdmin ? (
                        allStaffTaskCount.length > 0
                            ? <StaffTaskStats staffStats={allStaffTaskCount} />
                            : <NoData message={"No staff stats found!"} />
                    ) : null
                }
            </div >
        </>
    )
}

export default AdminDashboard;