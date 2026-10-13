import { useState } from "react";
import { Link } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function CreateEmployee() {
    const [error, setError] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        const formData = new FormData(e.target);

        try {
            const res = await axios.post('/employees/create.php', formData);
            if (res.data?.status === true) {
                window.location.href = '/human_resource/employees';
                return;
            }

            setError(res.data?.message || "Employee could not be created.");
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Employee could not be created.");
        }
  }
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Create Employee</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                                <Link to="/human_resource/employees" style={{color: 'black'}}>Employee List</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to="#">Add Employee</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={ handleSubmit }>
                                <p className="card-description fw-bold">Employee Info</p>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="name" name="employee_name" type="text" className="form-control" placeholder="Enter Full Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="phone" name="phone" type="tel" className="form-control" placeholder="Enter Phone Number"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="email" name="email" type="email" className="form-control" placeholder="Enter Email"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="nid" name="nid" type="text" className="form-control" placeholder="Enter NID Number"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="address" name="address" type="text" className="form-control" placeholder="Address"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="joining_date" name="joining_date" type="date" className="form-control" placeholder="Joining Date"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="department_id" name="department_id" type="text" className="form-control" placeholder="Department"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="designation_id" name="designation_id" type="text" className="form-control" placeholder="Designation"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="experience" name="experience" type="text" className="form-control" placeholder="Experience"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="basic_salary" name="basic_salary" type="text" className="form-control" placeholder="Basic Salary"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input id="bank_account" name="bank_account" type="text" className="form-control" placeholder="Bank Account"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
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
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="file" name="image" className="form-control" id="image"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div className="text-center">
                                                <button className="btn btn-primary" type="submit">Create Employee</button>
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
export default CreateEmployee;