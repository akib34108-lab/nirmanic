import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from "../../../lib/axios.js";

function EditDepartment() {
    let { id } = useParams();
    const [ department, setDepartment] = React.useState([]);
        async function fetchDepartment () {
            let res = await axios.get('/department/single.php?id=' + id);
              setDepartment(res.data.data[0]);
        }
        React.useEffect(()=>{
            fetchDepartment();
        },[]);

    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/department/update.php?id=' + id, formData);
        if(res.status === 200) {
          window.location.href = '/human_resource/department';
        }
}
    return (
      <Layout>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">Update Department</h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                  <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                      <Link to="/human_resource/department" style={{color: 'black'}}>Departments List</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                      <a href="" title="Update Department">Update Department </a>
                  </li>
              </ol>
            </nav>
          </div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <form onSubmit={ handleSubmit }>
                  <p className="card-description fw-bold">Department Info</p>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                          <input onChange={(e) => setDepartment({...department, department_name: e.target.value})} value={department.department_name || ''} name="department_name" type="text" id="department_name" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                          <input onChange={(e) => setDepartment({...department, description: e.target.value})} value={department.description || ''} name="description" type="text" id="description" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                      <button className="btn btn-primary" type="submit">Update Department</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}
export default EditDepartment;