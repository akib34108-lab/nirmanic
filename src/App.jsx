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
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const page =
    currentPath === '/dashboard'
      ? <Dashboard />
      : currentPath === '/form'
        ? <Form />
        : currentPath === '/projects'
          ? <Projects />
          : currentPath === '/designation'
            ? <Designation />
            : currentPath === '/table'
              ? <Table />
              : currentPath === '/materials'
                ? <Materials />
                : currentPath === '/category'
                  ? <Category />
                  : currentPath === '/suppliers'
                    ? <Suppliers />
                    : currentPath === '/current_stock'
                      ? <CurrentStock />
                      : currentPath === '/stock_in'
                        ? <StockIn />
                        : currentPath === '/stock_out'
                          ? <StockOut />
                          : currentPath === '/stock_adjustment'
                            ? <StockAdjustment />
                            : currentPath === '/inventory_history'
                              ? <InventoryHistory />
                              : null;
  return (
    <>
      <div className="container-scroller">
        <SidebarVertical />
        <div className="container-fluid page-body-wrapper">
          <SidebarHorizontal />
          <div className="main-panel">
            {page}
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
