import { Link } from "react-router";
import { useState } from "react";
import "./sidebar.css";
function SidebarHorizontal() {
    const [openProfile, setOpenProfile] = useState(false);
    const toggleProfile = () => {
    setOpenProfile(!openProfile);
    };
    return (
        <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
          <div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
            <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="index.html"><img src="/assets/images/logo_white.svg" alt="logo" /></a>
            {/* <button className="navbar-toggler navbar-toggler align-self-center mr-2" type="button" data-toggle="minimize">
              <i className="mdi mdi-menu"></i>
            </button> */}
            <ul className="navbar-nav">
              <li className="nav-item nav-search border-0 d-none d-md-flex">
                <form className="nav-link form-inline mt-2 mt-md-0">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="mdi mdi-magnify"></i>
                      </span>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right ml-lg-auto">
                <li className="nav-item nav-profile border-0" style={{ position: "relative" }}>
                    <span className="profile-name" onClick={toggleProfile}>Super Admin</span>
                    {openProfile && (
                    <div className="dropdown-menu show">
                        <Link className="dropdown-item" to="/profile" onClick={() => setOpenProfile(false)}>
                        <i className="mdi mdi-account mr-2 text-success"></i>Profile</Link>
                        <Link className="dropdown-item" to="/logout" onClick={() => setOpenProfile(false)}>
                        <i className="mdi mdi-logout mr-2 text-primary"></i>Signout</Link>
                    </div>
                    )}
                </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>
    );
}
export default SidebarHorizontal;