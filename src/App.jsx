import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";

// Authentication
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Protected from './Auth/Protected.jsx';
import Logout from './Auth/Logout.jsx';

// Dashboard
import Dashboard from "./pages/Dashboard.jsx";

// Projects and Clients
import Projects from "./pages/projects_clients/projects/Index.jsx";
import CreateProjects from "./pages/projects_clients/projects/Create.jsx";
import EditProjects from "./pages/projects_clients/projects/Edit.jsx";
import ProjectsView from "./pages/projects_clients/projects/View.jsx";

import Clients from "./pages/projects_clients/clients/Index.jsx";
import CreateClient from "./pages/projects_clients/clients/Create.jsx";
import EditClient from "./pages/projects_clients/clients/Edit.jsx";

// Human Resource
import Departments from "./pages/human_resource/department/Index.jsx";
import CreateDepartment from "./pages/human_resource/department/Create.jsx";
import EditDepartment from "./pages/human_resource/department/Edit.jsx";

import Designation from "./pages/human_resource/designation/Index.jsx";
import CreateDesignation from "./pages/human_resource/designation/Create.jsx";
import EditDesignation from "./pages/human_resource/designation/Edit.jsx";

import Employee from "./pages/human_resource/employees/Index.jsx";
import CreateEmployee from "./pages/human_resource/employees/Create.jsx";
import EditEmployee from "./pages/human_resource/employees/Edit.jsx";
import EmployeeProfile from "./pages/human_resource/employees/Profile.jsx";

//Material & Stock
import Materials from "./pages/material_stock/material_list/Index.jsx";
import MaterialsCreate from "./pages/material_stock/material_list/Create.jsx";
import MaterialsEdit from "./pages/material_stock/material_list/Edit.jsx";

import MaterialsCategory from "./pages/material_stock/material_category/Index.jsx";
import MaterialsCategoryCreate from "./pages/material_stock/material_category/Create.jsx";
import MaterialsCategoryEdit from "./pages/material_stock/material_category/Edit.jsx";

import MaterialsUnit from "./pages/material_stock/material_unit/Index.jsx";
import MaterialsUnitCreate from "./pages/material_stock/material_unit/Create.jsx";
import MaterialsUnitEdit from "./pages/material_stock/material_unit/Edit.jsx";

import MaterialsPurchase from "./pages/material_stock/material_purchase/Index.jsx";
import MaterialsPurchaseCreate from "./pages/material_stock/material_purchase/Create.jsx";
import MaterialsPurchaseEdit from "./pages/material_stock/material_purchase/Edit.jsx";

import MaterialsInventory from "./pages/material_stock/material_inventory/Index.jsx";
import MaterialsInventoryCreate from "./pages/material_stock/material_inventory/Create.jsx";
import MaterialsInventoryEdit from "./pages/material_stock/material_inventory/Edit.jsx";

import Suppliers from "./pages/material_stock/supplier/Index.jsx";
import SuppliersCreate from "./pages/material_stock/supplier/Create.jsx";
import SuppliersEdit from "./pages/material_stock/supplier/Edit.jsx";

import Issue from "./pages/material_stock/material_issue/Index.jsx";
import IssueCreate from "./pages/material_stock/material_issue/Create.jsx";
import IssueEdit from "./pages/material_stock/material_issue/Edit.jsx";
import IssueDetails from "./pages/material_stock/material_issue/Details.jsx";

import MaterialTransaction from "./pages/material_stock/material_transaction/Index.jsx";
import TransactionView from "./pages/material_stock/material_transaction/View.jsx";

// Bill of Quantities
import { BOQList, BOQForm, BOQDetails, BOQReport } from "./pages/boq/BOQ.jsx";

