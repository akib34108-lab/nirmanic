import Layout from "../../Layout.jsx";
import { Link, useParams } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function MaterialsPurchaseEdit() {
    let { id } = useParams();
    const [project, setProject] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [material, setMaterial] = useState([]);
    const [ purchase, setPurchase ] = useState([]);
      const fetchPurchase = async () => {
        let res = await axios.get(`/material_purchase/single.php?id=` + id);
            setPurchase(res.data.data[0]);
        }
        const fetchProject = async () => {
          let res = await axios.get(`/projects/index.php`)
          setProject(res.data.data);
          }
        const fetchSupplier = async () => {
          let res = await axios.get(`/supplier/index.php`)
          setSupplier(res.data.data);
          }
        const fetchMaterial = async () => {
          let res = await axios.get(`/material_category/index.php`)
          setMaterial(res.data.data);
          }
        useEffect(()=>{
            fetchPurchase();
            fetchProject();
            fetchMaterial();
            fetchSupplier();
        },[]);
    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/material_purchase/update.php?id=' + id, formData);
        if(res.status === 200) {
         window.location.href = '/material_stock/material_purchase';
        }
      }
    return (
      <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Update Material Purchase</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_purchase" style={{color: 'black'}}>Material Purchase List</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Update Material Purchase</a>
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
                            <input onChange={(e)=>setPurchase({...purchase, purchase_no: e.target.value})} value={purchase.purchase_no || ''} placeholder="Purchase Number" name="purchase_no" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <input onChange={(e)=>setPurchase({...purchase, purchase_date: e.target.value})} value={purchase.purchase_date || ''} placeholder="Purchase Date" name="purchase_date" type="date" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <select onChange={(e)=>setPurchase({...purchase, project_id: e.target.value})} value={purchase.project_id || ''} name="project_id" className="form-control">
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
                            <select onChange={(e)=>setPurchase({...purchase, supplier_id: e.target.value})} value={purchase.supplier_id || ''} name="supplier_id" className="form-control">
                                <option value="">Select Supplier</option>
                                {supplier.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>{supplier.supplier_name} ({supplier.company_name})</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <select onChange={(e)=>setPurchase({...purchase, material_id: e.target.value})} value={purchase.material_id || ''} name="material_id" className="form-control">
                                <option value="">Select Material</option>
                                {material.map((material) => (
                                    <option key={material.id} value={material.id}>{material.category_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <input onChange={(e)=>setPurchase({...purchase, quantity: e.target.value})} value={purchase.quantity || ''} placeholder="Quantity" name="quantity" type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                              <input onChange={(e)=>setPurchase({...purchase, unit_price: e.target.value})} value={purchase.unit_price || ''} placeholder="Unit Price" name="unit_price" type="text" className="form-control" />
                          </div>
                        </div>
                      <div className="col-md-4">
                        <div className="form-group">
                              <input onChange={(e)=>setPurchase({...purchase, total_amount: e.target.value})} value={purchase.total_amount || ''} placeholder="Total Amount" name="total_amount" type="text" className="form-control" />
                          </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <select onChange={(e)=>setPurchase({...purchase, status: e.target.value})} value={purchase.status || ''}  placeholder="Select Purchase Status" name="status" id="status" className="form-control">
                                <option value="">Select Purchase Status</option>
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
                                <button className="btn btn-primary" type="submit">Update Material Purchase</button>
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
export default MaterialsPurchaseEdit;