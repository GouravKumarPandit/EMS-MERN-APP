import { useState } from "react";
import StaffTable from "../../components/Staffs/StaffTable";
import CreateStaffModal from "../../components/Staffs/CreateStaffModal";
import ViewStaffModal from "../../components/Staffs/ViewStaffModal";
import EditStaffModal from "../../components/Staffs/EditStaffModal";
import DeleteStaffModal from "../../components/Staffs/DeleteStaffModal";
import { getStaffById } from "../../api/staff";
import CardHeader from "../../components/Layout/CardHeader";

const AllStaff = () => {
    const [modal, setModal] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const openModal = (type, staff = null) => {
        setSelectedStaff(staff);
        setModal(type);

        if (type === "view") {
            const getStaff = async (staffId) => {
                const response = await getStaffById(staffId);
                setSelectedStaff(response.data.data);
            }
            getStaff(staff?._id);
        }
    };

    const closeModal = () => {
        setModal(null);
        setSelectedStaff(null);
    };

    return (
        <div className="min-h-screen bg-app-bg text-app-text p-4 md:p-6">
            <CardHeader 
                cardHeading="Staffs" 
                headingDescription="Manage your company staff members" 
                buttonText="+ Create Staff" 
                onClick={() => openModal("create")}
            />

            <StaffTable modal={modal} openModal={openModal} />
            <CreateStaffModal modal={modal} closeModal={closeModal} />
            <ViewStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
            <EditStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
            <DeleteStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
        </div>
    );
};

export default AllStaff;