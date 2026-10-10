
import { Link } from "react-router";
import Layout from "../../Layout.jsx";

function CreateDesignation() {
    function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        fetch('http://localhost/nirmanic_api/designation/create.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
    })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = '/designation';
            })
            .catch((error) => {
                console.error('Error:', error);
    });
}
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                <h3 className="page-title">Create Designation</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                        <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                            <Link to="/designation" style={{color: 'black'}}>Designations List</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <a href="" title="Create Designation">Create Designation </a>
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
                                            <input placeholder="Designation Name" name="designation_name" type="text" id="designation_name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input placeholder="Designation Description" name="description" type="text" id="description" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <div className="text-center">
                                            <button className="btn btn-primary" type="submit">Create Designation</button>
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
export default CreateDesignation;