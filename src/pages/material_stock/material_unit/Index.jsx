import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";
import "../../human_resource/employees/Index.css";

function MaterialsUnit() {
   const [ unit, setUnit ] = React.useState([]);
   const [openMenu, setOpenMenu] = React.useState(null);
    const fetchUnit = async () => {
        let res = await axios.get(`/material_unit/index.php`)
        setUnit(res.data.data);
    }
    React.useEffect(()=>{
        fetchUnit();
    },[]);

    async function handleDelete(id, unitName) {
    if (window.confirm(`Are you sure you want to delete this ${unitName}?`)) {
        let res = await axios.delete(`/material_unit/delete.php?id=${id}`)
        if(res.data.status){
            await fetchUnit();
            }
        }
    }
    return (
    <Layout >
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Materials Unit</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Stock</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Material Unit
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">
                        <div className="input-group flex-grow-1">
                            <input type="text" className="form-control" placeholder="Search Unit"/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>
                            <Link to="/material_stock/material_unit/create" className="btn btn-info d-flex justify-content-center align-items-center">
                                <i className="mdi mdi-plus"></i> Add Material Unit
                            </Link>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Material Unit List</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Unit</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <colgroup>
                                        <col style={{ width: "5%" }} />
                                        <col style={{ width: "75%" }} />
                                        <col style={{ width: "20%" }} />
                                    </colgroup>
                                    <tbody>
                                        {unit && unit.map((unit) => (
                                        <tr key={ unit.id }>
                                            <td>{ unit.id }</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <h6 className="mb-1">{ unit.short_name }</h6>
                                                        <small className="text-muted">{ unit.unit_name}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <div className="employee-action-menu">
                                                    <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === unit.id ? null : unit.id)} title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                    {openMenu === unit.id && (
                                                        <div className="action-dropdown">
                                                            <Link to={`/material_stock/material_unit/edit/${unit.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-pencil-outline"></i><span>Edit unit</span></Link>
                                                            <button type="button" className="action-dropdown-item delete-action" onClick={() => { setOpenMenu(null);  handleDelete(unit.id, unit.unit_name);}}><i className="mdi mdi-delete-outline"></i><span>Delete unit</span></button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    );
}

export default MaterialsUnit;
