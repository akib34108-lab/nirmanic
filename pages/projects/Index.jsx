import React from "react";
import { Link } from "react-router";

function Projects() {
    const [ projects, setProjects] = React.useState([]);
    function fetchProject () {
        fetch ('http://localhost/nirmanic_api/projects/index.php')
        .then (response=>response.json())
        .then (data=>setProjects(data))
        .catch (error=>console.error("Fetching projects error:",error));
    }
    React.useEffect(()=>{
        fetchProject();
    },[projects]);
    return (
    <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">All Projects</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Projects & Clients</li>
              <li className="breadcrumb-item active" aria-current="page"><a href="#">Project List</a></li>
            </ol>
          </nav>
        </div>
        <div>
            <form className="nav-link form-inline mt-2 mt-md-0">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search Projects" />
                    <div className="input-group-append">
                        <span className="input-group-text">
                        <i className="mdi mdi-magnify"></i>
                        </span>
                    </div>
                    <Link to="/projects/create" className="btn btn-info d-flex justify-content-center align-items-center">
                        <i className="mdi mdi-plus"></i> Add Project
                    </Link>
                </div>
            </form>
        </div>
        <div className="col-12 grid-margin">
            <div className="card">

                {projects.map((project) => (

                <div className="card-body" key={ project.id }>
                    <div className="row">
                        <div className="d-flex align-items-center w-100">
                            <div className="mr-3">
                                <i className="mdi mdi-domain" style={{ fontSize: "32px", color: "#4B49AC" }} ></i>
                            </div>
                            <div>
                                <h6 className="mb-1">{project.name}</h6>
                                    <small className="text-muted">{project.id} · {project.type}</small>
                            </div>
                            <div className="ml-auto">
                                <span style={{color: "#0fa80f"}}>{project.status}</span>
                            </div>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <small className="text-muted d-block mb-1">Budget</small>
                            <h6 className="mb-0">৳ {project.budget}</h6>
                        </div>
                        <div className="col-md-3">
                            <small className="text-muted d-block mb-1">Client</small>
                            <h6 className="mb-0">{project.client_id}</h6>
                        </div>
                        <div className="col-md-3 text-md-right">
                            <small className="text-muted d-block mb-1">Manager</small>
                            <h6 className="mb-0">Rahim Ahmed</h6>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">Progress</small>
                        <small className="font-weight-bold">{project.progress}%</small>
                    </div>
                    <div className="progress mb-2" style={{ height: "6px" }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${project.progress}%` }} aria-valuenow={project.progress} aria-valuemin={0} aria-valuemax={100}>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">Start: {project.start_date}</small>
                        <small className="text-muted">Approximate End: {project.expected_completion_date}</small>
                    </div>
                    <div className="mt-3">
                            <small className="text-muted d-block mb-1">Description</small>
                            <h6 className="mb-0">{project.description}</h6>
                    </div>
                </div>
                ))}
            </div>
        </div> 
    </div>
    );
}
export default Projects;