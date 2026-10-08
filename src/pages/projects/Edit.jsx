import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../Layout.jsx";

function EditProjects() {
    let { id } = useParams();
    const [ projects, setProjects] = React.useState([]);
        function fetchProject () {
            fetch ('http://localhost/nirmanic_api/projects/single.php?id=' + id)
            .then (response=>response.json())
            .then (data=>setProjects(data.data[0]))
            .catch (error=>console.error("Fetching projects error:",error));
        }
        React.useEffect(()=>{
            fetchProject();
        },[]);

    function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch('http://localhost/nirmanic_api/projects/update.php?id='+ projects.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/projects';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
    return (
        <Layout>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Update Project</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                    <Link to="/projects" style={{color: 'black'}}>Projects List</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a href="" title="Update Project">Update Project </a>
                </li>
            </ol>
          </nav>
        </div>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <form onSubmit={ handleSubmit }>
                <p className="card-description fw-bold">Project Info</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                        <input onChange={(e) => setProjects({...projects, name: e.target.value})} value={projects.name || ''} name="name" type="text" id="name" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                        <input onChange={(e) => setProjects({...projects, project_code: e.target.value})} value={projects.project_code || ''} name="project_code" type="text" id="project_code" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                          <input onChange={(e) => setProjects({...projects, client_id: e.target.value})} value={projects.client_id || ''}  name="client_id" type="text" id="client_id" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                          <input onChange={(e) => setProjects({...projects, location: e.target.value})} value={projects.location || ''} name="location" type="text" id="location" className="form-control" />
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                            <select onChange={(e) => setProjects({...projects, type: e.target.value})} value={projects.type || ''} name="type" id="type" className="form-control">
                                <option value="">Select Project Type</option>
                                <option value="1">Residential</option>
                                <option value="2">Commercial</option>
                                <option value="3">Industrial</option>
                                <option value="4">Infrastructure</option>
                                <option value="5">Institutional</option>
                                <option value="6">Hospitality</option>
                                <option value="7">Government</option>
                                <option value="8">Renovation</option>
                                <option value="9">Other</option>
                            </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                          <input onChange={(e) => setProjects({...projects, budget: e.target.value})} value={projects.budget || ''} name="budget" type="text" id="budget" className="form-control" />
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                          <input onChange={(e) => setProjects({...projects, progress: e.target.value})} value={projects.progress || ''} name="progress" type="text" id="progress" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                            <select onChange={(e) => setProjects({...projects, status: e.target.value})} value={projects.status || ''} name="status" id="status" className="form-control">
                                <option value="">Select Project Status</option>
                                <option value="1">Planning</option>
                                <option value="2">Upcoming</option>
                                <option value="3">Ongoing</option>
                                <option value="4">On Hold</option>
                                <option value="5">Delayed</option>
                                <option value="6">Completed</option>
                                <option value="7">Cancelled</option>
                            </select>
                      </div>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                        <input onChange={(e) => setProjects({...projects, start_date: e.target.value})} value={projects.start_date || ''} name="start_date" type="date" id="start_date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                        <input onChange={(e) => setProjects({...projects, expected_completion_date: e.target.value})} value={projects.expected_completion_date || ''} name="expected_completion_date" type="date" id="expected_completion_date" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea onChange={(e) => setProjects({...projects, description: e.target.value})} value={projects.description || ''} name="description" id="description" className="form-control" rows="4"></textarea>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" type="submit">Update Project</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    );
}
export default EditProjects;