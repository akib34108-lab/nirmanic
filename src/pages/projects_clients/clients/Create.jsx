
import { Link } from "react-router";
import Layout from "../../Layout.jsx";

function CreateClient() {
    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch('http://localhost/nirmanic_api/clients/create.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = '/projects_clients/clients';
            })
            .catch((error) => {
                console.error('Error:', error);
    });
    }
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Create Client</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                                <Link to="/projects_clients/clients" style={{color: 'black'}}>Client List</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to="#">Add Client</Link>
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
                                            <input id="name" name="client_name" type="text" className="form-control" placeholder="Enter Full Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="company" name="company" type="text" className="form-control" placeholder="Enter Company Name"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="phone" name="phone" type="tel" className="form-control" placeholder="Enter Phone Number"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="email" name="email" type="email" className="form-control" placeholder="Enter Email"/>                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="address" name="address" type="text" className="form-control" placeholder="Address"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <select name="type" className="form-control">
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
                                            <select name="status" className="form-control">
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
                                        <button type="submit" className="btn btn-primary">Create Client</button>
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
export default CreateClient;