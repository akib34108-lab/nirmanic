
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateProjects() {
    const [startDate, setStartDate] = useState(null);
    const [completionDate, setCompletionDate] = useState(null);

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
        <Layout>
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
                        <a href="" title="Create Project">Create Project </a>
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
                            <input placeholder="Project Name" name="name" type="text" id="name" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <input placeholder="Project Code" name="project_code" type="text" id="project_code" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <input placeholder="Client ID" name="client_id" type="text" id="client_id" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <input placeholder="Location" name="location" type="text" id="location" className="form-control" />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
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
                      <div className="col-md-6">
                        <div className="form-group">
                            <input placeholder="Budget" name="budget" type="text" id="budget" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <input placeholder="Progress" name="progress" type="text" id="progress" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                                <select placeholder="Select Project Status" name="status" id="status" className="form-control">
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
                      <div className="col-md-3">
                        <div className="form-group">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" dateFormat="yyyy-MM-dd" className="form-control" id="start_date"/>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                            <DatePicker selected={completionDate} onChange={(date) => setCompletionDate(date)} placeholderText="Expected Completion Date" dateFormat="yyyy-MM-dd" className="form-control" id="expected_completion_date"/>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Create Project</button>
                            </div>
                            </div>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </Layout>
    );
}
export default CreateProjects;