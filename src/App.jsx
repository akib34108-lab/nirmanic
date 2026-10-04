import SidebarVertical from "/component/SidebarVertical.jsx";
import SidebarHorizontal from "/component/SidebarHorizontal.jsx";
import Dashboard from "/pages/Dashboard.jsx";
import Footer from "/component/Footer.jsx";
import Form from "/pages/Form.jsx";
import Table from "/pages/Table.jsx";
import Projects from "/pages/Projects.jsx";
import Designation from "/pages/Designation.jsx";
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
