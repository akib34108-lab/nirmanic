import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";

const clientTypes = {
    1: "Individual",
    2: "Property Developer",
    3: "Corporate",
    4: "Industrial",
    5: "Government",
    6: "Educational",
    7: "Health Care",
    8: "NGO",
    9: "Real Estate Company",
};
const clientStatuses = {
    1: "Active",
    2: "Pending",
    3: "Prospective",
    4: "Inactive",
    5: "Blocked",
};
const clientStatusColors = {
    1: "#0fa80f", // Active 
    2: "#d39e00", // Pending 
    3: "#0c7ff2", // Prospective
    4: "#dc3545", // Inactive 
    5: "#6c757d", // Blocked 
};

function Clients() {
const [ clients, setClients] = React.useState([]);
    function fetchClients () {
        fetch ('http://localhost/nirmanic_api/clients/index.php')
        .then (response=>response.json())
        .then (data=>setClients(data.data))
        .catch (error=>console.error("Fetching clients error:",error));
    }
    React.useEffect(()=>{
        fetchClients();
    },[]);
    function handleDelete (id) {
        if (window.confirm("Are you sure you want to delete this client?")) {
            fetch('http://localhost/nirmanic_api/clients/delete.php?id=' + id, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'true') {
                    fetchClients();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
    return (
        <Layout>
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Clients</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>Our Clients</li>
                    <li className="breadcrumb-item active" aria-current="page"><a href="#">Client List</a></li>
                    </ol>
                </nav>
            </div>
            <div>
                <form className="nav-link form-inline mt-2 mt-md-0">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search Client" />
                        <div className="input-group-append">
                            <span className="input-group-text">
                            <i className="mdi mdi-magnify"></i>
                            </span>
                        </div>
                        <Link to="/clients/create" className="btn btn-info d-flex justify-content-center align-items-center">
                            <i className="mdi mdi-plus"></i> Add Client
                        </Link>
                    </div>
                </form>
            </div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-wrap align-items-center mb-4" style={{ gap: "8px" }}>
                            <button className="btn btn-sm btn-info">All</button>
                            <button className="btn btn-sm btn-light">Active</button>
                            <button className="btn btn-sm btn-light">Pending</button>
                            <button className="btn btn-sm btn-light">Propective</button>
                            <button className="btn btn-sm btn-light">Inactive</button>
                            <button className="btn btn-sm btn-light">Blocked</button>
                            <div className="ml-auto">
                                <select className="form-control form-control-sm"style={{minWidth: "150px"}}>
                                    <option>All Types</option>
                                    <option>Individual</option>
                                    <option>Property Developer</option>
                                    <option>Corporate</option>
                                    <option>Industrial</option>
                                    <option>Government</option>
                                    <option>Educational</option>
                                    <option>Health Care</option>
                                    <option>NGO</option>
                                    <option>Real Estate Company</option>
                                </select>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th style={{ width: "25%" }}>Client</th>
                                        <th style={{ width: "25%" }}>Contact Information</th>
                                        <th style={{ width: "15%" }}>Type</th>
                                        <th style={{ width: "15%" }}>Status</th>
                                        <th style={{ width: "15%" }}>Projects</th>
                                        <th style={{ width: "5%" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => (
                                        <tr key={client.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                 <div
                                                        className="d-flex align-items-center justify-content-center rounded-circle mr-3"
                                                        style={{
                                                            width: "46px",
                                                            height: "46px",
                                                            minWidth: "46px",
                                                            backgroundColor: "#eaf6ff",
                                                            color: "#0c7ff2",
                                                            fontSize: "17px",
                                                            fontWeight: "600"
                                                        }}
                                                    >
                                                        {client.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h6
                                                            className="mb-1 font-weight-bold"
                                                            style={{
                                                                fontSize: "14px"
                                                            }}
                                                        >
                                                            {client.name}
                                                        </h6>
                                                        <div
                                                            className="text-muted"
                                                            style={{
                                                                fontSize: "12px"
                                                            }}
                                                        >
                                                            {client.company}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className="d-flex align-items-center mb-1"
                                                    style={{
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    <i
                                                        className="mdi mdi-phone-outline mr-2"
                                                        style={{
                                                            color: "#0c7ff2"
                                                        }}
                                                    ></i>
                                                    <span>
                                                        {client.phone}
                                                    </span>
                                                </div>
                                                <div
                                                    className="d-flex align-items-center mb-1"
                                                    style={{
                                                        fontSize: "12px"
                                                    }}
                                                >
                                                    <i
                                                        className="mdi mdi-email-outline mr-2"
                                                        style={{
                                                            color: "#0c7ff2"
                                                        }}
                                                    ></i>
                                                    <span className="text-muted">
                                                        {client.email}
                                                    </span>
                                                </div>
                                                <div
                                                    className="d-flex align-items-center text-muted"
                                                    style={{
                                                        fontSize: "11px"
                                                    }}
                                                >
                                                    <i className="mdi mdi-map-marker-outline mr-2"></i>
                                                    {client.address}
                                                </div>
                                            </td>
                                            <td>
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        padding: "5px 10px",
                                                        borderRadius: "20px",
                                                        backgroundColor: "#f1f5f9",
                                                        color: "#495057",
                                                        fontSize: "11px",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    <i
                                                        className="mdi mdi-domain mr-1"
                                                    ></i>
                                                    {client.type}
                                                </span>
                                            </td>
                                            <td>
                                                {client.status === "Active" && (
                                                    <div
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "#0fa80f"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display: "inline-block",
                                                                width: "7px",
                                                                height: "7px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#0fa80f",
                                                                marginRight: "6px"
                                                            }}
                                                        ></span>
                                                        Active
                                                    </div>
                                                )}
                                                {client.status === "Inactive" && (
                                                    <div
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "#dc3545"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display: "inline-block",
                                                                width: "7px",
                                                                height: "7px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#dc3545",
                                                                marginRight: "6px"
                                                            }}
                                                        ></span>
                                                        Inactive
                                                    </div>
                                                )}
                                                {client.status === "Pending" && (
                                                    <div
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "#d39e00"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                display: "inline-block",
                                                                width: "7px",
                                                                height: "7px",
                                                                borderRadius: "50%",
                                                                backgroundColor: "#ffc107",
                                                                marginRight: "6px"
                                                            }}
                                                        ></span>
                                                        Pending
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div
                                                        className="mr-2 d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "30px",
                                                            height: "30px",
                                                            borderRadius: "6px",
                                                            backgroundColor: "#f1f7ff",
                                                            color: "#0c7ff2"
                                                        }}
                                                    >
                                                        <i className="mdi mdi-office-building-outline"></i>
                                                    </div>
                                                    <div>
                                                        <strong
                                                            style={{
                                                                fontSize: "14px"
                                                            }}
                                                        >
                                                            {client.projects}
                                                        </strong>
                                                        <div
                                                            className="text-muted"
                                                            style={{
                                                                fontSize: "10px"
                                                            }}
                                                        >
                                                            Projects
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <a href="">Edit</a>
                                                <a href="">Delete</a>
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

export default Clients;