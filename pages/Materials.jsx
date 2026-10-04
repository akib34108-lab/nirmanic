function Materials() {
    return (
        <div className="content-wrapper">

            {/* Page Header */}
            <div className="page-header">
                <h3 className="page-title">All Materials</h3>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Inventory</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Material List
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Search & Add Material */}
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">

                        <div className="input-group flex-grow-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Material"
                            />

                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>

                        <button type="button" className="btn btn-info ml-2">
                            <i className="mdi mdi-plus mr-1"></i>
                            Add Material
                        </button>

                    </div>
                </form>
            </div>

            {/* Material List */}
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">

                            <h4 className="card-title mb-4">
                                Material List
                            </h4>

                            <div className="table-responsive">
                                <table className="table table-hover">

                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Material</th>
                                            <th>Category</th>
                                            <th>Unit</th>
                                            <th>Current Stock</th>
                                            <th>Min. Stock</th>
                                            <th>Status</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {/* Cement */}
                                        <tr>
                                            <td>01</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-package-variant"
                                                            style={{ fontSize: "28px", color: "#4B49AC" }}
                                                        ></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Cement</h6>
                                                        <small className="text-muted">
                                                            Portland Cement
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Construction</td>
                                            <td>Bag</td>
                                            <td>450</td>
                                            <td>100</td>
                                            <td>
                                                <span style={{ color: "#0fa80f" }}>
                                                    <i className="mdi mdi-circle mr-1" style={{ fontSize: "8px" }}></i>
                                                    In Stock
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" title="Delete">
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Steel Rod */}
                                        <tr>
                                            <td>02</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-wrench"
                                                            style={{ fontSize: "28px", color: "#248AFD" }}
                                                        ></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Steel Rod</h6>
                                                        <small className="text-muted">
                                                            Reinforcement Steel Bar
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Steel</td>
                                            <td>Ton</td>
                                            <td>12</td>
                                            <td>5</td>
                                            <td>
                                                <span style={{ color: "#0fa80f" }}>
                                                    <i className="mdi mdi-circle mr-1" style={{ fontSize: "8px" }}></i>
                                                    In Stock
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" title="Delete">
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Brick */}
                                        <tr>
                                            <td>03</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-wall"
                                                            style={{ fontSize: "28px", color: "#F95F53" }}
                                                        ></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Brick</h6>
                                                        <small className="text-muted">
                                                            Standard Construction Brick
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Masonry</td>
                                            <td>Piece</td>
                                            <td>8,500</td>
                                            <td>5,000</td>
                                            <td>
                                                <span style={{ color: "#0fa80f" }}>
                                                    <i className="mdi mdi-circle mr-1" style={{ fontSize: "8px" }}></i>
                                                    In Stock
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" title="Delete">
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Sand */}
                                        <tr>
                                            <td>04</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-cube-outline"
                                                            style={{ fontSize: "28px", color: "#FFAB00" }}
                                                        ></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Sand</h6>
                                                        <small className="text-muted">
                                                            Construction Sand
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Construction</td>
                                            <td>CFT</td>
                                            <td>1,200</td>
                                            <td>1,500</td>
                                            <td>
                                                <span style={{ color: "#FFAB00" }}>
                                                    <i className="mdi mdi-circle mr-1" style={{ fontSize: "8px" }}></i>
                                                    Low Stock
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" title="Delete">
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Stone */}
                                        <tr>
                                            <td>05</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-cube"
                                                            style={{ fontSize: "28px", color: "#00B8D9" }}
                                                        ></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Stone Chips</h6>
                                                        <small className="text-muted">
                                                            Crushed Construction Stone
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Aggregate</td>
                                            <td>CFT</td>
                                            <td>850</td>
                                            <td>300</td>
                                            <td>
                                                <span style={{ color: "#0fa80f" }}>
                                                    <i className="mdi mdi-circle mr-1" style={{ fontSize: "8px" }}></i>
                                                    In Stock
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" title="Delete">
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Electrical Cable */}
                                        <tr>
                                            <td>06</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-flash"
                                                            style={{ fontSize: "28px", color: "#FFC100" }}
                                                        ></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-1">Electrical Cable</h6>
                                                        <small className="text-muted">
                                                            Electrical Installation Cable
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Electrical</td>
                                            <td>Meter</td>
                                            <td>250</td>
                                            <td>100</td>
                                            <td>
                                                <span style={{ color: "#0fa80f" }}>
                                                    <i className="mdi mdi-circle mr-1" style={{ fontSize: "8px" }}></i>
                                                    In Stock
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" title="Delete">
                                                    <i className="mdi mdi-delete"></i>
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-4">

                                <div>
                                    <small className="text-muted">
                                        Showing 1 to 6 of 25 materials
                                    </small>
                                </div>

                                <nav aria-label="Material pagination">
                                    <ul className="pagination mb-0">

                                        <li className="page-item disabled">
                                            <a className="page-link" href="#">
                                                <i className="mdi mdi-chevron-left"></i>
                                            </a>
                                        </li>

                                        <li className="page-item active">
                                            <a className="page-link" href="#">1</a>
                                        </li>

                                        <li className="page-item">
                                            <a className="page-link" href="#">2</a>
                                        </li>

                                        <li className="page-item">
                                            <a className="page-link" href="#">3</a>
                                        </li>

                                        <li className="page-item">
                                            <a className="page-link" href="#">4</a>
                                        </li>

                                        <li className="page-item">
                                            <a className="page-link" href="#">
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

export default Materials;
