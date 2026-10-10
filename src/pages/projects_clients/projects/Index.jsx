import React from "react";
import { Link } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

const projectTypes = {
    1: "Residential",
    2: "Commercial",
    3: "Industrial",
    4: "Infrastructure",
    5: "Institutional",
    6: "Hospitality",
    7: "Government",
    8: "Renovation",
    9: "Other"
};
const projectStatuses = {
    1: "Planning",
    2: "Upcoming",
    3: "Ongoing",
    4: "On Hold",
    5: "Delayed",
    6: "Completed",
    7: "Cancelled",
};
const projectStatusColors = {
    1: "#6f42c1", // Planning
    2: "#0d6efd", // Upcoming
    3: "#198754", // Ongoing
    4: "#fd7e14", // On Hold
    5: "#f0ad00", // Delayed
    6: "#157347", // Completed
    7: "#dc3545", // Cancelled
};
function Projects() {
    const [ projects, setProjects ] = React.useState([]);
    const fetchProject = async () => {
        let res = await axios.get(`/projects/index.php`)
        setProjects(res.data.data);
    }
    React.useEffect(()=>{
        fetchProject();
    },[]);

    async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this project?")) {
        let res = await axios.delete(`/projects/delete.php?id=${id}`)
        if(res.data.status){
        fetchProject();
        }
    }
    }

  return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                <h3 className="page-title">All Projects</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>Projects & Clients</li>
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
                            <Link to="/projects_clients/projects/create" className="btn btn-info d-flex justify-content-center align-items-center">
                                <i className="mdi mdi-plus"></i> Add Project
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">

                        {projects && projects.map((project) => (

                        <div className="card-body" key={ project.id }>
                            <div className="row">
                                <div className="d-flex align-items-center w-100">
                                    <div className="mr-3">
                                        <i className="mdi mdi-domain" style={{ fontSize: "32px", color: "#4B49AC" }} ></i>
                                    </div>
                                    <div>
                                        <h6 className="mb-1">{project.name}</h6>
                                            <small className="text-muted">{project.project_code} · {projectTypes[project.type]}</small>
                                    </div>
                                    <div className="ml-auto" style={{display: "flex",alignItems: "center",gap: "7px",color: projectStatusColors[project.status]}}>
                                        <span style={{width: "8px",height: "8px",borderRadius: "50%",backgroundColor: projectStatusColors[project.status],display: "inline-block"}}></span>
                                        <span>{projectStatuses[project.status]}</span>
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
                                    <h6 className="mb-0">{project.client_name}</h6>
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
                                <div className="progress-bar" role="progressbar" style={{ width: `${project.progress}%`, backgroundColor:
                                    project.progress <= 20
                                    ? "#dc3545"
                                    : project.progress <= 40
                                    ? "#fd7e14"
                                    : project.progress <= 60
                                    ? "#ffc107"
                                    : project.progress <= 80
                                    ? "#0d6efd"
                                    : "#198754"
                                    }}
                                    aria-valuenow={project.progress} aria-valuemin={0} aria-valuemax={100} >
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">Start: {project.start_date}</small>
                                <small className="text-muted">Approximate End: {project.expected_completion_date}</small>
                            </div>
                            <div className="row">
                                <div className="col-md-8 mt-3">
                                    <small className="text-muted d-block mb-1">Description</small>
                                    <p className="text-muted mb-0">{project.description}</p>
                                </div>
                                <div className="col-md-4 mt-3 text-md-right">
                                    <Link to={`/projects_clients/projects/edit/${project.id}`} style={{ backgroundColor: "black", color: "white" }} type="button" className="btn btn-outline-secondary btn-icon-text mr-1" title="Edit"> Edit <i className="mdi mdi-file-check btn-icon-append"></i>
                                    </Link>
                                    <button style={{ backgroundColor: "black", color: "white" }} type="button" className="btn btn-outline-secondary btn-icon-text" title="Delete" onClick={() => handleDelete(project.id)}> Delete <i className="mdi mdi-delete"></i>
                                    </button>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
        </Layout>
    );
}
export default Projects;