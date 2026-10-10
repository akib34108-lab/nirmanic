import React from "react";
import Layout from "../../Layout.jsx";
import { Link } from "react-router";
function Designation() {
    const [ designation, setDesignation] = React.useState([]);
        function fetchDesignation () {
            fetch ('http://localhost/nirmanic_api/designation/index.php')
            .then (response=>response.json())
            .then (data=>setDesignation(data.data))
            .catch (error=>console.error("Fetching designation error:",error));
        }
        React.useEffect(()=>{
            fetchDesignation();
        },[]);
        function handleDelete (id) {
            if (window.confirm("Are you sure you want to delete this designation?")) {
                fetch('http://localhost/nirmanic_api/designation/delete.php?id=' + id, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status == 'true') {
                        fetchDesignation();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
        }
        return (

        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">All Designations</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Designations</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Designation List</li>
                        </ol>
                    </nav>
                </div>
                <div className="mb-4">
                    <form className="form-inline mt-2 mt-md-0">
                        <div className="d-flex w-100">
                            <div className="input-group flex-grow-1">
                                <input type="text" className="form-control" placeholder="Search Designation"/>
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="mdi mdi-magnify"></i>
                                    </span>
                                </div>
                            </div>
                            <Link to="/human_resource/designation/create" className="btn btn-info ml-2">
                                <i className="mdi mdi-plus mr-1"></i> Add Designation
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Designation List</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Designations</th>
                                                <th>Department</th>
                                                <th>Employees</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {designation.map((designation) => (
                                            <tr key={designation.id}>
                                                <td>{designation.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="mr-3">
                                                            <i className="mdi mdi-account-tie" style={{ fontSize: "28px", color: "#4B49AC" }}></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-1">{designation.designation_name}</h6>
                                                            <small className="text-muted">{designation.description}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Management</td>
                                                <td>
                                                    <i className="mdi mdi-account-multiple text-muted mr-1"></i>4
                                                </td>
                                                <td className="text-center">
                                                    <Link to={`/human_resource/designation/edit/${designation.id}`}><i className="mdi mdi-pencil" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
                                                    <Link to={''} onClick={() => handleDelete(designation.id)}><i className="mdi mdi-delete" style={{ fontSize:'25px', color: '#6f42c1', marginRight: '10px', cursor: "pointer",}}></i></Link>
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

export default Designation;