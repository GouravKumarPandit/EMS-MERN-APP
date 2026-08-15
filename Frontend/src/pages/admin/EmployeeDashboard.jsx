import React from "react";
import TaskListNumber from "../components/Tasks/TaskListNumber";
import TaskSummaryCard from "../components/Tasks/TaskSummaryCard";

const EmployeeDashboard = () => {
    return (
        <div className="min-h-screen bg-black text-white p-6 space-y-6">
            <TaskListNumber />
            <TaskSummaryCard />
        </div>
    );
};

export default EmployeeDashboard;