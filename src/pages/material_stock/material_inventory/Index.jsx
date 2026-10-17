import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";
import "../../human_resource/employees/Index.css";

function MaterialsInventory() {
   const [ inventory, setInventory ] = React.useState([]);
   const [openMenu, setOpenMenu] = React.useState(null);
    const fetchInventory  = async () => {
        let res = await axios.get(`/material_inventory/index.php`)
        setInventory (res.data.data);
    }
    React.useEffect(()=>{
        fetchInventory();
    },[]);

    async function handleDelete(id, inventoryName) {
    if (window.confirm(`Are you sure you want to delete this ${inventoryName}?`)) {
        let res = await axios.delete(`/material_inventory/delete.php?id=${id}`)
        if(res.data.status){
            await fetchInventory();
            }
        }
    }
    return (
    <Layout >
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Materials Inventory </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Stock</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Material Inventory 
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">
                        <div className="input-group flex-grow-1">
                            <input type="text" className="form-control" placeholder="Search Material Inventory"/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>
                            <Link to="/material_stock/material_inventory/create" className="btn btn-info d-flex justify-content-center align-items-center mr-2">
                                <i className="mdi mdi-plus"></i> Add Material Inventory 
                            </Link>
                            <Link to="/material_stock/material_category" className="btn btn-info d-flex justify-content-center align-items-center mr-2">Material Category</Link>
                            <Link to="/material_stock/material_unit" className="btn btn-info d-flex justify-content-center align-items-center">Material Unit</Link>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Material Inventory</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Material Name</th>
                                            <th>Project Name</th>
                                            <th>Quantity Available</th>
                                            <th>Quantity Used</th>
                                            <th>Current Stock</th>
                                            <th>Minimum Stock</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventory && inventory.map((inventory) => (
                                        <tr key={ inventory.id }>
                                            <td>{ inventory.id }</td>
                                            <td>{ inventory.material_name }</td>
                                            <td>{ inventory.name }</td>
                                            <td>{ inventory.quantity_available}</td>
                                            <td>{ inventory.quantity_used }</td>
                                            <td>{ inventory.current_stock }</td>
                                            <td>{ inventory.minimum_stock }</td>
                                            <td className="text-center">
                                                <div className="employee-action-menu">
                                                    <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === inventory.id ? null : inventory.id)} title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                    {openMenu === inventory.id && (
                                                        <div className="action-dropdown">
                                                            <Link to={`/material_stock/material_inventory/edit/${inventory.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-pencil-outline"></i><span>Edit Inventory</span></Link>
                                                            <button type="button" className="action-dropdown-item delete-action" onClick={() => { setOpenMenu(null);  handleDelete(inventory.id, inventory.id);}}><i className="mdi mdi-delete-outline"></i><span>Delete Inventory</span></button>
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
        </div>
    </Layout>
    );
}

export default MaterialsInventory;
