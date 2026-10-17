
import Layout from "../../Layout.jsx";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function IssueDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [issue, setIssue] = useState(null);
    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [units, setUnits] = useState([]);

    const fetchIssue = async () => {
        try {
            const [
                issueRes,
                projectRes,
                employeeRes,
                materialRes,
                unitRes
            ] = await Promise.all([
                axios.get(`/material_issue/single.php?id=${id}`),
                axios.get("/projects/index.php"),
                axios.get("/employees/index.php"),
                axios.get("/material_list/index.php"),
                axios.get("/material_unit/index.php")
            ]);

            if (issueRes.data.status) {
                setIssue(issueRes.data.data);
            }

            setProjects(projectRes.data.data || []);
            setEmployees(employeeRes.data.data || []);
            setMaterials(materialRes.data.data || []);
            setUnits(unitRes.data.data || []);
        } catch (error) {
            console.error("Failed to fetch issue details:", error);
            alert("Failed to load material issue details.");
        }
    };

    useEffect(() => {
        fetchIssue();
    }, [id]);

    const getName = (list, itemId, field) => {
        const item = list.find(
            (data) => String(data.id) === String(itemId)
        );

        return item ? item[field] : "—";
    };

    if (!issue) {
        return (
            <Layout>
                <div className="content-wrapper">
                    <div className="card mt-1">
                        <div className="card-body text-center">
                            Loading material issue details...
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="card mt-1">
                    <div className="card-header p-3 d-flex justify-content-between align-items-center flex-wrap">
                        <h4>Material Issue Details</h4>

                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                style={{
                                    backgroundColor: "#6c757d",
                                    color: "#fff",
                                    padding: "8px 16px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    marginRight: "5px"
                                }}
                            >
                                <i
                                    className="mdi mdi-arrow-left"
                                    style={{ marginRight: "6px" }}
                                ></i>
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/material_stock/material_issue/edit/${id}`,
                                        { replace: true }
                                    )
                                }
                                style={{
                                    backgroundColor: "#ffc107",
                                    color: "#212529",
                                    padding: "8px 16px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    marginRight: "5px"
                                }}
                            >
                                <i
                                    className="mdi mdi-pencil"
                                    style={{ marginRight: "6px" }}
                                ></i>
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => window.print()}
                                style={{
                                    backgroundColor: "#0d6efd",
                                    color: "#fff",
                                    padding: "8px 16px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                <i
                                    className="mdi mdi-printer"
                                    style={{ marginRight: "6px" }}
                                ></i>
                                Print
                            </button>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>Issue No:</strong>{" "}
                                    {issue.issue_no || "—"}
                                </p>

                                <p>
                                    <strong>Project:</strong>{" "}
                                    {getName(
                                        projects,
                                        issue.project_id,
                                        "name"
                                    )}
                                </p>

                                <p>
                                    <strong>Issue Date:</strong>{" "}
                                    {issue.issue_date || "—"}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <p>
                                    <strong>Issued To:</strong>{" "}
                                    {getName(
                                        employees,
                                        issue.issue_to,
                                        "employee_name"
                                    )}
                                </p>

                                <p>
                                    <strong>Purpose:</strong>{" "}
                                    {issue.purpose || "—"}
                                </p>

                                <p>
                                    <strong>Remarks:</strong>{" "}
                                    {issue.remark || "—"}
                                </p>
                            </div>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Material Details</h5>

                            <span className="badge badge-info">
                                {(issue.items || []).length} Items
                            </span>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Material Name</th>
                                        <th>Quantity</th>
                                        <th>Unit</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {(issue.items || []).length > 0 ? (
                                        issue.items.map((item, index) => (
                                            <tr key={item.id || index}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    {getName(
                                                        materials,
                                                        item.material_id,
                                                        "material_name"
                                                    )}
                                                </td>

                                                <td>{item.quantity}</td>

                                                <td>
                                                    {getName(
                                                        units,
                                                        item.unit_id,
                                                        "unit_name"
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >
                                                No material details found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default IssueDetails;
