import React from "react";
import { Link, useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from "../../../lib/axios.js";

const employeeStatuses = {
    1: "Active",
    2: "Pending",
    3: "Prospective",
    4: "Inactive",
    5: "Blocked",
};
function ProfileEmployee() {
    const { id } = useParams();
    const [profile, setProfile] = React.useState(null);
    const [activeTab, setActiveTab] = React.useState("personal");
    React.useEffect(() => {
        let isCurrent = true;

        async function fetchEmployee() {
            try {
                const response = await axios.get(
                    `/employees/single.php?id=${encodeURIComponent(id)}`
                );
                if (!response.data.status || !response.data.data?.[0]) {
                    throw new Error(response.data.message || "Employee not found.");
                }
                if (isCurrent) {
                    setProfile({ id, employee: response.data.data[0] });
                }
            } catch (requestError) {
                if (isCurrent) {
                    setProfile({
                        id,
                        error:
                            requestError.response?.data?.message ||
                            requestError.message ||
                            "Unable to load employee profile.",
                    });
                }
            }
        }

        fetchEmployee();
        return () => {
            isCurrent = false;
        };
    }, [id]);
    const currentProfile = profile?.id === id ? profile : null;
    const employee = currentProfile?.employee;
    const InfoItem = ({ label, value }) => (
        <div className="col-md-6 mb-4">
            <small className="text-muted d-block mb-1">{label}</small>
            <div style={{ color: "#343a40" }}>{value}</div>
        </div>
    );
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title mb-5">Employee Profile</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/human_resource/employees">Employee List</Link>
                            </li>
                            <li className="breadcrumb-item active">Employee Profile</li>
                        </ol>
                    </nav>
                </div>
                {!currentProfile && (
                    <div className="alert alert-info" role="status">Loading employee profile...</div>
                )}
                {currentProfile?.error && (
                    <div className="alert alert-danger" role="alert">{currentProfile.error}</div>
                )}
                {employee && <>
                <div className="card mb-4" style={{ backgroundColor: "#214875"}}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-auto text-center">
                                {employee.image ? (
                                    <img src={`${import.meta.env.VITE_API_URL}${employee.image}`} alt={employee.employee_name} style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%", border: "5px solid #fff", marginTop: "-75px", background: "#fff", boxShadow: "0 2px 8px #0002",}}/>) : (
                                    <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: "5px solid #fff", marginTop: "-75px", background: "#e9ecef", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "42px", color: "#6c757d", boxShadow: "0 2px 8px #0002",}}><i className="mdi mdi-account" />
                                    </div>)}
                            </div>
                            <div className="col mt-3 mt-md-0">
                                <h3 className="mb-1" style={{ color: "white"}}>{employee.employee_name}</h3>
                                <p className="text-muted mb-2">{employee.email}</p>
                            </div>
                            <div className="col-md-auto mt-3 mt-md-0">
                                <Link to={`/human_resource/employees/edit/${employee.id}`} className="btn btn-primary mr-2"><i className="mdi mdi-pencil mr-1" />Edit Employee</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <ul className="nav nav-tabs mb-4" role="tablist" style={{ gap: "5px" }}>
                            <li className="nav-item">
                                <button type="button" className={`nav-link ${ activeTab === "personal" ? "active" : "" }`} onClick={() => setActiveTab("personal")} style={{ cursor: "pointer" }}><i className="mdi mdi-account-outline mr-2" />Personal Information</button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className={`nav-link ${ activeTab === "employment" ? "active" : ""}`} onClick={() => setActiveTab("employment")} style={{ cursor: "pointer" }}><i className="mdi mdi-briefcase-outline mr-2" />Employment Information</button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className={`nav-link ${ activeTab === "bank" ? "active" : ""}`} onClick={() => setActiveTab("bank")} style={{ cursor: "pointer" }}><i className="mdi mdi-bank-outline mr-2" />Bank Information</button>
                            </li>
                        </ul>
                        {activeTab === "personal" && (
                            <div className="row">
                                 <InfoItem label="Full Name" value={employee.employee_name}/>
                                 <InfoItem label="Phone Number" value={employee.phone}/>
                                 <InfoItem label="Email Address" value={employee.email}/>
                                 <InfoItem label="NID Number" value={employee.nid}/>
                                 <InfoItem label="Address" value={employee.address}/>
                                 <InfoItem label="Joining Date" value={employee.joining_date}/>
                            </div>
                        )}
                        {activeTab === "employment" && (
                            <div className="row">
                                <InfoItem label="Employee ID" value={employee.id}/>
                                <InfoItem label="Department" value={employee.department_name}/>
                                <InfoItem label="Designation" value={employee.designation_name}/>
                                <InfoItem label="Experience" value={ employee.experience}/>
                                <InfoItem
                                    label="Basic Salary"
                                    value={`৳ ${employee.basic_salary}`}/>
                                <InfoItem label="Employment Status" value={employeeStatuses[employee.status]}/>
                            </div>
                        )}
                        {activeTab === "bank" && (
                        <div className="row">
                            <InfoItem label="Bank Account Number" value={employee.bank_account}/>
                        </div>
                        )}
                    </div>
                </div>
                </>}
            </div>
        </Layout>
    );
}

export default ProfileEmployee;
