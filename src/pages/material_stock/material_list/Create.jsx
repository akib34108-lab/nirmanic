import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import { useState, useEffect } from "react";

function MaterialsCreate() {
  const [category, setCategory] = useState([]);
    const [unit, setUnit] = useState([]);
    useEffect(() => {
        async function fetchCategory() {
            let res = await axios.get("/material_category/index.php");
                if (res.data.data) {
                    setCategory(res.data.data);
                }
        }
        fetchCategory();
    }, []);
    useEffect(() => {
        async function fetchUnit() {
            let res = await axios.get("/material_unit/index.php");
                if (res.data.data) {
                    setUnit(res.data.data);
                }
        }
        fetchUnit();
    }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/material_list/create.php', formData);
      if (res.status === 200) {
        window.location.href = '/material_stock/material_list';
      }
  }
    
    return (
        <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Create Material</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_list" style={{color: 'black'}}>Material List</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Create Material </a>
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
                            <input placeholder="Material Name" name="material_name" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <select name="unit_id" className="form-control">
                                <option value="">Select Unit</option>
                                {unit.map((unit) => (
                                    <option key={unit.id} value={unit.id}>{unit.short_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <select name="category_id" className="form-control">
                                <option value="">Select Category</option>
                                {category.map((category) => (
                                    <option key={category.id} value={category.id}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Create Material</button>
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
export default MaterialsCreate;