import { BrowserRouter, Routes, Route } from "react-router";
import SidebarVertical from "/component/SidebarVertical.jsx";
import SidebarHorizontal from "/component/SidebarHorizontal.jsx";
import Dashboard from "/pages/Dashboard.jsx";
import Footer from "/component/Footer.jsx";
import Form from "/pages/Form.jsx";
import Table from "/pages/Table.jsx";
import Projects from "/pages/Projects.jsx";
import Designation from "/pages/Designation.jsx";
import Materials from "/pages/Materials.jsx";
import Category from "/pages/Category.jsx";
import Suppliers from "/pages/Suppliers.jsx";
import CurrentStock from "/pages/CurrentStock.jsx";
import StockIn from "/pages/StockIn.jsx";
import StockOut from "/pages/StockOut.jsx";
import StockAdjustment from "/pages/StockAdjustment.jsx";
import InventoryHistory from "/pages/InventoryHistory.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className="container-scroller">
        <SidebarVertical />
        <div className="container-fluid page-body-wrapper">
          <SidebarHorizontal />
          <div className="main-panel">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/designation" element={<Designation />} />
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
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
