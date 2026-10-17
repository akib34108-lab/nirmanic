import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function MaterialsEdit() {
    let { id } = useParams();
    const [ material, setMaterial ] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const [unit, setUnit] = React.useState([]);
      const fetchMaterial = async () => {
        let res = await axios.get(`/material_list/single.php?id=` + id);
            setMaterial(res.data.data[0]);
        }
        async function fetchCategory() {
            let res = await axios.get("/material_category/index.php");
            if (res.data.data) {
                setCategory(res.data.data);
            }}
        async function fetchUnit() {
            let res = await axios.get("/material_unit/index.php");
            if (res.data.data) {
                setUnit(res.data.data);
            }}
        React.useEffect(()=>{
            fetchMaterial();
            fetchCategory();
            fetchUnit();
        },[]);
    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/material_list/update.php?id=' + id, formData);
        if(res.status === 200) {
         window.location.href = '/material_stock/material_list';
        }
      }
    return (
      <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Update Material</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_list" style={{color: 'black'}}>Material List</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Update Material </a>
                    </li>
                </ol>
              </nav>
            </div>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={ handleSubmit }>
                    <p className="card-description fw-bold">Material Info</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <input onChange={(e)=>setMaterial({...material, material_name: e.target.value})} value={material.material_name || ''} placeholder="Material Name" name="material_name" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <select onChange={(e) => setMaterial({...material, unit_id: e.target.value})} value={material.unit_id || ''} name="unit_id" className="form-control">
                                <option value="">Select Unit</option>
                                {unit.map((unit) => (
                                    <option key={unit.id} value={unit.id}>{unit.unit_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <select onChange={(e) => setMaterial({...material, category_id: e.target.value})} value={material.category_id || ''} name="category_id" className="form-control">
                              <option value="">Select Category</option>
                                {category.map((category) => (
                                    <option key={category.id} value={category.id}>{category.category_name}</option>
                                ))}
                          </select>
                        </div>
                      </div>
                        <div className="col-md-6">
                          <div className="form-group">
                              <input onChange={(e)=>setMaterial({...material, description: e.target.value})} value={material.description || ''} placeholder="Description" name="description" type="text" className="form-control" />
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                              <input onChange={(e)=>setMaterial({...material, current_stock: e.target.value})} value={material.current_stock || ''} placeholder="Current Stock" name="current_stock" type="text" className="form-control" />
                          </div>
                        </div>
                      <div className="col-md-4">
                        <div className="form-group">
                              <input onChange={(e)=>setMaterial({...material, minimum_stock: e.target.value})} value={material.minimum_stock || ''} placeholder="Minimum Stock" name="minimum_stock" type="text" className="form-control" />
                          </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                            <select onChange={(e)=>setMaterial({...material, status: e.target.value})} value={material.status || ''}  placeholder="Select Material Status" name="status" id="status" className="form-control">
                                    <option value="">Select Material Status</option>
                                    <option value="1">In Stock</option>
                                    <option value="2">Low Stock</option>
                                    <option value="3">Out of Stock</option>
                                </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Update Material</button>
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
export default MaterialsEdit;