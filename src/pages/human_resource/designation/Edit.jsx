import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function EditDesignation() {
    let { id } = useParams();
    const [ designation, setDesignation] = React.useState([]);
       async function fetchDesignation () {
        let res = await axios.get(`/designation/single.php?id=` + id)
            setDesignation(res.data.data[0]);
       }
        React.useEffect(()=>{
            fetchDesignation();
        },[]);

    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/designation/update.php?id=' + id, formData);
        if(res.status === 200) {
         window.location.href = '/human_resource/designation';
        }
}
    return (
      <Layout>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">Update Designation</h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                  <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                      <Link to="/designation" style={{color: 'black'}}>Designations List</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                      <a href="" title="Update Designation">Update Designation </a>
                  </li>
              </ol>
            </nav>
          </div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <form onSubmit={ handleSubmit }>
                  <p className="card-description fw-bold">Designation Info</p>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="designation_name">Designation Name</label>
                          <input onChange={(e) => setDesignation({...designation, designation_name: e.target.value})} value={designation.designation_name || ''} name="designation_name" type="text" id="designation_name" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <input onChange={(e) => setDesignation({...designation, description: e.target.value})} value={designation.description || ''} name="description" type="text" id="description" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                      <button className="btn btn-primary" type="submit">Update Designation</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}
export default EditDesignation;