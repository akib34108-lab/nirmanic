import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function IssueCreate() {
    const [project, setProject] = useState([]);
    const [material, setMaterial] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [unit, setUnit] = useState([]);
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
    useEffect(() => {
        fetchProject();
        fetchMaterial();
        fetchIssueTo();
        fetchUnit();
    }, []);
    function handleItemChange(index, field, value) {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    }
    function addItem() {
        setItems([...items,{ material_id: "", unit_id: "", quantity: "" }]);
    }
    function removeItem(index) {
        setItems(items.filter((_, i) => i !== index));
    }
    async function handleSubmit(e) {
        e.preventDefault();
            const formData = new FormData(e.target);
            const issueRes = await axios.post("/material_issue/create.php", formData);
            const issueId = issueRes.data.data;
            const itemFormData = new FormData();
            itemFormData.append("issue_id", issueId);
            itemFormData.append("items", JSON.stringify(items));
            const itemRes = await axios.post("/material_issue/create_item.php", itemFormData);
            if (itemRes.data.status) {
                window.location.href = "/material_stock/material_issue";
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
                                            <label>Issue No</label>
                                            <input name="issue_no" type="text" className="form-control" placeholder="Enter Issue No" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Issue Date</label>
                                            <input name="issue_date" type="date" className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Project</label>
                                            <select name="project_id" className="form-control" required>
                                                <option value="">Select Project</option>
                                                {project.map((p) => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Issued To</label>
                                            <select name="issue_to" className="form-control" required>
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
                                            <label>Purpose</label>
                                            <input name="purpose" type="text" className="form-control" placeholder="Enter Purpose" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Remark</label>
                                            <input name="remark" type="text" className="form-control" placeholder="Enter Remark" />
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
                                {items.map((item, index) => (
                                <div className="row align-items-end mb-3" key={index}>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Material</label>
                                            <select className="form-control" value={item.material_id} onChange={(e) => handleItemChange(index, "material_id", e.target.value)} required>
                                                <option value="">Select Material</option>
                                                {material.map((m) => (
                                                <option key={m.id} value={m.id}>{m.material_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Unit</label>
                                            <select className="form-control" value={item.unit_id} onChange={(e) => handleItemChange(index, "unit_id", e.target.value)} required>
                                                <option value="">Select Unit</option>
                                                {unit.map((u) => (
                                                <option key={u.id} value={u.id}>{u.unit_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type="number" min="0.01" step="0.01" className="form-control" placeholder="Enter Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", e.target.value)} required />
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