function StockAdjustment() {
  return (
    <div className="content-wrapper">

      {/* Page Header */}
      <div className="page-header">
        <h3 className="page-title">Stock Adjustment</h3>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Material & Inventory</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Stock Adjustment
            </li>
          </ol>
        </nav>
      </div>

      {/* Search & Add Adjustment */}
      <div className="mb-4">
        <form className="form-inline mt-2 mt-md-0">
          <div className="d-flex w-100">

            <div className="input-group flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Search Stock Adjustment"
              />

              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="mdi mdi-magnify"></i>
                </span>
              </div>
            </div>

            <button type="button" className="btn btn-info ml-2">
              <i className="mdi mdi-plus mr-1"></i>
              Add Adjustment
            </button>

          </div>
        </form>
      </div>

      {/* Stock Adjustment Table */}
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">

            <h4 className="card-title mb-4">
              Stock Adjustment History
            </h4>

            <div className="table-responsive">
              <table className="table table-hover">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Material</th>
                    <th>Adjustment Type</th>
                    <th>Previous Stock</th>
                    <th>Adjustment Qty</th>
                    <th>New Stock</th>
                    <th>Reason</th>
                    <th>Adjusted By</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {/* Adjustment 1 */}
                  <tr>
                    <td>1</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <i
                            className="mdi mdi-package-variant"
                            style={{
                              fontSize: "28px",
                              color: "#151515"
                            }}
                          ></i>
                        </div>

                        <div>
                          <h6 className="mb-1">
                            Portland Cement
                          </h6>
                          <small className="text-muted">
                            CEM-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-success">
                        Increase
                      </span>
                    </td>

                    <td>
                      420 Bags
                    </td>

                    <td>
                      <span className="text-success">
                        +30 Bags
                      </span>
                    </td>

                    <td>
                      <strong>450 Bags</strong>
                    </td>

                    <td>
                      Physical stock found
                    </td>

                    <td>
                      Md. Rahim
                    </td>

                    <td>
                      25 Sep 2026
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info mr-2">
                        <i className="mdi mdi-eye"></i>
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        <i className="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Adjustment 2 */}
                  <tr>
                    <td>2</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <i
                            className="mdi mdi-wrench"
                            style={{
                              fontSize: "28px",
                              color: "#FFAB00"
                            }}
                          ></i>
                        </div>

                        <div>
                          <h6 className="mb-1">
                            Steel Rod 16mm
                          </h6>
                          <small className="text-muted">
                            STL-016
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-danger">
                        Decrease
                      </span>
                    </td>

                    <td>
                      90 Tons
                    </td>

                    <td>
                      <span className="text-danger">
                        -5 Tons
                      </span>
                    </td>

                    <td>
                      <strong>85 Tons</strong>
                    </td>

                    <td>
                      Damaged material
                    </td>

                    <td>
                      Karim Hossain
                    </td>

                    <td>
                      24 Sep 2026
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info mr-2">
                        <i className="mdi mdi-eye"></i>
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        <i className="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Adjustment 3 */}
                  <tr>
                    <td>3</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <i
                            className="mdi mdi-wall"
                            style={{
                              fontSize: "28px",
                              color: "#E65100"
                            }}
                          ></i>
                        </div>

                        <div>
                          <h6 className="mb-1">
                            Red Brick
                          </h6>
                          <small className="text-muted">
                            BRK-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-danger">
                        Decrease
                      </span>
                    </td>

                    <td>
                      13,000 Pcs
                    </td>

                    <td>
                      <span className="text-danger">
                        -500 Pcs
                      </span>
                    </td>

                    <td>
                      <strong>12,500 Pcs</strong>
                    </td>

                    <td>
                      Broken bricks
                    </td>

                    <td>
                      Hasan Mahmud
                    </td>

                    <td>
                      23 Sep 2026
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info mr-2">
                        <i className="mdi mdi-eye"></i>
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        <i className="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Adjustment 4 */}
                  <tr>
                    <td>4</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <i
                            className="mdi mdi-cube-outline"
                            style={{
                              fontSize: "28px",
                              color: "#795548"
                            }}
                          ></i>
                        </div>

                        <div>
                          <h6 className="mb-1">
                            Fine Sand
                          </h6>
                          <small className="text-muted">
                            SND-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-success">
                        Increase
                      </span>
                    </td>

                    <td>
                      15 Trucks
                    </td>

                    <td>
                      <span className="text-success">
                        +3 Trucks
                      </span>
                    </td>

                    <td>
                      <strong>18 Trucks</strong>
                    </td>

                    <td>
                      Measurement correction
                    </td>

                    <td>
                      Sohel Rana
                    </td>

                    <td>
                      22 Sep 2026
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info mr-2">
                        <i className="mdi mdi-eye"></i>
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        <i className="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Adjustment 5 */}
                  <tr>
                    <td>5</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <i
                            className="mdi mdi-cube"
                            style={{
                              fontSize: "28px",
                              color: "#607D8B"
                            }}
                          ></i>
                        </div>

                        <div>
                          <h6 className="mb-1">
                            Stone Chips
                          </h6>
                          <small className="text-muted">
                            STN-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-danger">
                        Decrease
                      </span>
                    </td>

                    <td>
                      8 Trucks
                    </td>

                    <td>
                      <span className="text-danger">
                        -2 Trucks
                      </span>
                    </td>

                    <td>
                      <strong>6 Trucks</strong>
                    </td>

                    <td>
                      Material wastage
                    </td>

                    <td>
                      Arif Chowdhury
                    </td>

                    <td>
                      21 Sep 2026
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info mr-2">
                        <i className="mdi mdi-eye"></i>
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        <i className="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Adjustment 6 */}
                  <tr>
                    <td>6</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <i
                            className="mdi mdi-flash"
                            style={{
                              fontSize: "28px",
                              color: "#2196F3"
                            }}
                          ></i>
                        </div>

                        <div>
                          <h6 className="mb-1">
                            Electrical Cable
                          </h6>
                          <small className="text-muted">
                            CAB-002
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-success">
                        Increase
                      </span>
                    </td>

                    <td>
                      1,200 Meters
                    </td>

                    <td>
                      <span className="text-success">
                        +50 Meters
                      </span>
                    </td>

                    <td>
                      <strong>1,250 Meters</strong>
                    </td>

                    <td>
                      Stock count correction
                    </td>

                    <td>
                      Jahid Hasan
                    </td>

                    <td>
                      20 Sep 2026
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info mr-2">
                        <i className="mdi mdi-eye"></i>
                      </button>

                      <button className="btn btn-sm btn-outline-danger">
                        <i className="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>

                </tbody>

              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-4">

              <p className="text-muted mb-0">
                Showing 1 to 6 of 18 adjustment records
              </p>

              <nav>
                <ul className="pagination mb-0">

                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>

                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>

                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>

                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>

                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>

                </ul>
              </nav>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default StockAdjustment;