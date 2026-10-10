import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";

const clientTypes = {
    1: "Individual",
    2: "Property Developer",
    3: "Corporate",
    4: "Industrial",
    5: "Government",
    6: "Hospitality",
    7: "Educational",
    8: "Health Care",
    9: "NGO",
    10: "Real Estate Company",
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
const clientStatusesTab = [
    { id: "all", label: "All", color: "#4B49AC" },
    { id: "1", label: "Active", color: "#198754" },
    { id: "2", label: "Pending", color: "#fd7e14" },
    { id: "3", label: "Prospective", color: "#0d6efd" },
    { id: "4", label: "Inactive", color: "#6c757d" },
    { id: "5", label: "Blocked", color: "#dc3545" },
];

function Clients() {
const [ clients, setClients] = React.useState([]);
const [selectedStatus, setSelectedStatus] = React.useState("all");
const filteredClients =
    selectedStatus === "all"
        ? clients
        : clients.filter(
            client => String(client.status) === selectedStatus
        );
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
                                {clientStatusesTab.map((status) => (
                                <button key={status.id} type="button"  onClick={() => setSelectedStatus(status.id)} style={{ border: "none",  borderRadius: "20px", padding: "7px 16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s ease", backgroundColor: selectedStatus === status.id ? status.color : "#f5f5f5", color: selectedStatus === status.id ? "#fff" : "#6c757d", boxShadow: selectedStatus === status.id  ? "0 2px 6px rgba(0,0,0,0.12)" : "none",}}>{status.label}</button>))}
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Client</th>
                                            <th>Contact Information</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Projects</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClients.map((client) => (
                                            <tr key={client.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex align-items-center justify-content-center rounded-circle mr-3" style={{width: "46px",height: "46px",minWidth: "46px",backgroundColor: "#eaf6ff",color: "#0c7ff2",fontSize: "17px",fontWeight: "600"}}>
                                                            {client.client_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-1 font-weight-bold" style={{fontSize: "14px"}}>{client.client_name}</h6>
                                                            <div className="text-muted"style={{fontSize: "12px"}}>{client.company}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center mb-1" style={{fontSize: "12px"}}>
                                                        <i className="mdi mdi-phone-outline mr-2" style={{color: "#0f9d8a"}}></i>
                                                        <span className="fw-bold" style={{color: "#0f9d8a"}}>{client.phone}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-1" style={{ fontSize: "12px"}}>
                                                        <i className="mdi mdi-email-outline mr-2" style={{ color: "#0f9d8a"}}></i>
                                                        <span className="fw-bold" style={{color: "#0f9d8a"}}>{client.email}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center" style={{ fontSize: "12px"}} >
                                                        <i className="mdi mdi-map-marker-outline mr-2" style={{color: "#0f9d8a"}}></i>
                                                        <span className="fw-bold" style={{color: "#0f9d8a"}}>{client.address}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 10px", borderRadius: "20px", backgroundColor: "#f1f5f9", color: "#495057", fontSize: "11px", fontWeight: "500"}}>{clientTypes[client.type]} </span>
                                                </td>
                                                <td>
                                                    <div className="ml-auto" style={{display: "flex",alignItems: "center",gap: "7px",color: clientStatusColors[client.status]}}>
                                                        <span style={{width: "8px",height: "8px",borderRadius: "50%",backgroundColor: clientStatusColors[client.status],display: "inline-block"}}></span>
                                                        <span>{clientStatuses[client.status]}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="mr-2 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px", borderRadius: "6px", backgroundColor: "#f1f7ff", color: "#0c7ff2"}}>
                                                            <i className="mdi mdi-office-building-outline"></i>
                                                        </div>
                                                        <div>
                                                            <strong style={{ fontSize: "14px"}}>{client.projects}</strong>
                                                            <div
                                                                className="text-muted" style={{ fontSize: "10px"}}>Projects
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <Link to={`/clients/edit/${client.id}`}><i className="mdi mdi-pencil" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
                                                    <Link to={''} onClick={() => handleDelete(client.id)}><i className="mdi mdi-delete" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
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