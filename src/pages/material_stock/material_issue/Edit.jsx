
import Layout from "../../Layout.jsx";
import { Link, useParams, useNavigate } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";

function IssueEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);

    const [project, setProject] = React.useState([]);
    const [material, setMaterial] = React.useState([]);
    const [employee, setEmployee] = React.useState([]);
    const [unit, setUnit] = React.useState([]);

    const [formData, setFormData] = React.useState({
        issue_no: "",
        issue_date: "",
        project_id: "",
        issue_to: "",
        purpose: "",
        remark: "",
    });

    const [items, setItems] = React.useState([]);

    // Fetch dropdown data
    const fetchProject = async () => {
        const res = await axios.get("/projects/index.php");
        setProject(res.data.data || []);
    };

    const fetchMaterial = async () => {
        const res = await axios.get("/material_list/index.php");
        setMaterial(res.data.data || []);
    };

    const fetchEmployee = async () => {
        const res = await axios.get("/employees/index.php");
        setEmployee(res.data.data || []);
    };

    const fetchUnit = async () => {
        const res = await axios.get("/material_unit/index.php");
        setUnit(res.data.data || []);
    };

    // Fetch existing issue
    const fetchIssue = async () => {
        try {
            const res = await axios.get(
                `/material_issue/single.php?id=${id}`
            );

            if (!res.data.status) {
                alert(res.data.message || "Material issue not found.");
                navigate("/material_stock/material_issue");
                return;
            }

            const issueData = res.data.data;

            setFormData({
                issue_no: issueData.issue_no || "",
                issue_date: issueData.issue_date || "",
                project_id: String(issueData.project_id || ""),
                issue_to: String(issueData.issue_to || ""),
                purpose: issueData.purpose || "",
                remark: issueData.remark || "",
            });

            setItems(
                (issueData.items || []).map((item) => ({
                    id: item.id,
                    material_id: String(item.material_id || ""),
                    unit_id: String(item.unit_id || ""),
                    quantity: item.quantity ?? "",
                }))
            );
        } catch (error) {
            console.error("Fetch issue error:", error);
            alert("Failed to load material issue.");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    fetchProject(),
                    fetchMaterial(),
                    fetchEmployee(),
                    fetchUnit(),
                ]);

                await fetchIssue();
            } catch (error) {
                console.error("Dropdown loading error:", error);
                alert("Failed to load form data.");
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    // Handle main form fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle material row fields
    const handleItemChange = (index, field, value) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    // Add material row
    const addItem = () => {
        setItems((prev) => [
            ...prev,
            {
                material_id: "",
                unit_id: "",
                quantity: "",
            },
        ]);
    };

    // Remove material row
    const removeItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    // Update issue and its material items
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.issue_no.trim()) {
            alert("Please enter issue number.");
            return;
        }

        if (!formData.issue_date || !formData.project_id || !formData.issue_to) {
            alert("Please fill in issue date, project and issue to.");
            return;
        }

        const invalidItem = items.some(
            (item) =>
                !item.material_id ||
                !item.unit_id ||
                item.quantity === "" ||
                Number(item.quantity) <= 0
        );

        if (items.length === 0) {
            alert("Please add at least one material.");
            return;
        }

        if (invalidItem) {
            alert("Please select material, unit and valid quantity for every row.");
            return;
        }

        setSaving(true);

        try {
            const itemFormData = new FormData();

            itemFormData.append("issue_id", id);
            Object.entries(formData).forEach(([key, value]) => {
                itemFormData.append(key, value);
            });
            itemFormData.append("items", JSON.stringify(items));

            const itemRes = await axios.post(
                "/material_issue/update_item.php",
                itemFormData
            );

            if (!itemRes.data.status) {
                alert(itemRes.data.message || "Failed to update material issue.");
                return;
            }

            alert("Material issue updated successfully.");

            navigate("/material_stock/material_issue");
        } catch (error) {
            console.error("Update error:", error);
            console.error("API response:", error.response?.data);

            alert(
                error.response?.data?.message ||
                "Something went wrong while updating the material issue."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="content-wrapper">
                    <div className="text-center py-5">
                        Loading material issue...
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Edit Material Issue</h3>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/material_stock/material_issue">
                                    Material &amp; Stock
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/material_stock/material_issue">
                                    Material Issue
                                </Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                Edit Issue
                            </li>
                        </ol>
                    </nav>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Issue Information */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title mb-4">
                                Issue Information
                            </h4>

                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label htmlFor="form-issue-no-1">Issue No *</label>
                                    <input id="form-issue-no-1"
                                        type="number"
                                        name="issue_no"
                                        min="1"
                                        max="2147483647"
                                        step="1"
                                        inputMode="numeric"
                                        className="form-control"
                                        value={formData.issue_no}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="form-issue-date-1">Issue Date *</label>
                                    <input id="form-issue-date-1"
                                        type="date"
                                        name="issue_date"
                                        className="form-control"
                                        value={formData.issue_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="form-project-1">Project *</label>
                                    <select id="form-project-1"
                                        name="project_id"
                                        className="form-control"
                                        value={formData.project_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Project</option>
                                        {project.map((p) => (
                                            <option
                                                key={p.id}
                                                value={p.id}
                                            >
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="form-employee-1">Issue To *</label>
                                    <select id="form-employee-1"
                                        name="issue_to"
                                        className="form-control"
                                        value={formData.issue_to}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Employee</option>
                                        {employee.map((emp) => (
                                            <option
                                                key={emp.id}
                                                value={emp.id}
                                            >
                                                {emp.employee_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="form-issue-purpose-1">Purpose</label>
                                    <input id="form-issue-purpose-1"
                                        type="text"
                                        name="purpose"
                                        className="form-control"
                                        placeholder="Enter issue purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label htmlFor="form-remarks-1">Remark</label>
                                    <textarea id="form-remarks-1"
                                        name="remark"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter remarks"
                                        value={formData.remark}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Material Items */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="card-title mb-0">
                                    Material Items
                                </h4>

                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={addItem}
                                >
                                    <i className="mdi mdi-plus"></i> Add Material
                                </button>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{ minWidth: "220px" }}>
                                                Material *
                                            </th>
                                            <th style={{ minWidth: "160px" }}>
                                                Unit *
                                            </th>
                                            <th style={{ minWidth: "150px" }}>
                                                Quantity *
                                            </th>
                                            <th className="text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={item.id ?? `new-${index}`}>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        value={item.material_id}
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "material_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Material
                                                        </option>

                                                        {material.map((m) => (
                                                            <option
                                                                key={m.id}
                                                                value={m.id}
                                                            >
                                                                {m.material_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td>
                                                    <select
                                                        className="form-control"
                                                        value={item.unit_id}
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "unit_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Unit
                                                        </option>

                                                        {unit.map((u) => (
                                                            <option
                                                                key={u.id}
                                                                value={u.id}
                                                            >
                                                                {u.unit_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        min="0.01"
                                                        step="any"
                                                        placeholder="Enter quantity"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "quantity",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </td>

                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() =>
                                                            removeItem(index)
                                                        }
                                                        title="Remove material"
                                                    >
                                                        <i className="mdi mdi-delete-outline"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {items.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="text-center py-4"
                                                >
                                                    No materials added. Click
                                                    Add Material to continue.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end mb-4">
                        <Link
                            to="/material_stock/material_issue"
                            className="btn btn-light mr-2"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="btn btn-info"
                            disabled={saving}
                        >
                            {saving ? "Updating..." : "Update Material Issue"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default IssueEdit;
