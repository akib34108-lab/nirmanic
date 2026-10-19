import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function MaterialsInventoryCreate() {
  const [project, setProject] = useState([]);
  const [material, setMaterial] = useState([]);
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [quantityUsed, setQuantityUsed] = useState("");
  const currentStock = Number(quantityAvailable || 0) - Number(quantityUsed || 0);
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
      if (res.data.status) {
        window.location.href = '/material_stock/material_inventory';
      } else {
        window.alert(res.data.message || "Unable to create material inventory.");
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
                            <label htmlFor="form-material-id-1">Material</label>
                            <select id="form-material-id-1" name="material_id" className="form-control" required defaultValue="">
                                <option value="">Select Material</option>
                                {material.map((material) => (
                                    <option key={material.id} value={material.id}>{material.material_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form-project-id-2">Project</label>
                            <select id="form-project-id-2" name="project_id" className="form-control" required defaultValue="">
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
                            <label htmlFor="form-value-3">Quantity Available</label>
                            <input id="form-value-3" value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)} placeholder="Quantity Available" name="quantity_available" type="number" min="0" step="1" className="form-control" required />
                        </div>
                      </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <label htmlFor="form-value-4">Quantity Used</label>
                              <input id="form-value-4" value={quantityUsed} onChange={(e) => setQuantityUsed(e.target.value)} placeholder="Quantity Used" name="quantity_used" type="number" min="0" step="1" className="form-control" required />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <label htmlFor="form-current-stock-calculated-5">Current Stock (calculated)</label>
                              <input id="form-current-stock-calculated-5" value={currentStock} placeholder="Current Stock (calculated)" type="number" className="form-control" readOnly />
                          </div>
                        </div>
                      <div className="col-md-6">
                        <div className="form-group">
                              <label htmlFor="form-minimum-stock-6">Minimum Stock</label>
                              <input id="form-minimum-stock-6" placeholder="Minimum Stock" name="minimum_stock" type="number" min="0" step="1" className="form-control" required />
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