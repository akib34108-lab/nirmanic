import React from "react";
import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
function Departments() {
    const [ department, setDepartment] = React.useState([]);
        async function fetchDepartment () {
            let res = await axios.get(`/department/index.php`)
            setDepartment(res.data.data);
        }
        React.useEffect(()=>{
            fetchDepartment();
        },[]);
        async function handleDelete (id,departmentName) {
            if(window.confirm(`Are you sure want to delete this ${departmentName}?`)) {
                let res = await axios.delete(`/department/delete.php?id=${id}`)
                if(res.data.status) {
                    await fetchDepartment();
                }
            }
        }
        return (

        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">All Departments</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Departments</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Department List</li>
                        </ol>
                    </nav>
                </div>
                <div className="mb-4">
                    <form className="form-inline mt-2 mt-md-0">
                        <div className="d-flex w-100">
                            <div className="input-group flex-grow-1">
                                <input type="text" className="form-control" placeholder="Search Department"/>
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="mdi mdi-magnify"></i>
                                    </span>
                                </div>
                            </div>
                            <Link to="/human_resource/department/create" className="btn btn-info ml-2">
                                <i className="mdi mdi-plus mr-1"></i> Add Department
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Department List</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Department</th>
                                                <th>Description</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {department && department.map((dept) => (
                                            <tr key={dept.id}>
                                                <td>{dept.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="mr-3">
                                                            <i className="mdi mdi-account-tie" style={{ fontSize: "28px", color: "#4B49AC" }}></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-1">{dept.department_name}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <h6 className="mb-1">{dept.description}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <Link to={`/human_resource/department/edit/${dept.id}`}><i className="mdi mdi-pencil" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
                                                    <Link to={''} onClick={() => handleDelete(dept.id, dept.department_name)}><i className="mdi mdi-delete" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
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

export default Departments;