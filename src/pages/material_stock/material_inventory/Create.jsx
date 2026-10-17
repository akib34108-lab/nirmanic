import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function MaterialsInventoryCreate() {
  const [project, setProject] = useState([]);
  const [material, setMaterial] = useState([]);
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
    useEffect(()=>{
      fetchProject();
      fetchMaterial();
    },[]);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/material_inventory/create.php', formData);
      if (res.status === 200) {
        window.location.href = '/material_stock/material_inventory';
      }
  }
    
    return (
        <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Create Material Inventory</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_inventory" style={{color: 'black'}}>Material List</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Create Material Inventory</a>
                    </li>
                </ol>
              </nav>
            </div>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={ handleSubmit }>
                    <p className="card-description fw-bold">Material Inventory Info</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <select name="material_id" className="form-control">
                                <option value="">Select Material</option>
                                {material.map((material) => (
                                    <option key={material.id} value={material.id}>{material.material_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <select name="project_id" className="form-control">
                                <option value="">Select Project</option>
                                {project.map((project) => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <input placeholder="Quantity Available" name="quantity_available" type="text" className="form-control" />
                        </div>
                      </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <input placeholder="Quantity Used" name="quantity_used" type="text" className="form-control" />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <input placeholder="Current Stock" name="current_stock" type="text" className="form-control" />
                          </div>
                        </div>
                      <div className="col-md-6">
                        <div className="form-group">
                              <input placeholder="Minimum Stock" name="minimum_stock" type="text" className="form-control" />
                          </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Create Material Inventory</button>
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
export default MaterialsInventoryCreate;