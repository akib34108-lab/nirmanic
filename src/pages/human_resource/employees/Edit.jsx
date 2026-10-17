import React from "react";
import { Link } from "react-router";
import { useParams } from "react-router";
import Layout from "../../Layout.jsx";
import axios from '../../../lib/axios.js';

function EditEmployee() {
    let { id } = useParams();
    const [ employee, setEmployee] = React.useState([]);
    const [department, setDepartment] = React.useState([]);
    const [designation, setDesignation] = React.useState([]);
        async function fetchEmployee () {
            let res = await axios.get('/employees/single.php?id=' + id);
            setEmployee(res.data.data[0]);
        }
        async function fetchDepartments() {
            let res = await axios.get("/department/index.php");
            if (res.data.data) {
                setDepartment(res.data.data);
            }}
        async function fetchDesignation() {
            let res = await axios.get("/designation/index.php");
            if (res.data.data) {
                setDesignation(res.data.data);
            }}
    React.useEffect(()=>{
        fetchEmployee();
        fetchDepartments();
        fetchDesignation();
    },[]);

    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let res = await axios.post('/employees/update.php?id=' + id, formData);
         if(res.status === 200) {
             window.location.href = '/human_resource/employees';
        }
}
    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Update Employee</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="mdi mdi-folder-multiple menu-icon pr-2" style={{ color: '#c0b553'}}></i>
                                <Link to="/human_resource/employees" style={{color: 'black'}}>Employee List</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to="#">Update Employee</Link>
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
                                            <input onChange={(e) => setEmployee({...employee, employee_name: e.target.value})} value={employee.employee_name || ''} id="name" name="employee_name" type="text" className="form-control" placeholder="Enter Full Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, phone: e.target.value})} value={employee.phone || ''} id="phone" name="phone" type="tel" className="form-control" placeholder="Enter Phone Number"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, email: e.target.value})} value={employee.email || ''} id="email" name="email" type="email" className="form-control" placeholder="Enter Email"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, nid: e.target.value})} value={employee.nid || ''} id="nid" name="nid" type="text" className="form-control" placeholder="Enter NID Number"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, address: e.target.value})} value={employee.address || ''} id="address" name="address" type="text" className="form-control" placeholder="Address"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, joining_date: e.target.value})} value={employee.joining_date || ''} id="joining_date" name="joining_date" type="text" className="form-control" placeholder="Joining Date"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select onChange={(e) => setEmployee({...employee, department_id: e.target.value})} value={employee.department_id || ''} name="department_id" className="form-control">
                                                <option value="">Select Department</option>
                                                {department.map((department) => (
                                                    <option key={department.id} value={department.id}>{department.department_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select onChange={(e) => setEmployee({...employee, designation_id: e.target.value})} value={employee.designation_id || ''} name="designation_id" className="form-control">
                                                <option value="">Select Designation</option>
                                                {designation.map((designation) => (
                                                    <option key={designation.id} value={designation.id}>{designation.designation_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, experience: e.target.value})} value={employee.experience || ''} id="experience" name="experience" type="text" className="form-control" placeholder="Experience"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, basic_salary: e.target.value})} value={employee.basic_salary || ''} id="basic_salary" name="basic_salary" type="text" className="form-control" placeholder="Basic Salary"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <input onChange={(e) => setEmployee({...employee, bank_account: e.target.value})} value={employee.bank_account || ''} id="bank_account" name="bank_account" type="text" className="form-control" placeholder="Bank Account"/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <select onChange={(e) => setEmployee({...employee, status: e.target.value})} value={employee.status || '' } name="status" className="form-control">
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
                                            <input type="file" name="image"  accept="image/*"  className="form-control" id="image"/>
                                        </div>
                                    </div>
                                     <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-primary">Update Employee</button>
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
export default EditEmployee;