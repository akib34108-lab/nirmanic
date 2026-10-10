import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Dashboard from "./pages/Dashboard.jsx";

import Designation from "./pages/designation/Index.jsx";
import CreateDesignation from "./pages/designation/Create.jsx";
import EditDesignation from "./pages/designation/Edit.jsx";

import Projects from "./pages/projects/Index.jsx";
import CreateProjects from "./pages/projects/Create.jsx";
import EditProjects from "./pages/projects/Edit.jsx";

import Clients from "./pages/clients/index.jsx";
import CreateClient from "./pages/clients/Create.jsx";
import EditClient from "./pages/clients/Edit.jsx";

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
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/projects">
                    <Route index element={<Projects />} />
                    <Route path="create" element={<CreateProjects />} />
                    <Route path="edit/:id" element={<EditProjects />} />
                </Route>

                <Route path="/clients">
                  <Route index element={<Clients/>}/>
                  <Route path="create" element={<CreateClient />} />
                  <Route path="edit/:id" element={<EditClient />} />
                </Route>

                <Route path="/designation">
                  <Route index element={<Designation/>}/>
                  <Route path="create" element={<CreateDesignation />} />
                  <Route path="edit/:id" element={<EditDesignation />} />
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
            </Routes>
    </BrowserRouter>
  )
}

export default App
