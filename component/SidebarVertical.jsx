function SidebarVertical() {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="sidebar-brand-wrapper d-flex align-items-center">
            <a className="sidebar-brand brand-logo" href="/dashboard" style={{ display: 'block', marginLeft: '15px' }}>
            <img src="assets/images/logo.png" alt="logo" style={{ width: '150px', height: 'auto', display: 'block' }} /></a>
            <a className="sidebar-brand brand-logo-mini pl-4 pt-3" href="/dashboard"> 
            <img src="assets/images/logo-mini.svg" alt="logo" />
            </a>
          </div>
          <ul className="nav">
            <li className="nav-item nav-profile">
              <a href="#" className="nav-link">
                <div className="nav-profile-image">
                  <img src="assets/images/faces/face1.jpg" alt="profile" />
                  <span className="login-status online"></span>
                </div>
                <div className="nav-profile-text d-flex flex-column pr-3">
                  <span className="font-weight-medium mb-2">Henry Klein</span>
                  <span className="font-weight-normal">$8,753.00</span>
                </div>
                <span className="badge badge-danger text-white ml-3 rounded">3</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                <i className="mdi mdi-home menu-icon"></i>
                <span className="menu-title">Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">
                <i className="mdi mdi-briefcase menu-icon"></i>
                <span className="menu-title">Projects</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/designation">
              <i className="mdi mdi-account-card-details menu-icon"></i>
                <span className="menu-title">Designations</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/form">
                <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                <span className="menu-title">Forms</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="pages/charts/chartjs.html">
                <i className="mdi mdi-chart-bar menu-icon"></i>
                <span className="menu-title">Charts</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/table">
                <i className="mdi mdi-table-large menu-icon"></i>
                <span className="menu-title">Tables</span>
              </a>
            </li>
          </ul>
        </nav>
    );
}
export default SidebarVertical;