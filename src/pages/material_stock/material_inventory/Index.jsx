import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";
import "../../human_resource/employees/Index.css";

function MaterialsInventory() {
   const [ inventory, setInventory ] = React.useState([]);
   const [openMenu, setOpenMenu] = React.useState(null);
   const stockStatuses = {
        1: { label: "In Stock", color: "#16A34A" },
        2: { label: "Low Stock", color: "#F59E0B" },
        3: { label: "Out of Stock", color: "#EF4444" },
   };
    const fetchInventory  = async () => {
        let res = await axios.get(`/material_inventory/index.php`)
        setInventory (res.data.data);
    }
    React.useEffect(()=>{
        fetchInventory();
    },[]);

    async function handleDelete(id, inventoryName) {
    if (window.confirm(`Are you sure you want to delete this ${inventoryName}?`)) {
        try {
            const res = await axios.delete(`/material_inventory/delete.php?id=${id}`)
            if(res.data.status){
                await fetchInventory();
            } else {
                window.alert(res.data.message || "Unable to delete material inventory.");
            }
        } catch (error) {
            window.alert(error.response?.data?.message || "Unable to delete material inventory.");
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
                                            {/* <th>Minimum Stock</th> */}
                                            <th>Status</th>
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
                                            {/* <td>{ inventory.minimum_stock }</td> */}
                                            <td style={{ color: stockStatuses[inventory.status]?.color }}>
                                                {stockStatuses[inventory.status]?.label || "-"}
                                            </td>
                                            <td className="text-center">
                                                <div className="employee-action-menu">
                                                    <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === inventory.id ? null : inventory.id)} title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                    {openMenu === inventory.id && (
                                                        <div className="action-dropdown">
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
