import React from "react";
import { Link } from "react-router";

function CreateProjects() {
    function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch('http://localhost/nirmanic_api/projects/create.php', {
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
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Create Project</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                    <Link to="/projects" style={{color: 'black'}}>Projects List</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to="/projects">Create Project </Link>
                </li>
            </ol>
          </nav>
        </div>
       <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <form onSubmit={ handleSubmit }>
              <p className="card-description">Project info</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Project Name</label>
                    <div className="col-sm-9">
                      <input name="name" type="text" id="name" className="form-control" placeholder="Project Name" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="client_id" className="col-sm-3 col-form-label">Client ID</label>
                    <div className="col-sm-9">
                      <input name="client_id" type="text" id="client_id" className="form-control" placeholder="Client ID" />
                    </div>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="location" className="col-sm-3 col-form-label">Location</label>
                    <div className="col-sm-9">
                      <input name="location" type="text" id="location" className="form-control" placeholder="Project Location" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="type" className="col-sm-3 col-form-label">Type</label>
                    <div className="col-sm-9">
                        <select name="type" id="type" className="form-control">
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
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="budget" className="col-sm-3 col-form-label">Budget</label>
                    <div className="col-sm-9">
                      <input name="budget" type="text" id="budget" className="form-control" placeholder="Project Budget" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="progress" className="col-sm-3 col-form-label">Progress</label>
                    <div className="col-sm-9">
                      <input name="progress" type="text" id="progress" className="form-control" placeholder="Project Progress" />
                    </div>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
                    <div className="col-sm-9">
                        <select name="status" id="status" className="form-control">
                            <option value="">Select Project Status</option>
                            <option value="1">Planning</option>
                            <option value="2">Upcoming</option>
                            <option value="3">Active</option>
                            <option value="4">On Hold</option>
                            <option value="5">Delayed</option>
                            <option value="6">Completed</option>
                            <option value="7">Cancelled</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="start_date" className="col-sm-3 col-form-label">Start Date</label>
                    <div className="col-sm-9">
                      <input name="start_date" type="date" id="start_date" className="form-control" placeholder="Start Date" />
                    </div>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="expected_completion_date" className="col-sm-3 col-form-label">Completion Date</label>
                    <div className="col-sm-9">
                      <input name="expected_completion_date" type="date" id="expected_completion_date" className="form-control" placeholder="Completion Date" />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group row">
                    <textarea name="description" id="description" className="form-control" rows="4" placeholder="Project Description"></textarea>
                  </div>
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>
</div>
</div>
</div>

    );
}
export default CreateProjects;