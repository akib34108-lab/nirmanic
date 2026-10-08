import SidebarVertical from "../component/SidebarVertical.jsx";
import SidebarHorizontal from "../component/SidebarHorizontal.jsx";
import Footer from "../component/Footer.jsx";

function Layout({ children }) {
    return (
        <div className="container-scroller">
        <SidebarVertical />
        <div className="container-fluid page-body-wrapper">
          <SidebarHorizontal />
          <div className="main-panel">
            {children}
            <Footer />
          </div>
        </div>
      </div>
        
    );
}

export default Layout;