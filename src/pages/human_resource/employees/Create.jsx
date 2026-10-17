import { useState, useEffect } from "react";
import { Link } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function CreateEmployee() {
    const [department, setDepartment] = useState([]);
    const [designation, setDesignation] = useState([]);
    useEffect(() => {
        async function fetchDepartments() {
            let res = await axios.get("/department/index.php");
                if (res.data.data) {
                    setDepartment(res.data.data);
                }
        }
        fetchDepartments();
    }, []);
    useEffect(() => {
        async function fetchDesignation() {
            let res = await axios.get("/designation/index.php");
                if (res.data.data) {
                    setDesignation(res.data.data);
                }
        }
        fetchDesignation();
    }, []);
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/employees/create.php', formData);
            if (res.status === 200) {
                window.location.href = '/human_resource/employees';
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
                                            <select name="department_id" className="form-control">
                                                <option value="">Select Department</option>
                                                {department.map((department) => (
                                                    <option key={department.id} value={department.id}>{department.department_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select name="designation_id" className="form-control">
                                                <option value="">Select Designaion</option>
                                                {designation.map((designation) => (
                                                    <option key={designation.id} value={designation.id}>{designation.designation_name}</option>
                                                ))}
                                            </select>
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