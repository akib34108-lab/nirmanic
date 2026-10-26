import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";
import "../../human_resource/employees/Index.css";

const purchaseStatuses = {
    1: "Draft",
    2: "Pending",
    3: "Ordered",
    4: "Partially Received",
    5: "Received",
    6: "Cancelled",
}; 
   const purchaseStatusColors = {
    1: "#64748B", // Draft
    2: "#F59E0B", // Pending
    3: "#3B82F6", // Ordered
    4: "#8B5CF6", // Partially Received
    5: "#16A34A", // Received
    6: "#EF4444", // Cancelled
};
function MaterialsPurchase() {
   const [ purchase, setPurchase ] = React.useState([]);
   const [openMenu, setOpenMenu] = React.useState(null);
   const [syncingStock, setSyncingStock] = React.useState(false);
    const fetchPurchase = async () => {
        let res = await axios.get(`/material_purchase/index.php`)
        setPurchase(res.data.data);
    }
    React.useEffect(()=>{
        fetchPurchase();
    },[]);

    async function handleSyncStock() {
        if (!window.confirm("Add stock movements for purchases that are missing from inventory and transaction history? Purchases already recorded in transactions will not be duplicated.")) {
            return;
        }

        setSyncingStock(true);
        try {
            const res = await axios.post("/material_purchase/reconcile_stock.php");
            await fetchPurchase();
            const unresolved = res.data.data?.unresolved || [];
            const unresolvedDetails = unresolved
                .map((item) => `${item.purchase_no}: ${item.reason}`)
                .join("\n");
            window.alert(
                [res.data.message || "Unable to synchronize purchase stock.", unresolvedDetails]
                    .filter(Boolean)
                    .join("\n")
            );
        } catch (error) {
            window.alert(
                error.response?.data?.message ||
                "Unable to synchronize purchase stock. Please try again."
            );
        } finally {
            setSyncingStock(false);
        }
    }

    async function handleDelete(id, puprchaseName) {
    if (window.confirm(`Are you sure you want to delete this ${puprchaseName}?`)) {
        try {
            const res = await axios.delete(`/material_purchase/delete.php?id=${id}`)
            if(res.data.status){
                await fetchPurchase();
            } else {
                window.alert(res.data.message || "Unable to delete material purchase.");
            }
        } catch (error) {
            window.alert(error.response?.data?.message || "Unable to delete material purchase.");
        }
    }
    }
    return (
    <Layout >
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Materials Purchase</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Stock</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Material Purchase List
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">
                        <div className="input-group flex-grow-1">
                            <input type="text" className="form-control" placeholder="Search Material Purchase"/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>
                            <Link to="/material_stock/material_purchase/create" className="btn btn-info d-flex justify-content-center align-items-center mr-2">
                                <i className="mdi mdi-plus"></i> Add Material Purchase
                            </Link>
                            <Link to="/material_stock/supplier" className="btn btn-info d-flex justify-content-center align-items-center mr-2">Suppliers</Link>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Material Purchase List</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Purchase Date</th>
                                            <th>Supplier</th>
                                            <th>Project</th>
                                            <th>Materials</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchase && purchase.map((purchase) => (
                                        <tr key={ purchase.id }>
                                            <td>{ purchase.purchase_no }</td>
                                            <td>{ purchase.purchase_date }</td>
                                            <td>{ purchase.supplier_name }</td>
                                            <td>{ purchase.name }</td>
                                            <td>
                                                {purchase.item_count > 0 && <small>{purchase.item_count} item(s)</small>}
                                            </td><td>
                                                {purchase.items?.length
                                                    ? purchase.items.map((item) => <div key={item.id}>{item.quantity}</div>)
                                                    : purchase.quantity ?? "-"}
                                            </td>
                                            <td>
                                                {purchase.items?.length
                                                    ? purchase.items.map((item) => <div key={item.id}>{item.unit_price}</div>)
                                                    : purchase.unit_price ?? "-"}
                                            </td>
                                            <td>{ purchase.total_amount }</td>
                                            <td>
                                                <div className="ml-auto" style={{display: "flex",alignItems: "center",gap: "7px",color: purchaseStatusColors[purchase.status]}}>
                                                    <span style={{width: "8px",height: "8px",borderRadius: "50%",backgroundColor: purchaseStatusColors[purchase.status],display: "inline-block"}}></span>
                                                    <span>{purchaseStatuses[purchase.status]}</span>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <div className="employee-action-menu">
                                                    <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === purchase.id ? null : purchase.id)} title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                    {openMenu === purchase.id && (
                                                        <div className="action-dropdown">
                                                            <Link to={`/material_stock/material_purchase/edit/${purchase.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-pencil-outline"></i><span>Edit Purchase</span></Link>
                                                            <button type="button" className="action-dropdown-item delete-action" onClick={() => { setOpenMenu(null);  handleDelete(purchase.id, purchase.purchase_no);}}><i className="mdi mdi-delete-outline"></i><span>Delete Purchase</span></button>
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

export default MaterialsPurchase;
