
import { Link } from "react-router";
import Layout from "../../Layout.jsx";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../../lib/axios.js';

function CreateProjects() {
    const [startDate, setStartDate] = useState(null);
    const [completionDate, setCompletionDate] = useState(null);
    const [employee, setEmployee] = useState([]);
    const [client, setClient] = useState([]);

    const fetchEmployee = async () => {
        let res = await axios.get(`/employees/index.php`)
        setEmployee(res.data.data); 
    }
    const fetchClient = async () => {
        let res = await axios.get(`/clients/index.php`)
        setClient(res.data.data);
    }
    useEffect(()=>{
        fetchEmployee();
        fetchClient();
    },[]);

    async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    
    let res = await axios.post('/projects/create.php', formData);
    if(res.status === 200) {
      window.location.href = '/projects_clients/projects';
    }
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
                        <Link to="/projects_clients/projects" style={{color: 'black'}}>Projects List</Link>
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
                            <label htmlFor="name">Project Name</label>
                            <input placeholder="Project Name" name="name" type="text" id="name" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="project_code">Project Code</label>
                            <input placeholder="Project Code" name="project_code" type="text" id="project_code" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <label htmlFor="client_id">Client</label>
                              <select name="client_id" id="client_id" className="form-control">
                                  <option value="">Select Client</option>
                                  {client.map((client) => (
                                      <option key={client.id} value={client.id}>{client.client_name}</option>
                                  ))}
                              </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <label htmlFor="location">Location</label>
                              <input placeholder="Location" name="location" type="text" id="location" className="form-control" />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                              <label htmlFor="type">Type</label>
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
                            <label htmlFor="budget">Budget</label>
                            <input placeholder="Budget" name="budget" type="text" id="budget" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <label htmlFor="progress">Progress</label>
                              <input placeholder="Progress" name="progress" type="text" id="progress" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                                <label htmlFor="status">Project Status</label>
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
                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="start_date">Start Date</label>
                            <DatePicker name="start_date" selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" dateFormat="yyyy-MM-dd" className="form-control" id="start_date"/>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="expected_completion_date">Expected Completion Date</label>
                            <DatePicker name="expected_completion_date" selected={completionDate} onChange={(date) => setCompletionDate(date)} placeholderText="Expected Completion Date" dateFormat="yyyy-MM-dd" className="form-control" id="expected_completion_date"/>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="employee_id">Project Employee</label>
                            <select name="employee_id" id="employee_id" className="form-control">
                                <option value="">Select Project Employee</option>
                                {employee.map((emp) => (
                                    <option key={emp.id} value={emp.id}>{emp.employee_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="row"> 
                      <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea placeholder="Description" name="description" id="description" className="form-control" rows="4"></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
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