import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function MaterialsCategoryEdit() {
    let { id } = useParams();
    const [ category, setCategory ] = React.useState([]);
      const fetchCategory = async () => {
        let res = await axios.get(`/material_category/single.php?id=` + id);
            setCategory(res.data.data[0]);
        }
        React.useEffect(()=>{
            fetchCategory();
        },[]);
    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/material_category/update.php?id=' + id, formData);
        if(res.status === 200) {
         window.location.href = '/material_stock/material_category';
        }
      }
    return (
      <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Update Material Category</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_list" style={{color: 'black'}}>Material Category List</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Update Material Category</a>
                    </li>
                </ol>
              </nav>
            </div>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={ handleSubmit }>
                    <p className="card-description fw-bold">Material Category Info</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <input onChange={(e)=>setCategory({...category, category_name: e.target.value})} value={category.category_name || ''} placeholder="Material Category Name" name="category_name" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <input onChange={(e)=>setCategory({...category, description: e.target.value})} value={category.description || ''} placeholder="Description" name="description" type="text" className="form-control" />
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
export default MaterialsCategoryEdit;