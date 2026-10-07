function CurrentStock() {
  return (
    <div className="content-wrapper">

      {/* Page Header */}
      <div className="page-header">
        <h3 className="page-title">Current Stock</h3>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Material & Inventory</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Current Stock
            </li>
          </ol>
        </nav>
      </div>

      {/* Search & Stock Adjustment */}
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
              Stock Adjustment
            </button>

          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">

            <h4 className="card-title mb-4">
              Current Stock
            </h4>

            <div className="table-responsive">
              <table className="table table-hover">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Material</th>
                    <th>Category</th>
                    <th>Current Stock</th>
                    <th>Min. Stock</th>
                    <th>Unit Price</th>
                    <th>Total Value</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {/* Cement */}
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
                          <h6 className="mb-1">Portland Cement</h6>
                          <small className="text-muted">
                            CEM-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>Construction</td>

                    <td>
                      <strong>450</strong> Bags
                    </td>

                    <td>100 Bags</td>

                    <td>৳ 550</td>

                    <td>৳ 247,500</td>

                    <td>
                      <span className="text-success">
                        <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                        In Stock
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Steel Rod */}
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
                          <h6 className="mb-1">Steel Rod 16mm</h6>
                          <small className="text-muted">
                            STL-016
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>Steel</td>

                    <td>
                      <strong>85</strong> Tons
                    </td>

                    <td>20 Tons</td>

                    <td>৳ 85,000</td>

                    <td>৳ 7,225,000</td>

                    <td>
                      <span className="text-success">
                        <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                        In Stock
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Brick */}
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
                          <h6 className="mb-1">Red Brick</h6>
                          <small className="text-muted">
                            BRK-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>Masonry</td>

                    <td>
                      <strong>12,500</strong> Pcs
                    </td>

                    <td>5,000 Pcs</td>

                    <td>৳ 12</td>

                    <td>৳ 150,000</td>

                    <td>
                      <span className="text-success">
                        <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                        In Stock
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Sand */}
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
                          <h6 className="mb-1">Fine Sand</h6>
                          <small className="text-muted">
                            SND-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>Construction</td>

                    <td>
                      <strong>18</strong> Trucks
                    </td>

                    <td>10 Trucks</td>

                    <td>৳ 18,000</td>

                    <td>৳ 324,000</td>

                    <td>
                      <span className="text-warning">
                        <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                        Low Stock
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Stone Chips */}
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
                          <h6 className="mb-1">Stone Chips</h6>
                          <small className="text-muted">
                            STN-001
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>Construction</td>

                    <td>
                      <strong>6</strong> Trucks
                    </td>

                    <td>8 Trucks</td>

                    <td>৳ 25,000</td>

                    <td>৳ 150,000</td>

                    <td>
                      <span className="text-danger">
                        <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                        Out of Stock
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Electrical Cable */}
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
                          <h6 className="mb-1">Electrical Cable</h6>
                          <small className="text-muted">
                            CAB-002
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>Electrical</td>

                    <td>
                      <strong>1,250</strong> Meters
                    </td>

                    <td>500 Meters</td>

                    <td>৳ 180</td>

                    <td>৳ 225,000</td>

                    <td>
                      <span className="text-success">
                        <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                        In Stock
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-info">
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                </tbody>

              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-4">

              <p className="text-muted mb-0">
                Showing 1 to 6 of 25 materials
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

export default CurrentStock;