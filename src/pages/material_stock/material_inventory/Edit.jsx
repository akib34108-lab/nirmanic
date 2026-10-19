import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function MaterialsInventoryEdit() {
    let { id } = useParams();
    const [inventory, setInventory] = React.useState([]);
    const [ material, setMaterial ] = React.useState([]);
    const [project, setProject] = React.useState([]);
      async function fetchInventory() {
            let res = await axios.get("/material_inventory/single.php?id=" + id);
            if (res.data.data) {
                setInventory(res.data.data[0]);
            }}
      async function fetchMaterial() {
            let res = await axios.get("/material_list/index.php");
            if (res.data.data) {
                setMaterial(res.data.data);
            }}
        async function fetchProject() {
            let res = await axios.get("/projects/index.php");
            if (res.data.data) {
                setProject(res.data.data);
            }}
        
        React.useEffect(()=>{
            fetchInventory();
            fetchMaterial();
            fetchProject();
            
        },[]);
    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/material_inventory/update.php?id=' + id, formData);
        if(res.status === 200) {
         window.location.href = '/material_stock/material_inventory';
        }
      }
    return (
      <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Update Material Inventory</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_inventory" style={{color: 'black'}}>Material Inventory</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Update Material Inventory</a>
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
                            <label htmlFor="form-option-1">Material</label>
                            <select id="form-option-1" value={inventory.material_id || ''} className="form-control" disabled>
                                <option value="">Select Material</option>
                                {material.map((material) => (
                                    <option key={material.id} value={material.id}>{material.material_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form-option-2">Project</label>
                            <select id="form-option-2" value={inventory.project_id || ''} className="form-control" disabled>
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
                          <label htmlFor="form-quantity-available-3">Quantity Available</label>
                          <input id="form-quantity-available-3" value={inventory.quantity_available ?? ''} placeholder="Quantity Available" type="number" className="form-control" readOnly />
                        </div>
                      </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <label htmlFor="form-quantity-used-4">Quantity Used</label>
                              <input id="form-quantity-used-4" value={inventory.quantity_used ?? ''} placeholder="Quantity Used" type="number" className="form-control" readOnly />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <label htmlFor="form-current-stock-5">Current Stock</label>
                              <input id="form-current-stock-5" value={inventory.current_stock ?? ''} placeholder="Current Stock" type="number" className="form-control" readOnly />
                          </div>
                        </div>
                      <div className="col-md-6">
                        <div className="form-group">
                              <label htmlFor="form-value-6">Minimum Stock</label>
                              <input id="form-value-6" onChange={(e)=>setInventory({...inventory, minimum_stock: e.target.value})} value={inventory.minimum_stock ?? ''} placeholder="Minimum Stock" name="minimum_stock" type="number" min="0" step="1" className="form-control" required />
                          </div>
                          <div className="mb-3">
                            <strong>Status: </strong>
                            {Number(inventory.status) === 1
                              ? "In Stock"
                              : Number(inventory.status) === 2
                                ? "Low Stock"
                                : Number(inventory.status) === 3
                                  ? "Out of Stock"
                                  : "—"}
                          </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Update Material Inventory</button>
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
export default MaterialsInventoryEdit;