import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";
import "../../human_resource/employees/Index.css";

function Issue() {
   const [ issue, setIssue ] = React.useState([]);
   const [openMenu, setOpenMenu] = React.useState(null);
    const fetchIssue = async () => {
        let res = await axios.get(`/material_issue/index.php`)
        setIssue(res.data.data);
    }
    React.useEffect(()=>{
        fetchIssue();
    },[]);

    async function handleDelete(id, issueName) {
    if (window.confirm(`Are you sure you want to delete this ${issueName}?`)) {
        let res = await axios.delete(`/material_issue/delete.php?id=${id}`)
        if(res.data.status){
            await fetchIssue();
            }
        }
    }
    return (
    <Layout >
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Materials Issue</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Stock</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Material Issue
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">
                        <div className="input-group flex-grow-1">
                            <input type="text" className="form-control" placeholder="Search Issue"/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>
                            <Link to="/material_stock/material_issue/create" className="btn btn-info d-flex justify-content-center align-items-center mr-2">
                                <i className="mdi mdi-plus"></i> Add Material Issue
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
                            <h4 className="card-title mb-4">Material List Issue</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Issue No</th>
                                            <th>Issue Date</th>
                                            <th>Project</th>
                                            <th>Material</th>
                                            <th>Quantity</th>
                                            <th>Issue to</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {issue && issue.map((issue) => (
                                        <tr key={ issue.id }>
                                            <td>{ issue.issue_no }</td>
                                            <td>{ issue.issue_date }</td>
                                            <td>{ issue.name }</td>
                                            <td>{ issue.material_name }</td>
                                            <td>{ issue.quantity }</td>
                                            <td>{ issue.employee_name }</td>
                                            <td className="text-center">
                                                <div className="employee-action-menu">
                                                    <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === issue.id ? null : issue.id)} title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                    {openMenu === issue.id && (
                                                        <div className="action-dropdown">
                                                            <Link to={`/material_stock/material_issue/details/${issue.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-eye-outline"></i><span>View Details</span></Link>
                                                            <Link to={`/material_stock/material_issue/edit/${issue.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-pencil-outline"></i><span>Edit Issue</span></Link>
                                                            <button type="button" className="action-dropdown-item delete-action" onClick={() => { setOpenMenu(null);  handleDelete(issue.id, issue.issue_no);}}><i className="mdi mdi-delete-outline"></i><span>Delete Issue</span></button>
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

export default Issue;
