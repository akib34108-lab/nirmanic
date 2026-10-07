function Designations() {
    return (
        <div className="content-wrapper">
            <div className="page-header">
                <h3 className="page-title">All Designations</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Designations</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Designation List</li>
                    </ol>
                </nav>
            </div>
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">
                        <div className="input-group flex-grow-1">
                            <input type="text" className="form-control" placeholder="Search Designation"/>
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>
                        <button type="button" className="btn btn-info ml-2">
                            <i className="mdi mdi-plus mr-1"></i> Add Designation
                        </button>
                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Designation List</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Designations</th>
                                            <th>Department</th>
                                            <th>Employees</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3">
                                                        <i className="mdi mdi-account-tie" style={{ fontSize: "28px", color: "#4B49AC" }}></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Project Manager</h6>
                                                        <small className="text-muted">Manages overall project planning and execution</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Management</td>
                                            <td>
                                                <i className="mdi mdi-account-multiple text-muted mr-1"></i>4
                                            </td>
                                            <td>
                                                <span style={{ color: "#0fa80f", display: "inline-flex", alignItems: "center" }}>
                                                <span style={{width: "7px",height: "7px",backgroundColor: "#0fa80f",borderRadius: "50%",marginRight: "6px"}}></span>Active</span>
                                            </td>
                                            <td>
                                                <small className="text-muted"> 04 Oct 2026</small>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" title="Delete">
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td>02</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i className="mdi mdi-worker" style={{ fontSize: "28px", color: "#151515" }}></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Site Engineer
                                                        </h6>

                                                        <small className="text-muted">
                                                            Handles site operations and technical activities
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                Engineering
                                            </td>
                                            <td>
                                                <i className="mdi mdi-account-multiple text-muted mr-1"></i>
                                                8
                                            </td>

                                            <td>
                                                <span
                                                    style={{
                                                        color: "#0fa80f",
                                                        display: "inline-flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: "7px",
                                                            height: "7px",
                                                            backgroundColor: "#0fa80f",
                                                            borderRadius: "50%",
                                                            marginRight: "6px"
                                                        }}
                                                    ></span>
                                                    Active
                                                </span>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    02 Oct 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>
                                        <tr>

                                            <td>03</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i className="mdi mdi-worker" style={{ fontSize: "28px", color: "#FFAB00" }} ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Site Supervisor
                                                        </h6>

                                                        <small className="text-muted">
                                                            Supervises daily construction activities
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                Operations
                                            </td>
                                            <td>
                                                <i className="mdi mdi-account-multiple text-muted mr-1"></i>
                                                12
                                            </td>

                                            <td>
                                                <span
                                                    style={{
                                                        color: "#0fa80f",
                                                        display: "inline-flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: "7px",
                                                            height: "7px",
                                                            backgroundColor: "#0fa80f",
                                                            borderRadius: "50%",
                                                            marginRight: "6px"
                                                        }}
                                                    ></span>
                                                    Active
                                                </span>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    28 Sep 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>
                                        <tr>

                                            <td>04</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-flash"
                                                            style={{
                                                                fontSize: "28px",
                                                                color: "#FFC100"
                                                            }}
                                                        ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Electrician
                                                        </h6>

                                                        <small className="text-muted">
                                                            Handles electrical installation and maintenance
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                Electrical
                                            </td>
                                            <td>
                                                <i className="mdi mdi-account-multiple text-muted mr-1"></i>
                                                18
                                            </td>

                                            <td>
                                                <span
                                                    style={{
                                                        color: "#0fa80f",
                                                        display: "inline-flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: "7px",
                                                            height: "7px",
                                                            backgroundColor: "#0fa80f",
                                                            borderRadius: "50%",
                                                            marginRight: "6px"
                                                        }}
                                                    ></span>
                                                    Active
                                                </span>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    25 Sep 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>
                                        <tr>

                                            <td>05</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-wall"
                                                            style={{
                                                                fontSize: "28px",
                                                                color: "#F95F53"
                                                            }}
                                                        ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Mason
                                                        </h6>

                                                        <small className="text-muted">
                                                            Performs brickwork and concrete construction
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                Construction
                                            </td>
                                            <td>
                                                <i className="mdi mdi-account-multiple text-muted mr-1"></i>
                                                32
                                            </td>

                                            <td>
                                                <span
                                                    style={{
                                                        color: "#0fa80f",
                                                        display: "inline-flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: "7px",
                                                            height: "7px",
                                                            backgroundColor: "#0fa80f",
                                                            borderRadius: "50%",
                                                            marginRight: "6px"
                                                        }}
                                                    ></span>
                                                    Active
                                                </span>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    20 Sep 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>
                                        <tr>

                                            <td>06</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-shield-check"
                                                            style={{
                                                                fontSize: "28px",
                                                                color: "#00B8D9"
                                                            }}
                                                        ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Safety Officer
                                                        </h6>

                                                        <small className="text-muted">
                                                            Ensures workplace safety and compliance
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                Safety
                                            </td>
                                            <td>
                                                <i className="mdi mdi-account-multiple text-muted mr-1"></i>
                                                6
                                            </td>

                                            <td>
                                                <span
                                                    style={{
                                                        color: "#0fa80f",
                                                        display: "inline-flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            width: "7px",
                                                            height: "7px",
                                                            backgroundColor: "#0fa80f",
                                                            borderRadius: "50%",
                                                            marginRight: "6px"
                                                        }}
                                                    ></span>
                                                    Active
                                                </span>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    15 Sep 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">

                                <div>
                                    <small className="text-muted">
                                        Showing 1 to 6 of 24 designations
                                    </small>
                                </div>

                                <nav aria-label="Designation pagination">

                                    <ul className="pagination mb-0">

                                        <li className="page-item disabled">
                                            <a
                                                className="page-link"
                                                href="#"
                                            >
                                                <i className="mdi mdi-chevron-left"></i>
                                            </a>
                                        </li>

                                        <li className="page-item active">
                                            <a
                                                className="page-link"
                                                href="#"
                                            >
                                                1
                                            </a>
                                        </li>

                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#"
                                            >
                                                2
                                            </a>
                                        </li>

                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#"
                                            >
                                                3
                                            </a>
                                        </li>

                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#"
                                            >
                                                4
                                            </a>
                                        </li>

                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                href="#"
                                            >
                                                <i className="mdi mdi-chevron-right"></i>
                                            </a>
                                        </li>

                                    </ul>

                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Designations;