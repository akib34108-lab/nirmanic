import React from "react";
import { Link } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';


const supplierStatusesTab = [
    { id: "all", label: "All", color: "#4B49AC" },
    { id: "1", label: "Active", color: "#198754" },
    { id: "2", label: "Pending", color: "#fd7e14" },
    { id: "3", label: "Prospective", color: "#0d6efd" },
    { id: "4", label: "Inactive", color: "#6c757d" },
    { id: "5", label: "Blocked", color: "#dc3545" },
];

function Suppliers() {
const [ suppliers, setSuppliers] = React.useState([]);
const [selectedStatus, setSelectedStatus] = React.useState("all");
const filteredSuppliers =
    selectedStatus === "all"
        ? suppliers
        : suppliers.filter(
            supplier => String(supplier.status) === selectedStatus
        );
    async function fetchSuppliers () {
        let res = await axios.get('/supplier/index.php');
        setSuppliers(res.data.data);
    }
    React.useEffect(()=>{
        fetchSuppliers();
    },[]);
    async function handleDelete (id, supplierName) {
        if (window.confirm(`Are you sure you want to delete ${supplierName}?`)) {
            let res = await axios.delete(`/supplier/delete.php?id=${id}`);
            if (res.data.status) {
                await fetchSuppliers();
            }
        }
    }
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">All Suppliers</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>Our Suppliers</li>
                        <li className="breadcrumb-item active" aria-current="page"><a href="#">Supplier List</a></li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <form className="nav-link form-inline mt-2 mt-md-0">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search Supplier" />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                            <Link to="/material_stock/supplier/create" className="btn btn-info d-flex justify-content-center align-items-center">
                                <i className="mdi mdi-plus"></i> Add Supplier
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-wrap align-items-center mb-4" style={{ gap: "8px" }}>
                                {supplierStatusesTab.map((status) => (
                                <button key={status.id} type="button"  onClick={() => setSelectedStatus(status.id)} style={{ border: "none",  borderRadius: "20px", padding: "7px 16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s ease", backgroundColor: selectedStatus === status.id ? status.color : "#f5f5f5", color: selectedStatus === status.id ? "#fff" : "#6c757d", boxShadow: selectedStatus === status.id  ? "0 2px 6px rgba(0,0,0,0.12)" : "none",}}>{status.label}</button>))}
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Supplier Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSuppliers.map((supplier) => (
                                            <tr key={supplier.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex align-items-center justify-content-center rounded-circle mr-3" style={{width: "46px",height: "46px",minWidth: "46px",backgroundColor: "#eaf6ff",color: "#0c7ff2",fontSize: "17px",fontWeight: "600"}}>
                                                            {supplier.supplier_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-1 font-weight-bold" style={{fontSize: "14px"}}>{supplier.supplier_name}</h6>
                                                            <div className="text-muted"style={{fontSize: "12px"}}>{supplier.company_name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 10px", borderRadius: "20px", backgroundColor: "#f1f5f9", color: "#495057", fontSize: "11px", fontWeight: "500"}}>{supplier.phone}</span>
                                                </td>
                                                <td>
                                                    <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 10px", borderRadius: "20px", backgroundColor: "#f1f5f9", color: "#495057", fontSize: "11px", fontWeight: "500"}}>{supplier.email}</span>
                                                </td>
                                                <td>
                                                    <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 10px", borderRadius: "20px", backgroundColor: "#f1f5f9", color: "#495057", fontSize: "11px", fontWeight: "500"}}>{supplier.address}</span>
                                                </td>
                                                <td>
                                                    <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 10px", borderRadius: "20px", backgroundColor: "#f1f5f9", color: "#495057", fontSize: "11px", fontWeight: "500"}}>{supplier.address}</span>
                                                </td>
                                                <td className="text-center">
                                                    <Link to={`/material_stock/supplier/edit/${supplier.id}`}><i className="mdi mdi-pencil" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
                                                    <Link to={''} onClick={() => handleDelete(supplier.id, supplier.supplier_name)}><i className="mdi mdi-delete" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
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

export default Suppliers;