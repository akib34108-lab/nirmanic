function Designation() {
    return (
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">All Designations</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Designations</a></li>
              <li className="breadcrumb-item active" aria-current="page"> Designation List </li>
            </ol>
          </nav>
        </div>
        <div>
            <form className="nav-link form-inline mt-2 mt-md-0">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search Designation" />
                    <div className="input-group-append">
                        <span className="input-group-text">
                        <i className="mdi mdi-magnify"></i>
                        </span>
                    </div>
                    <button className="btn btn-info ml-2">Add Designation</button>
                </div>
            </form>
        </div>
       <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="row">
                <div className="d-flex align-items-center w-100">
                    <div className="mr-3">
                        <i className="mdi mdi-domain" style={{ fontSize: "32px", color: "#4B49AC" }} ></i>
                    </div>
                    <div>
                        <h6 className="mb-1">Nirmanic Heights</h6>
                            <small className="text-muted">PRJ-001 · Residential Building</small>
                    </div>
                    <div className="ml-auto">
                        <span style={{color: "#0fa80f"}}>Ongoing</span>
                    </div>
                </div>
            </div>
            <hr className="my-3" />
            <div className="row mb-3">
                <div className="col-md-6">
                    <small className="text-muted d-block mb-1">Budget</small>
                    <h6 className="mb-0">৳ 2.5 Cr</h6>
                </div>
                <div className="col-md-6">
                    <small className="text-muted d-block mb-1">Manager</small>
                    <h6 className="mb-0">Rahim Ahmed</h6>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">Progress</small>
                <small className="font-weight-bold">65%</small>
            </div>
            <div className="progress mb-2" style={{ height: "6px" }}>
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "65%" }}aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
            </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">Start: 01 Jan 2026</small>
            <small className="text-muted">Approximate End: 30 Dec 2026</small>
        </div>
    </div>
</div>
</div> 
</div>
    );
}
export default Designation;