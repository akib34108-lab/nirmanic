import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function MaterialsPurchaseCreate() {
  const [project, setProject] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [material, setMaterial] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const totalAmount = quantity * unit ;
    async function fetchProject() {
            let res = await axios.get("projects/index.php");
                if (res.data.data) {
                    setProject(res.data.data);
                }
        }
    async function fetchSupplier() {
            let res = await axios.get("supplier/index.php");
                if (res.data.data) {
                    setSupplier(res.data.data);
                }
        }
    async function fetchMaterial() {
            let res = await axios.get("material_list/index.php");
                if (res.data.data) {
                    setMaterial(res.data.data);
                }
        }
    useEffect(() => {
        fetchProject();
        fetchMaterial();
        fetchSupplier();
    }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/material_purchase/create.php', formData);
      if (res.status === 200) {
        window.location.href = '/material_stock/material_purchase';
      }
  }
    
    return (
        <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Create Material Purchase</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_purchase" style={{color: 'black'}}>Material Purchase List</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Create Material Purchase</a>
                    </li>
                </ol>
              </nav>
            </div>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={ handleSubmit }>
                    <p className="card-description fw-bold">Material Purchase Info</p>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                            <input placeholder="Purchase Number" name="purchase_no" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <input placeholder="Purchase Date" name="purchase_date" type="date" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
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
                      <div className="col-md-4">
                        <div className="form-group">
                            <select name="supplier_id" className="form-control">
                                <option value="">Select Supplier</option>
                                {supplier.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>{supplier.supplier_name} ({supplier.company_name})</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <select name="material_id" className="form-control">
                                <option value="">Select Material</option>
                                {material.map((material) => (
                                    <option key={material.id} value={material.id}>{material.material_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <input value={ quantity } onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" name="quantity" type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                              <input value={ unit } onChange={(e) => setUnit(e.target.value)} placeholder="Unit Price" name="unit_price" type="text" className="form-control" />
                          </div>
                        </div>
                      <div className="col-md-4">
                        <div className="form-group">
                              <input value={totalAmount.toFixed(2)} placeholder="Total Amount" name="total_amount" type="text" className="form-control" readOnly/>
                          </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <select placeholder="Select Material Purchase Status" name="status" id="status" className="form-control">
                                <option value="">Select Material Purchase Status</option>
                                <option value="1">Draft</option>
                                <option value="2">Pending</option>
                                <option value="3">Ordered</option>
                                <option value="4">Partially Received</option>
                                <option value="5">Received</option>
                                <option value="6">Cancelled</option>
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Create Material Purchase</button>
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
export default MaterialsPurchaseCreate;