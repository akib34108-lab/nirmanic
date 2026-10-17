import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";
import "../../human_resource/employees/Index.css";

function Materials() {
   const [ material, setMaterial ] = React.useState([]);
   const [openMenu, setOpenMenu] = React.useState(null);
    const fetchMaterial = async () => {
        let res = await axios.get(`/material_list/index.php`)
        setMaterial(res.data.data);
    }
    React.useEffect(()=>{
        fetchMaterial();
    },[]);

    async function handleDelete(id, materialName) {
    if (window.confirm(`Are you sure you want to delete this ${materialName}?`)) {
        let res = await axios.delete(`/material_list/delete.php?id=${id}`)
        if(res.data.status){
            await fetchMaterial();
            }
        }
    }
    return (
    <Layout >
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Materials</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Stock</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Material List
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">
                        <div className="input-group flex-grow-1">
                            <input type="text" className="form-control" placeholder="Search Material"/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>
                            <Link to="/material_stock/material_list/create" className="btn btn-info d-flex justify-content-center align-items-center mr-2">
                                <i className="mdi mdi-plus"></i> Add Material
                            </Link>
                            <Link to="/material_stock/material_category" className="btn btn-info d-flex justify-content-center align-items-center mr-2">Material Category</Link>
                            <Link to="/material_stock/material_unit" className="btn btn-info d-flex justify-content-center align-items-center">Material Unit</Link>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Material List</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Material</th>
                                            <th>Category</th>
                                            <th>Unit</th>
                                            <th>Current Stock</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {material && material.map((material) => (
                                        <tr key={ material.id }>
                                            <td>{ material.id }</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <h6 className="mb-1">{ material.material_name }</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{material.category_name}</td>
                                            <td>{material.unit_name}</td>
                                            <td>{material.current_stock}</td>
                                            <td className="text-center">
                                                <div className="employee-action-menu">
                                                    <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === material.id ? null : material.id)} title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                    {openMenu === material.id && (
                                                        <div className="action-dropdown">
                                                            <Link to={`/material_stock/material_list/edit/${material.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-pencil-outline"></i><span>Edit Material</span></Link>
                                                            <button type="button" className="action-dropdown-item delete-action" onClick={() => { setOpenMenu(null);  handleDelete(material.id, material.material_name);}}><i className="mdi mdi-delete-outline"></i><span>Delete Material</span></button>
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

export default Materials;
