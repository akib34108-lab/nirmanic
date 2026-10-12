import React from "react";
import { Link, useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from "../../../lib/axios.js";

function ProfileEmployee() {
    const { id } = useParams();
    const [employee, setEmployee] = React.useState('');
    const [activeTab, setActiveTab] = React.useState("personal");
    async function fetchEmployee() {
        let res = await axios.get(`/employees/single.php?id=${id}`);
        setEmployee(res.data.data[0]);
    }
    React.useEffect(() => {
        fetchEmployee();
    }, []);
    const InfoItem = ({ label, value }) => (
        <div className="col-md-6 mb-4">
            <small className="text-muted d-block mb-1">
                {label}
            </small>
            <div style={{ color: "#343a40" }}>
                 {value}
            </div>
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
                                <Link to="/human_resource/employees">
                                    Employee List
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">
                                Employee Profile
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="card mb-4" style={{ backgroundColor: "#214875"}}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-auto text-center">
                                {employee.image ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${employee.image}`}
                                        alt={employee.employee_name}
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                            border: "5px solid #fff",
                                            marginTop: "-75px",
                                            background: "#fff",
                                            boxShadow: "0 2px 8px #0002",
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            borderRadius: "50%",
                                            border: "5px solid #fff",
                                            marginTop: "-75px",
                                            background: "#e9ecef",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "42px",
                                            color: "#6c757d",
                                            boxShadow: "0 2px 8px #0002",
                                        }}
                                    >
                                        <i className="mdi mdi-account" />
                                    </div>
                                )}
                            </div>

                            <div className="col mt-3 mt-md-0">
                                <h3 className="mb-1" style={{ color: "white"}}>
                                    {employee.employee_name}
                                </h3>

                                <p className="text-muted mb-2">
                                    {employee.email}
                                </p>
                            </div>
                            <div className="col-md-auto mt-3 mt-md-0">
                                <Link
                                    to={`/human_resource/employees/edit/${employee.id}`}
                                    className="btn btn-primary mr-2"
                                >
                                    <i className="mdi mdi-pencil mr-1" />
                                    Edit Employee
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

<div className="card">
    <div className="card-body">

        <ul
            className="nav nav-tabs mb-4"
            role="tablist"
            style={{ gap: "5px" }}
        >
            <li className="nav-item">
                <button
                    type="button"
                    className={`nav-link ${
                        activeTab === "personal" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("personal")}
                    style={{ cursor: "pointer" }}
                >
                    <i className="mdi mdi-account-outline mr-2" />
                    Personal Information
                </button>
            </li>

            <li className="nav-item">
                <button
                    type="button"
                    className={`nav-link ${
                        activeTab === "employment" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("employment")}
                    style={{ cursor: "pointer" }}
                >
                    <i className="mdi mdi-briefcase-outline mr-2" />
                    Employment Information
                </button>
            </li>

            <li className="nav-item">
                <button
                    type="button"
                    className={`nav-link ${
                        activeTab === "bank" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("bank")}
                    style={{ cursor: "pointer" }}
                >
                    <i className="mdi mdi-bank-outline mr-2" />
                    Bank Information
                </button>
            </li>
        </ul>

        {/* Personal Information */}
        {activeTab === "personal" && (
            <div className="row">
                <InfoItem
                    label="Full Name"
                    value={employee.employee_name}
                />
                <InfoItem
                    label="Phone Number"
                    value={employee.phone}
                />
                <InfoItem
                    label="Email Address"
                    value={employee.email}
                />
                <InfoItem
                    label="NID Number"
                    value={employee.nid}
                />
                <InfoItem
                    label="Address"
                    value={employee.address}
                />
                <InfoItem
                    label="Joining Date"
                    value={employee.joining_date}
                />
            </div>
        )}

        {/* Employment Information */}
        {activeTab === "employment" && (
            <div className="row">
                <InfoItem
                    label="Employee ID"
                    value={employee.id}
                />
                <InfoItem
                    label="Department ID"
                    value={employee.department_id}
                />
                <InfoItem
                    label="Designation ID"
                    value={employee.designation_id}
                />
                <InfoItem
                    label="Experience"
                    value={
                        employee.experience
                            ? `${employee.experience} years`
                            : ""
                    }
                />
                <InfoItem
                    label="Basic Salary"
                    value={
                        employee.basic_salary !== null &&
                        employee.basic_salary !== undefined &&
                        employee.basic_salary !== ""
                            ? `৳ ${employee.basic_salary}`
                            : ""
                    }
                />
                <InfoItem
                    label="Employment Status"
                    value={employee.status}
                />
            </div>
        )}

        {/* Bank Information */}
        {activeTab === "bank" && (
            <div className="row">
                <InfoItem
                    label="Bank Account Number"
                    value={employee.bank_account}
                />
            </div>
        )}

    </div>
</div>


            </div>
        </Layout>
    );
}

export default ProfileEmployee;
