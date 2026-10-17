import Layout from "../../Layout.jsx";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

function IssueDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ issue, setIssue] = useState([]);
    const fetchIssue = async () => {
        let res = await axios.get(`/material_issue/index.php`);
            setIssue(res.data.data[0]);
    }
    useEffect(()=>{
        fetchIssue();
    },[]);
    return (
        <Layout >
            <div className="content-wrapper">
                <div className="card mt-1">
                    <div className="card-header p-3 d-flex justify-content-between align-items-center">
                        <h4>Material Issue Details</h4>
                            <div className="d-flex gap-2">
                                <button type="button" onClick={() => window.history.back()}
                                    style={{ backgroundColor: "#6c757d", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px", marginRight: "5px"}}>
                                    <i className="mdi mdi-arrow-left" style={{ marginRight: "6px" }}></i>
                                    Back
                                </button>
                                <button
                                    type="button" onClick={() => navigate(`/material_stock/material_issue/edit/${id}`, {replace: true})} style={{ backgroundColor: "#ffc107", color: "#212529", padding: "8px 16px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px", marginRight: "5px"}}>
                                    <i className="mdi mdi-pencil" style={{ marginRight: "6px" }}></i>
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    style={{ backgroundColor: "#0d6efd", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px"}}>
                                    <i className="mdi mdi-printer" style={{ marginRight: "6px" }}></i>
                                    Print
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Issue No:</strong> {issue.issue_no}</p>
                                    <p><strong>Project:</strong> {issue.project_no}</p>
                                    <p><strong>Issue Date:</strong>{issue.issue_date}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Issued To:</strong></p>
                                    <p><strong>Purpose:</strong> Construction Work</p>
                                    <p><strong>Remarks:</strong> N/A</p>
                                </div>
                            </div>

        <hr />

        <h5>Material Details</h5>

        <div className="table-responsive">
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>SL</th>
                <th>Material Name</th>
                <th>Quantity</th>
                <th>Unit</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Cement</td>
                <td>100</td>
                <td>Bag</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Rod</td>
                <td>50</td>
                <td>Kg</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
    </div><div className="card-header">
        <h4>Material Issue Details</h4>
    </div>
    <div className="card-body">
    <div className="row">
        <div className="col-md-6">
            <p><strong>Issue No:</strong> MI-001</p>
            <p><strong>Project:</strong> Building Project</p>
            <p><strong>Issue Date:</strong> 2026-10-17</p>
        </div>

        <div className="col-md-6">
            <p><strong>Issued To:</strong> Site Engineer</p>
            <p><strong>Purpose:</strong> Construction Work</p>
            <p><strong>Remarks:</strong> N/A</p>
        </div>
        </div>
        </div>
        </div>
                                    
        </Layout>
        );
    }

export default IssueDetails;
