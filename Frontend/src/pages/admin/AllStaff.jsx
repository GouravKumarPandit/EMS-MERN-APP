import { useEffect, useState } from "react";
import StaffFilters from "../../components/Staffs/StaffFilters";
import StaffTable from "../../components/Staffs/StaffTable";

import CreateStaffModal from "../../components/Staffs/CreateStaffModal";
import ViewStaffModal from "../../components/Staffs/ViewStaffModal";
import EditStaffModal from "../../components/Staffs/EditStaffModal";
import DeleteStaffModal from "../../components/Staffs/DeleteStaffModal";
import { getAllStaff, getStaffById } from "../../api/staff";
import { toast } from "react-toastify";
import CardHeader from "../../components/Layout/CardHeader";

const AllStaff = () => {
    const [modal, setModal] = useState(null);
    const [staffs, setStaffs] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        limit: 3
    });
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

    const handlePageChange = (page) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    useEffect(() => {
        const loadStaff = async () => {
            try {
                const response = await getAllStaff(search, role, gender, pagination.currentPage, pagination.limit);

                if (response.data.success) {
                    const { staffs, pagination: paginationData } =
                        response.data.data;

                    setStaffs(staffs);
                    setPagination(paginationData);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }

        loadStaff();
    }, [modal, search, role, gender, pagination.currentPage, pagination.limit])

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6">
            {/* Header */}
            <CardHeader 
                cardHeading="Staffs" 
                headingDescription="Manage your company staff members" 
                buttonText="+ Create Staff" 
                onClick={() => openModal("create")}
            />

            <StaffFilters 
                search={search} setSearch={setSearch}
                role={role} setRole={setRole}
                gender={gender} setGender={setGender}
            />
            <StaffTable openModal={openModal} staffs={staffs}
                pagination={pagination} onPageChange={handlePageChange} 
            />

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