import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function SuppliersEdit() {
    let { id } = useParams();
    const [ supplier, setSupplier] = React.useState([]);
        async function fetchSupplier () {
            let res = await axios.get('/supplier/single.php?id=' + id);
            setSupplier(res.data.data[0]);
        }

    React.useEffect(()=>{
        fetchSupplier();
    },[]);

    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/supplier/update.php?id=' + id, formData);
         if(res.status === 200) {
             window.location.href = '/material_stock/supplier';
        }
}
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Update Supplier</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                                <Link to="/material_stock/suppliers" style={{color: 'black'}}>Supplier List</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to="#">Update Supplier</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={ handleSubmit }>
                                <p className="card-description fw-bold">Supplier Info</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input onChange={(e) => setSupplier({...supplier, supplier_name: e.target.value})} value={supplier.supplier_name || ''} id="name" name="supplier_name" type="text" className="form-control" placeholder="Enter Full Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="company">Company Name</label>
                                            <input onChange={(e) => setSupplier({...supplier, company_name: e.target.value})} value={supplier.company_name || ''} id="company" name="company_name" type="text" className="form-control" placeholder="Enter Company Name"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input onChange={(e) => setSupplier({...supplier, phone: e.target.value})} value={supplier.phone || ''} id="phone" name="phone" type="tel" className="form-control" placeholder="Enter Phone Number"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input onChange={(e) => setSupplier({...supplier, email: e.target.value})} value={supplier.email || ''} id="email" name="email" type="email" className="form-control" placeholder="Enter Email"/>                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input onChange={(e) => setSupplier({...supplier, address: e.target.value})} value={supplier.address || ''} id="address" name="address" type="text" className="form-control" placeholder="Address"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-primary">Update Supplier</button>
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
export default SuppliersEdit;