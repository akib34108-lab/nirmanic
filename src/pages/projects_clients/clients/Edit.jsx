import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function EditClient() {
    let { id } = useParams();
    const [ client, setClient] = React.useState([]);
        async function fetchClient () {
            let res = await axios.get('/clients/single.php?id=' + id);
            setClient(res.data.data[0]);
        }

    React.useEffect(()=>{
        fetchClient();
    },[]);

    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/clients/update.php?id=' + id, formData);
         if(res.status === 200) {
             window.location.href = '/projects_clients/clients';
        }
}
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Update Client</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                                <Link to="/projects_clients/clients" style={{color: 'black'}}>Client List</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to="#">Update Client</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={ handleSubmit }>
                                <p className="card-description fw-bold">Client Info</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input onChange={(e) => setClient({...client, client_name: e.target.value})} value={client.client_name || ''} id="name" name="client_name" type="text" className="form-control" placeholder="Enter Full Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="company">Company Name</label>
                                            <input onChange={(e) => setClient({...client, company: e.target.value})} value={client.company || ''} id="company" name="company" type="text" className="form-control" placeholder="Enter Company Name"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input onChange={(e) => setClient({...client, phone: e.target.value})} value={client.phone || ''} id="phone" name="phone" type="tel" className="form-control" placeholder="Enter Phone Number"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input onChange={(e) => setClient({...client, email: e.target.value})} value={client.email || ''} id="email" name="email" type="email" className="form-control" placeholder="Enter Email"/>                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input onChange={(e) => setClient({...client, address: e.target.value})} value={client.address || ''} id="address" name="address" type="text" className="form-control" placeholder="Address"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-option-6">Client Type</label>
                                            <select id="form-option-6" onChange={(e) => setClient({...client, type: e.target.value})} value={client.type || ''} name="type" className="form-control">
                                                <option value="">Select Client Type</option>
                                                <option value="1">Individual</option>
                                                <option value="2">Property Developer</option>
                                                <option value="3">Corporate</option>
                                                <option value="4">Industrial</option>
                                                <option value="5">Government</option>
                                                <option value="6">Hospitality</option>
                                                <option value="7">Educational</option>
                                                <option value="8">Health Care</option>
                                                <option value="9">NGO</option>
                                                <option value="10">Real Estate Company</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="form-option-7">Client Status</label>
                                            <select id="form-option-7" onChange={(e) => setClient({...client, status: e.target.value})} value={client.status || ''} name="status" className="form-control">
                                                <option value="">Select Client Status</option>
                                                <option value="1">Active</option>
                                                <option value="2">Pending</option>
                                                <option value="3">Prospect</option>
                                                <option value="4">Inactive</option>
                                                <option value="5">Blocked</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-primary">Update Client</button>
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
export default EditClient;