function Suppliers() {
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">Suppliers</h3>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Material & Inventory</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Supplier List
            </li>
          </ol>
        </nav>
      </div>
      <div className="mb-4">
        <form className="form-inline mt-2 mt-md-0">
          <div className="d-flex w-100">

            <div className="input-group flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Search Supplier"
              />

              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="mdi mdi-magnify"></i>
                </span>
              </div>
            </div>

            <button type="button" className="btn btn-info ml-2">
              <i className="mdi mdi-plus mr-1"></i>
              Add Supplier
            </button>

          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">

              <h4 className="card-title mb-4">
                Supplier List
              </h4>

              <div className="table-responsive">
                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Supplier</th>
                      <th>Contact Person</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Supplied Materials</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="mr-3">
                            <i
                              className="mdi mdi-office-building"
                              style={{
                                fontSize: "28px",
                                color: "#151515"
                              }}
                            ></i>
                          </div>

                          <div>
                            <h6 className="mb-1">
                              ABC Construction Supply
                            </h6>
                            <small className="text-muted">
                              Dhaka, Bangladesh
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>Rahim Ahmed</td>

                      <td>01711-123456</td>

                      <td>abcconstruction@gmail.com</td>

                      <td>
                        <span className="badge badge-info">
                          8 Materials
                        </span>
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Active
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-info mr-2">
                          <i className="mdi mdi-pencil"></i>
                        </button>

                        <button className="btn btn-sm btn-outline-danger">
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="mr-3">
                            <i
                              className="mdi mdi-office-building"
                              style={{
                                fontSize: "28px",
                                color: "#FFAB00"
                              }}
                            ></i>
                          </div>

                          <div>
                            <h6 className="mb-1">
                              Steel & Rod Limited
                            </h6>
                            <small className="text-muted">
                              Chattogram, Bangladesh
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>Karim Hossain</td>

                      <td>01822-456789</td>

                      <td>steelrod@gmail.com</td>

                      <td>
                        <span className="badge badge-info">
                          5 Materials
                        </span>
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Active
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-info mr-2">
                          <i className="mdi mdi-pencil"></i>
                        </button>

                        <button className="btn btn-sm btn-outline-danger">
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="mr-3">
                            <i
                              className="mdi mdi-office-building"
                              style={{
                                fontSize: "28px",
                                color: "#4CAF50"
                              }}
                            ></i>
                          </div>

                          <div>
                            <h6 className="mb-1">
                              Premium Cement Traders
                            </h6>
                            <small className="text-muted">
                              Gazipur, Bangladesh
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>Hasan Mahmud</td>

                      <td>01933-789012</td>

                      <td>premiumcement@gmail.com</td>

                      <td>
                        <span className="badge badge-info">
                          4 Materials
                        </span>
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Active
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-info mr-2">
                          <i className="mdi mdi-pencil"></i>
                        </button>

                        <button className="btn btn-sm btn-outline-danger">
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="mr-3">
                            <i
                              className="mdi mdi-office-building"
                              style={{
                                fontSize: "28px",
                                color: "#2196F3"
                              }}
                            ></i>
                          </div>

                          <div>
                            <h6 className="mb-1">
                              Electrical Solutions Ltd.
                            </h6>
                            <small className="text-muted">
                              Dhaka, Bangladesh
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>Sohel Rana</td>

                      <td>01644-345678</td>

                      <td>electricalsolutions@gmail.com</td>

                      <td>
                        <span className="badge badge-info">
                          12 Materials
                        </span>
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Active
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-info mr-2">
                          <i className="mdi mdi-pencil"></i>
                        </button>

                        <button className="btn btn-sm btn-outline-danger">
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="mr-3">
                            <i
                              className="mdi mdi-office-building"
                              style={{
                                fontSize: "28px",
                                color: "#9C27B0"
                              }}
                            ></i>
                          </div>

                          <div>
                            <h6 className="mb-1">
                              BuildPro Materials
                            </h6>
                            <small className="text-muted">
                              Narayanganj, Bangladesh
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>Jahid Hasan</td>

                      <td>01755-901234</td>

                      <td>buildpro@gmail.com</td>

                      <td>
                        <span className="badge badge-info">
                          7 Materials
                        </span>
                      </td>

                      <td>
                        <span className="text-warning">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Inactive
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-info mr-2">
                          <i className="mdi mdi-pencil"></i>
                        </button>

                        <button className="btn btn-sm btn-outline-danger">
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>

                      <td>
                        <div className="d-flex align-items-center">
                          <div className="mr-3">
                            <i
                              className="mdi mdi-office-building"
                              style={{
                                fontSize: "28px",
                                color: "#795548"
                              }}
                            ></i>
                          </div>

                          <div>
                            <h6 className="mb-1">
                              SafeBuild Traders
                            </h6>
                            <small className="text-muted">
                              Cumilla, Bangladesh
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>Arif Chowdhury</td>

                      <td>01866-567890</td>

                      <td>safebuild@gmail.com</td>

                      <td>
                        <span className="badge badge-info">
                          6 Materials
                        </span>
                      </td>

                      <td>
                        <span className="text-success">
                          <i className="mdi mdi-checkbox-blank-circle mr-1"></i>
                          Active
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-info mr-2">
                          <i className="mdi mdi-pencil"></i>
                        </button>

                        <button className="btn btn-sm btn-outline-danger">
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>

                  </tbody>

                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4">

                <p className="text-muted mb-0">
                  Showing 1 to 6 of 18 suppliers
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

export default Suppliers;