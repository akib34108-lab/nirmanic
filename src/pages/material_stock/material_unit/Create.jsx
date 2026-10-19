import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";

function MaterialsUnitCreate() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/material_unit/create.php', formData);
      if (res.status === 200) {
        window.location.href = '/material_stock/material_unit';
      }
  }
    return (
        <Layout>
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Create Material Unit</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                        <Link to="/material_stock/material_unit" style={{color: 'black'}}>Material Unit List</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <a href="" title="Create Material">Create Material Unit</a>
                    </li>
                </ol>
              </nav>
            </div>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={ handleSubmit }>
                    <p className="card-description fw-bold">Material Unit Info</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form-material-unit-name-1">Material Unit Name</label>
                            <input id="form-material-unit-name-1" placeholder="Material Unit Name" name="unit_name" type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="form-short-name-2">Short Name</label>
                            <input id="form-short-name-2" placeholder="Short Name" name="short_name" type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Create Material Unit</button>
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
export default MaterialsUnitCreate;