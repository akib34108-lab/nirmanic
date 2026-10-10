import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";

function EditDepartment() {
    let { id } = useParams();
    const [ department, setDepartment] = React.useState([]);
        function fetchDepartment () {
            fetch ('http://localhost/nirmanic_api/department/single.php?id=' + id)
            .then (response=>response.json())
            .then (data=>setDepartment(data.data[0]))
            .catch (error=>console.error("Fetching departments error:",error));
        }
        React.useEffect(()=>{
            fetchDepartment();
        },[]);

    function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch('http://localhost/nirmanic_api/department/update.php?id='+ department.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/human_resource/department';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
                      <Link to="/department" style={{color: 'black'}}>Departments List</Link>
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