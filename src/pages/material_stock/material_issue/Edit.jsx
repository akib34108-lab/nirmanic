import Layout from "../../Layout.jsx";
import { Link, useParams } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function IssueEdit() {
    const { id } = useParams();
    const [issue, setIssue] = useState([]);
    const [project, setProject] = useState([]);
    const [material, setMaterial] = useState([]);
    const [employee, setEmployee] = useState([]);
        async function fetchIssue() {
            let res = await axios.get(`/material_issue/single.php?id=` + id);
                if (res.data.data) {
                    setIssue(res.data.data[0]);
                }
        }
        async function fetchProject() {
            let res = await axios.get("/projects/index.php");
                if (res.data.data) {
                    setProject(res.data.data);
                }
        }
        async function fetchMaterial() {
            let res = await axios.get("/material_list/index.php");
                if (res.data.data) {
                    setMaterial(res.data.data);
                }
        }
        async function fetchIssueTo() {
            let res = await axios.get("/employees/index.php");
                if (res.data.data) {
                    setEmployee(res.data.data);
                }
        }
    useEffect(()=>{
        fetchIssue();
        fetchProject();
        fetchMaterial();
        fetchIssueTo();
    },[]);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/material_issue/update.php?id=' + id, formData);
      if (res.status === 200) {
        window.location.href = '/material_stock/material_issue';
      }
  }
    
    return (
        <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Edit Material Issue</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_issue" style={{color: 'black'}}>Material Issue</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material Issue">Update Material Issue </a>
                    </li>
                </ol>
              </nav>
            </div>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={ handleSubmit }>
                    <p className="card-description fw-bold">Material Issue Info</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <input onChange={(e)=>setIssue({...issue, issue_no: e.target.value})} value={issue.issue_no || ''} placeholder="Issue No" name="issue_no" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <input onChange={(e)=>setIssue({...issue, issue_date: e.target.value})} value={issue.issue_date || ''} placeholder="Issue Date" name="issue_date" type="date" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <select onChange={(e)=>setIssue({...issue, project_id: e.target.value})} value={issue.project_id || ''} name="project_id" className="form-control">
                                <option value="">Select Project</option>
                                {project.map((project) => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <select onChange={(e)=>setIssue({...issue, material_id: e.target.value})} value={issue.material_id || ''} name="material_id" className="form-control">
                                <option value="">Select Material</option>
                                {material.map((material) => (
                                    <option key={material.id} value={material.id}>{material.material_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <input onChange={(e)=>setIssue({...issue, quantity: e.target.value})} value={issue.quantity || ''} placeholder="Quantity" name="quantity" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <select onChange={(e)=>setIssue({...issue, issue_to: e.target.value})} value={issue.issue_to || ''} name="issue_to" className="form-control">
                                <option value="">Select Employee to Issue</option>
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
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Update Material Issue</button>
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
export default IssueEdit;