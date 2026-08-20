import { useState } from "react";
import StaffFilters from "../../components/Staffs/StaffFilters";
import StaffTable from "../../components/Staffs/StaffTable";

import CreateStaffModal from "../../components/Staffs/CreateStaffModal";
import ViewStaffModal from "../../components/Staffs/ViewStaffModal";
import EditStaffModal from "../../components/Staffs/EditStaffModal";
import DeleteStaffModal from "../../components/Staffs/DeleteStaffModal";
import Button from "../../components/Ui/Button";

const AllStaff = () => {
    const [modal, setModal] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const openModal = (type, staff = null) => {
        setSelectedStaff(staff);
        setModal(type);
    };

    const closeModal = () => {
        setModal(null);
        setSelectedStaff(null);
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Staffs
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Manage your company staff members
                    </p>
                </div>

                <Button
                    onClick={() => openModal("create")}
                    buttonClass="w-full md:w-auto px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 transition font-semibold"
                >
                    + Create Staff
                </Button>
            </div>

            <StaffFilters />
            <StaffTable openModal={openModal}/>

            <CreateStaffModal modal={modal} closeModal={closeModal} />
            <ViewStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
            <EditStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
            <DeleteStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
        </div>
    );
};

export default AllStaff;