function App() {
  const [ isSignedIn, setIsSignedIn ] = useState(()=> {
    /* if you want, user will be logged in until they logout*/
    return localStorage.getItem("access_token") || false;
    /* if you want, user will be logged when they close the browser*/
    //return sessionStorage.getItem("access_token") || false;
  });
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                  <Route element={<Protected isSignedIn={isSignedIn} />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="logout" element={<Logout />} />

                    <Route path="/projects_clients/projects">
                        <Route index element={<Projects />} />
                        <Route path="create" element={<CreateProjects />} />
                        <Route path="edit/:id" element={<EditProjects />} />
                        <Route path="view/:id" element={<ProjectsView />} />
                    </Route>

                    <Route path="/projects_clients/clients">
                      <Route index element={<Clients/>}/>
                      <Route path="create" element={<CreateClient />} />
                      <Route path="edit/:id" element={<EditClient />} />
                    </Route>

                    <Route path="/human_resource/employees">
                      <Route index element={<Employee/>}/>
                      <Route path="create" element={<CreateEmployee />} />
                      <Route path="edit/:id" element={<EditEmployee />} />
                      <Route path="profile/:id" element={<EmployeeProfile />} />
                    </Route>

                    <Route path="/human_resource/designation">
                      <Route index element={<Designation/>}/>
                      <Route path="create" element={<CreateDesignation />} />
                      <Route path="edit/:id" element={<EditDesignation />} />
                    </Route>

                    <Route path="/human_resource/department">
                      <Route index element={<Departments/>}/>
                      <Route path="create" element={<CreateDepartment />} />
                      <Route path="edit/:id" element={<EditDepartment />} />
                    </Route>

                    <Route path="/material_stock/material_list">
                      <Route index element={<Materials/>}/>
                      <Route path="create" element={<MaterialsCreate />} />
                      <Route path="edit/:id" element={<MaterialsEdit />} />
                    </Route>

                    <Route path="/material_stock/material_category">
                      <Route index element={<MaterialsCategory/>}/>
                      <Route path="create" element={<MaterialsCategoryCreate />} />
                      <Route path="edit/:id" element={<MaterialsCategoryEdit />} />
                    </Route>

                    <Route path="/material_stock/material_unit">
                      <Route index element={<MaterialsUnit/>}/>
                      <Route path="create" element={<MaterialsUnitCreate />} />
                      <Route path="edit/:id" element={<MaterialsUnitEdit />} />
                    </Route>

                    <Route path="/material_stock/material_purchase">
                      <Route index element={<MaterialsPurchase/>}/>
                      <Route path="create" element={<MaterialsPurchaseCreate />} />
                      <Route path="edit/:id" element={<MaterialsPurchaseEdit />} />
                    </Route>

                    <Route path="/material_stock/material_inventory">
                      <Route index element={<MaterialsInventory/>}/>
                      <Route path="create" element={<MaterialsInventoryCreate />} />
                      <Route path="edit/:id" element={<MaterialsInventoryEdit />} />
                    </Route>

                    <Route path="/material_stock/supplier">
                      <Route index element={<Suppliers/>}/>
                      <Route path="create" element={<SuppliersCreate />} />
                      <Route path="edit/:id" element={<SuppliersEdit />} />
                    </Route>

                    <Route path="/material_stock/material_issue">
                      <Route index element={<Issue/>}/>
                      <Route path="create" element={<IssueCreate />} />
                      <Route path="edit/:id" element={<IssueEdit />} />
                      <Route path="details/:id" element={<IssueDetails />} />
                    </Route>

                    <Route path="/material_stock/material_transaction">
                      <Route index element={<MaterialTransaction/>}/>
                      <Route path="view/:id" element={<TransactionView />} />
                    </Route>

                    <Route path="/boq">
                      <Route index element={<BOQList />} />
                      <Route path="create" element={<BOQForm />} />
                      <Route path="edit/:id" element={<BOQForm />} />
                      <Route path="report" element={<BOQReport />} />
                      <Route path=":id" element={<BOQDetails />} />
                    </Route>
                  </Route>
            </Routes>
    </BrowserRouter>
  )
}

export default App
