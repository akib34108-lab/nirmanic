function StockOut() {
  return (
    <div className="content-wrapper">

      {/* Page Header */}
      <div className="page-header">
        <h3 className="page-title">Stock Out</h3>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Material & Inventory</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Stock Out
            </li>
          </ol>
        </nav>
      </div>

      {/* Search & Add Stock Out */}
      <div className="mb-4">
        <form className="form-inline mt-2 mt-md-0">
          <div className="d-flex w-100">

            <div className="input-group flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Search Stock Out"
              />

              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="mdi mdi-magnify"></i>
                </span>
              </div>
            </div>

            <button type="button" className="btn btn-info ml-2">
              <i className="mdi mdi-plus mr-1"></i>
              Add Stock Out
            </button>

          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">

              <h4 className="card-title mb-4">
                Stock Out History
              </h4>

              <div className="table-responsive">
                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Material</th>
                      <th>Project / Site</th>
                      <th>Quantity</th>
                      <th>Issued By</th>
                      <th>Issue Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {/* Stock Out 1 */}
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
                        Gulshan Residential Project
                      </td>

                      <td>
                        <strong>50</strong> Bags
                      </td>

                      <td>
                        Md. Rahim
                      </td>

                      <td>
                        25 Sep 2026
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Issued
                        </span>
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

                    {/* Stock Out 2 */}
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
                        Uttara Commercial Building
                      </td>

                      <td>
                        <strong>8</strong> Tons
                      </td>

                      <td>
                        Karim Hossain
                      </td>

                      <td>
                        24 Sep 2026
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Issued
                        </span>
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

                    {/* Stock Out 3 */}
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
                        Mirpur Housing Project
                      </td>

                      <td>
                        <strong>2,000</strong> Pcs
                      </td>

                      <td>
                        Hasan Mahmud
                      </td>

                      <td>
                        23 Sep 2026
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Issued
                        </span>
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

                    {/* Stock Out 4 */}
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
                        Banani Office Tower
                      </td>

                      <td>
                        <strong>5</strong> Trucks
                      </td>

                      <td>
                        Sohel Rana
                      </td>

                      <td>
                        22 Sep 2026
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Issued
                        </span>
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

                    {/* Stock Out 5 */}
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
                        Dhanmondi Apartment Project
                      </td>

                      <td>
                        <strong>4</strong> Trucks
                      </td>

                      <td>
                        Arif Chowdhury
                      </td>

                      <td>
                        21 Sep 2026
                      </td>

                      <td>
                        <span className="text-warning">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Pending
                        </span>
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

                    {/* Stock Out 6 */}
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
                        Bashundhara Commercial Project
                      </td>

                      <td>
                        <strong>250</strong> Meters
                      </td>

                      <td>
                        Jahid Hasan
                      </td>

                      <td>
                        20 Sep 2026
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Issued
                        </span>
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
                  Showing 1 to 6 of 28 stock out records
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
    </div>
  );
}

export default StockOut;