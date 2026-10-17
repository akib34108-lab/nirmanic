import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import React from "react";
import "../../human_resource/employees/Index.css";

function MaterialsCategory() {
   const [ category, setCategory ] = React.useState([]);
   const [openMenu, setOpenMenu] = React.useState(null);
    const fetchCategory = async () => {
        let res = await axios.get(`/material_category/index.php`)
        setCategory(res.data.data);
    }
    React.useEffect(()=>{
        fetchCategory();
    },[]);

    async function handleDelete(id, categoryName) {
    if (window.confirm(`Are you sure you want to delete this ${categoryName}?`)) {
        let res = await axios.delete(`/material_category/delete.php?id=${id}`)
        if(res.data.status){
            await fetchCategory();
            }
        }
    }
    return (
    <Layout >
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Materials Category</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Stock</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Material List Category
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">
                        <div className="input-group flex-grow-1">
                            <input type="text" className="form-control" placeholder="Search category"/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>
                            <Link to="/material_stock/material_category/create" className="btn btn-info d-flex justify-content-center align-items-center">
                                <i className="mdi mdi-plus"></i> Add Material Category
                            </Link>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Material Category List</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <colgroup>
                                        <col style={{ width: "5%" }} />
                                        <col style={{ width: "75%" }} />
                                        <col style={{ width: "20%" }} />
                                    </colgroup>
                                    <tbody>
                                        {category && category.map((category) => (
                                        <tr key={ category.id }>
                                            <td>{ category.id }</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <h6 className="mb-1">{ category.category_name }</h6>
                                                        <small className="text-muted">{ category.description}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <div className="employee-action-menu">
                                                    <button type="button" className="action-menu-btn" onClick={() => setOpenMenu( openMenu === category.id ? null : category.id)} title="More Actions"><i className="mdi mdi-dots-vertical"></i></button>
                                                    {openMenu === category.id && (
                                                        <div className="action-dropdown">
                                                            <Link to={`/material_stock/material_category/edit/${category.id}`} className="action-dropdown-item" onClick={() => setOpenMenu(null)}><i className="mdi mdi-pencil-outline"></i><span>Edit category</span></Link>
                                                            <button type="button" className="action-dropdown-item delete-action" onClick={() => { setOpenMenu(null);  handleDelete(category.id, category.category_name);}}><i className="mdi mdi-delete-outline"></i><span>Delete category</span></button>
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

export default MaterialsCategory;
