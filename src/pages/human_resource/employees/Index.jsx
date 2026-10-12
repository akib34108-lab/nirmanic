import React from "react";
import { Link } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';
import "./Index.css";

const employeeStatuses = {
    1: "Active",
    2: "Pending",
    3: "Prospective",
    4: "Inactive",
    5: "Blocked",
};
const employeeStatusColors = {
    1: "#0fa80f", // Active 
    2: "#d39e00", // Pending 
    3: "#0c7ff2", // Prospective
    4: "#dc3545", // Inactive 
    5: "#6c757d", // Blocked 
};
const employeeStatusesTab = [
    { id: "all", label: "All", color: "#4B49AC" },
    { id: "1", label: "Active", color: "#198754" },
    { id: "2", label: "Pending", color: "#fd7e14" },
    { id: "3", label: "Prospective", color: "#0d6efd" },
    { id: "4", label: "Inactive", color: "#6c757d" },
    { id: "5", label: "Blocked", color: "#dc3545" },
];

function Employee() {
const [ employee, setEmployee] = React.useState([]);
const [openMenu, setOpenMenu] = React.useState(null);
const [selectedStatus, setSelectedStatus] = React.useState("all");
const filteredEmployee =
    selectedStatus === "all"
        ? employee
        : employee.filter(
            employee => String(employee.status) === selectedStatus
        );
    async function fetchEmployee () {
        let res = await axios.get('/employees/index.php');
        setEmployee(res.data.data);
    }
    React.useEffect(()=>{
        fetchEmployee();
    },[]);
    async function handleDelete (id,employeeName) {
        if (window.confirm(`Are you sure you want to delete this ${employeeName}?`)) {
            let res = await axios.delete(`/employees/delete.php?id=${id}`);
            if (res.data.status) {
                await fetchEmployee();
            }
        }
    }
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">All Employees</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>Our Employees</li>
                        <li className="breadcrumb-item active" aria-current="page"><a href="#">Employee List</a></li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <form className="nav-link form-inline mt-2 mt-md-0">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search Employee" />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                            <Link to="/human_resource/employees/create" className="btn btn-info d-flex justify-content-center align-items-center">
                                <i className="mdi mdi-plus"></i> Add Employee
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-wrap align-items-center mb-4" style={{ gap: "8px" }}>
                                {employeeStatusesTab.map((status) => (
                                <button key={status.id} type="button"  onClick={() => setSelectedStatus(status.id)} style={{ border: "none",  borderRadius: "20px", padding: "7px 16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s ease", backgroundColor: selectedStatus === status.id ? status.color : "#f5f5f5", color: selectedStatus === status.id ? "#fff" : "#6c757d", boxShadow: selectedStatus === status.id  ? "0 2px 6px rgba(0,0,0,0.12)" : "none",}}>{status.label}</button>))}
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Employee</th>
                                            <th>Contact Information</th>
                                            <th>Basic Salary</th>
                                            <th>Joining Date</th>
                                            <th>Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEmployee.map((employee) => (
                                            <tr key={employee.id}>
                                                <td>{employee.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div
    className="d-flex align-items-center justify-content-center rounded-circle mr-3"
    style={{
        width: "46px",
        height: "46px",
        minWidth: "46px",
        overflow: "hidden",
        backgroundColor: "#eaf6ff",
    }}
>
    {employee.image ? (
        <img
            src={`${import.meta.env.VITE_API_URL}${employee.image}`}
            alt={employee.employee_name}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
            }}
        />
    ) : (
        <span style={{
            color: "#0c7ff2",
            fontSize: "17px",
            fontWeight: "600",
        }}>
            {employee.employee_name.charAt(0)}
        </span>
    )}
</div>
                                                        <div>
                                                            <h6 className="mb-1 font-weight-bold" style={{fontSize: "14px"}}>{employee.employee_name}</h6>
                                                            <div className="text-muted"style={{fontSize: "12px"}}>{employee.designation_id}<br/>{employee.department_id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center mb-1" style={{fontSize: "12px"}}>
                                                        <i className="mdi mdi-phone-outline mr-2" style={{color: "#0f9d8a"}}></i>
                                                        <span className="fw-bold" style={{color: "#0f9d8a"}}>{employee.phone}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-1" style={{ fontSize: "12px"}}>
                                                        <i className="mdi mdi-email-outline mr-2" style={{ color: "#0f9d8a"}}></i>
                                                        <span className="fw-bold" style={{color: "#0f9d8a"}}>{employee.email}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center" style={{ fontSize: "12px"}} >
                                                        <i className="mdi mdi-map-marker-outline mr-2" style={{color: "#0f9d8a"}}></i>
                                                        <span className="fw-bold" style={{color: "#0f9d8a"}}>{employee.address}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-bold">{employee.basic_salary}</span>
                                                </td>
                                                <td>
                                                    <span className="fw-bold">{employee.joining_date}</span>
                                                </td>
                                                <td>
                                                    <div className="ml-auto" style={{display: "flex",alignItems: "center",gap: "7px",color: employeeStatusColors[employee.status]}}>
                                                        <span style={{width: "8px",height: "8px",borderRadius: "50%",backgroundColor: employeeStatusColors[employee.status],display: "inline-block"}}></span>
                                                        <span>{employeeStatuses[employee.status]}</span>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="employee-action-menu">
                                                        <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === employee.id ? null : employee.id)}title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                        {openMenu === employee.id && (
                                                            <div className="action-dropdown">
                                                                <Link to={`/human_resource/employees/profile/${employee.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-account-box-outline"></i><span>View Profile</span></Link>
                                                                <Link to={`/human_resource/employees/edit/${employee.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-pencil-outline"></i><span>Edit Employee</span></Link>
                                                                <button type="button" className="action-dropdown-item delete-action" onClick={() => { setOpenMenu(null);  handleDelete(employee.id, employee.employee_name);}}><i className="mdi mdi-delete-outline"></i><span>Delete Employee</span></button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>                        
            </div>
        </Layout>
    );
}

export default Employee;