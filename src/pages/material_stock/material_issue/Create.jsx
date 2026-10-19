import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function IssueCreate() {
    const [project, setProject] = useState([]);
    const [material, setMaterial] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [unit, setUnit] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [feedback, setFeedback] = useState("");
    const [items, setItems] = useState([{ material_id: "", unit_id: "", quantity: "" }]);
    async function fetchProject() {
        let res = await axios.get("/projects/index.php");
        if (res.data.data) setProject(res.data.data);
    }
    async function fetchMaterial() {
        let res = await axios.get("/material_list/index.php");
        if (res.data.data) setMaterial(res.data.data);
    }
    async function fetchIssueTo() {
        let res = await axios.get("/employees/index.php");
        if (res.data.data) setEmployee(res.data.data);
    }
    async function fetchUnit() {
        let res = await axios.get("/material_unit/index.php");
        if (res.data.data) setUnit(res.data.data);
    }
    async function fetchInventory() {
        const res = await axios.get("/material_inventory/index.php");
        if (!res.data.status) {
            throw new Error(res.data.message || "Unable to load project inventory.");
        }
        setInventory(res.data.data || []);
    }
    useEffect(() => {
        Promise.all([fetchProject(), fetchMaterial(), fetchIssueTo(), fetchUnit(), fetchInventory()])
            .catch((error) => {
                console.error("Material issue form loading failed:", error);
                setFeedback(error.response?.data?.message || error.message || "Unable to load material issue form data.");
            });
    }, []);
    const availableStock = inventory.reduce((stockByMaterial, row) => {
        if (String(row.project_id) === projectId && Number(row.current_stock) > 0) {
            const key = String(row.material_id);
            stockByMaterial.set(key, (stockByMaterial.get(key) || 0) + Number(row.current_stock));
        }
        return stockByMaterial;
    }, new Map());
    function availableQuantity(materialId) {
        return availableStock.get(String(materialId)) || 0;
    }
    function handleItemChange(index, field, value) {
        setItems((currentItems) =>
            currentItems.map((item, itemIndex) => {
                if (itemIndex !== index) return item;
                if (field === "material_id") {
                    const selectedMaterial = material.find((entry) => String(entry.id) === value);
                    return {
                        ...item,
                        material_id: value,
                        unit_id: selectedMaterial ? String(selectedMaterial.unit_id) : "",
                    };
                }
                return { ...item, [field]: value };
            })
        );
    }
    function addItem() {
        setItems((currentItems) => [...currentItems, { material_id: "", unit_id: "", quantity: "" }]);
    }
    function removeItem(index) {
        setItems((currentItems) => currentItems.filter((_, i) => i !== index));
    }
    function handleProjectChange(value) {
        setProjectId(value);
        setFeedback("");
        setItems((currentItems) =>
            currentItems.map((item) => ({ ...item, material_id: "", unit_id: "", quantity: "" }))
        );
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setFeedback("");
        if (!projectId) {
            setFeedback("Select a project before choosing materials.");
            return;
        }
        const requestedByMaterial = new Map();
        for (const item of items) {
            const quantity = Number(item.quantity);
            if (!item.material_id || !item.unit_id || !Number.isInteger(quantity) || quantity <= 0) {
                setFeedback("Select a material and enter a positive whole-number quantity for every row.");
                return;
            }
            const key = String(item.material_id);
            requestedByMaterial.set(key, (requestedByMaterial.get(key) || 0) + quantity);
        }
        for (const [materialId, quantity] of requestedByMaterial) {
            if (quantity > availableQuantity(materialId)) {
                const materialName = material.find((entry) => String(entry.id) === materialId)?.material_name || "Selected material";
                setFeedback(`${materialName}: requested quantity exceeds the ${availableQuantity(materialId)} available in this project.`);
                return;
            }
        }
        const formData = new FormData(e.currentTarget);
        formData.append("items", JSON.stringify(items));
        try {
            const issueRes = await axios.post("/material_issue/create.php", formData);
            if (issueRes.data.status) {
                window.location.href = "/material_stock/material_issue";
            } else {
                setFeedback(issueRes.data.message || "Unable to create material issue.");
            }
        } catch (error) {
            console.error("Material issue creation failed:", error);
            setFeedback(error.response?.data?.message || "Unable to create material issue. Check your connection and try again.");
        }
    }
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Create Material Issue</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: "#c0b553" }}></i>
                                <Link to="/material_stock/material_issue" style={{ color: "black" }}>Material Issue</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Create Material Issue</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <p className="card-description fw-bold">Issue Information</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-issue-no-1">Issue No</label>
                                            <input id="form-issue-no-1" name="issue_no" type="number" min="1" max="2147483647" step="1" inputMode="numeric" className="form-control" placeholder="Enter Issue No" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-issue-date-1">Issue Date</label>
                                            <input id="form-issue-date-1" name="issue_date" type="date" className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-project-1">Project</label>
                                            <select id="form-project-1" name="project_id" className="form-control" value={projectId} onChange={(e) => handleProjectChange(e.target.value)} required>
                                                <option value="">Select Project</option>
                                                {project.map((p) => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-employee-1">Issued To</label>
                                            <select id="form-employee-1" name="issue_to" className="form-control" required>
                                                <option value="">Select Employee</option>
                                                {employee.map((emp) => (
                                                <option key={emp.id} value={emp.id}>{emp.employee_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-purpose-1">Purpose</label>
                                            <input id="form-purpose-1" name="purpose" type="text" className="form-control" placeholder="Enter Purpose" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-remark-1">Remark</label>
                                            <input id="form-remark-1" name="remark" type="text" className="form-control" placeholder="Enter Remark" />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold mb-0">Material Details</h5>
                                    <button style={{border: "2px solid green", color: "green"}} type="button" className="btn btn-success-outline" onClick={addItem}>
                                        <i className="mdi mdi-plus"></i> Add Item
                                    </button>
                                </div>
                                {feedback && <div className="alert alert-danger" role="alert">{feedback}</div>}
                                {projectId && availableStock.size === 0 && (
                                    <div className="alert alert-warning" role="status">
                                        No materials have available stock in this project. Receive a purchase or add opening inventory before creating an issue.
                                    </div>
                                )}
                                {items.map((item, index) => (
                                <div className="row align-items-end mb-3" key={index}>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="form-material-1">Material</label>
                                            <select id="form-material-1" className="form-control" value={item.material_id} onChange={(e) => handleItemChange(index, "material_id", e.target.value)} required>
                                                <option value="">Select Material</option>
                                                {material.map((m) => (
                                                availableQuantity(m.id) > 0 && (
                                                    <option key={m.id} value={m.id}>
                                                        {m.material_name} — Available: {availableQuantity(m.id)}
                                                    </option>
                                                )
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="form-unit-1">Unit</label>
                                            <select id="form-unit-1" className="form-control" value={item.unit_id} disabled required>
                                                <option value="">Select Unit</option>
                                                {unit.map((u) => (
                                                <option key={u.id} value={u.id}>{u.unit_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label htmlFor="form-quantity-1">Quantity</label>
                                            <input id="form-quantity-1" type="number" min="1" max={availableQuantity(item.material_id) || undefined} step="1" className="form-control" placeholder="Enter Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <button type="button" className="btn btn-danger-outline" onClick={() => removeItem(index)} disabled={items.length === 1}>
                                            <i className="mdi mdi-delete-outline" style={{ color: "red", fontSize: "40px", marginLeft: "-40px"}}></i>
                                        </button>
                                    </div>
                                </div>
                                ))}
                                <hr />
                                <div className="text-center">
                                    <button className="btn btn-primary" type="submit">Create Material Issue</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

}
export default IssueCreate;