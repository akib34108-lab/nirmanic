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

import Materials from "./pages/Materials.jsx";
import Category from "./pages/Category.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import CurrentStock from "./pages/CurrentStock.jsx";
import StockIn from "./pages/StockIn.jsx";
import StockOut from "./pages/StockOut.jsx";
import StockAdjustment from "./pages/StockAdjustment.jsx";
import InventoryHistory from "./pages/InventoryHistory.jsx";

import Form from "./pages/Form.jsx";
import Table from "./pages/Table.jsx";

function App() {
  const [ isSignedIn, setIsSignedIn ] = useState(()=> {
    /* if you want, user will be logged in until they logout*/
    //return localStorage.getItem("access_token") || false;
    /* if you want, user will be logged when they close the browser*/
    return sessionStorage.getItem("access_token") || false;
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
                    </Route>

                    <Route path="/projects_clients/clients">
                      <Route index element={<Clients/>}/>
                      <Route path="create" element={<CreateClient />} />
                      <Route path="edit/:id" element={<EditClient />} />
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
                    
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/current_stock" element={<CurrentStock />} />
                    <Route path="/stock_in" element={<StockIn />} />
                    <Route path="/stock_out" element={<StockOut />} />
                    <Route path="/stock_adjustment" element={<StockAdjustment />} />
                    <Route path="/inventory_history" element={<InventoryHistory />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/table" element={<Table />} />
                  </Route>
            </Routes>
    </BrowserRouter>
  )
}

export default App
