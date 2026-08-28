import { useEffect, useState } from "react";
import StaffFilters from "../../components/Staffs/StaffFilters";
import StaffTable from "../../components/Staffs/StaffTable";

import CreateStaffModal from "../../components/Staffs/CreateStaffModal";
import ViewStaffModal from "../../components/Staffs/ViewStaffModal";
import EditStaffModal from "../../components/Staffs/EditStaffModal";
import DeleteStaffModal from "../../components/Staffs/DeleteStaffModal";
import Button from "../../components/Ui/Button";
import { getAllStaff, getStaffById } from "../../api/staff";
import { toast } from "react-toastify";

const AllStaff = () => {
    const [modal, setModal] = useState(null);
    const [staffs, setStaffs] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [createFormData, setCreateFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        dialcode: 91,
        phone_number: "",
        gender: "",
        dob: "",
        role: "",
    });
    const [createFormErrorData, setCreateFormErrorData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        dialcode: 91,
        phone_number: "",
        gender: "",
        dob: "",
        role: "",
    });

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

        if(type === "edit"){
            setCreateFormData({
                first_name: staff.first_name || "",
                last_name: staff.last_name || "",
                email: staff.email || "",
                dialcode: staff.dialcode || 91,
                phone_number: staff.phone_number || "",
                gender: staff.gender || "",
                dob: staff.dob || "",
                role: staff.role || "",
            })
        }
    };

    const closeModal = () => {
        setModal(null);
        setSelectedStaff(null);

        setCreateFormData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            dialcode: 91,
            phone_number: "",
            gender: "",
            dob: "",
            role: "",
        });
        setCreateFormErrorData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            dialcode: 91,
            phone_number: "",
            gender: "",
            dob: "",
            role: "",
        });
    };

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setCreateFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setCreateFormErrorData((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

    useEffect(() => {
        const loadStaff = async () => {
            try {
                const response = await getAllStaff();
                setStaffs(response.data.data);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        loadStaff();
    }, [modal])

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
            <StaffTable openModal={openModal} staffs={staffs} />

            <CreateStaffModal 
                modal={modal} 
                createFormData={createFormData} setCreateFormData={setCreateFormData} inputHandler={inputHandler} 
                createFormErrorData={createFormErrorData} setCreateFormErrorData={setCreateFormErrorData}
                closeModal={closeModal} 
            />
            <ViewStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
            <EditStaffModal 
                modal={modal} selectedStaff={selectedStaff} 
                createFormData={createFormData} inputHandler={inputHandler} 
                createFormErrorData={createFormErrorData} setCreateFormErrorData={setCreateFormErrorData}
                closeModal={closeModal} 
            />
            <DeleteStaffModal modal={modal} selectedStaff={selectedStaff} closeModal={closeModal} />
        </div>
    );
};

export default AllStaff;