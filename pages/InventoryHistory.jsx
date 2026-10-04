function InventoryHistory() {
  return (
    <div className="content-wrapper">

      {/* Page Header */}
      <div className="page-header">
        <h3 className="page-title">Inventory History</h3>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Material & Inventory</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Inventory History
            </li>
          </ol>
        </nav>
      </div>

      {/* Search & Filter */}
      <div className="mb-4">
        <form className="form-inline mt-2 mt-md-0">

          <div className="d-flex w-100">

            {/* Search */}
            <div className="input-group flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Search Inventory History"
              />

              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="mdi mdi-magnify"></i>
                </span>
              </div>
            </div>

            {/* Filter Button */}
            <button
              type="button"
              className="btn btn-info ml-2"
            >
              <i className="mdi mdi-filter-outline mr-1"></i>
              Filter
            </button>

          </div>

        </form>
      </div>

      {/* Inventory History Table */}
      <div className="col-12 grid-margin">
        <div className="card">

          <div className="card-body">

            <h4 className="card-title mb-4">
              Inventory Transaction History
            </h4>

            <div className="table-responsive">
              <table className="table table-hover">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Material</th>
                    <th>Transaction Type</th>
                    <th>Quantity</th>
                    <th>Previous Stock</th>
                    <th>New Stock</th>
                    <th>Reference</th>
                    <th>Performed By</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {/* Row 1 */}
                  <tr>
                    <td>1</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-package-variant mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Portland Cement</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-success">
                        Stock In
                      </label>
                    </td>

                    <td>+200 Bags</td>

                    <td>220 Bags</td>

                    <td>420 Bags</td>

                    <td>Purchase</td>

                    <td>Md. Rahim</td>

                    <td>25 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td>2</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-package-variant mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Portland Cement</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-danger">
                        Stock Out
                      </label>
                    </td>

                    <td>-50 Bags</td>

                    <td>420 Bags</td>

                    <td>370 Bags</td>

                    <td>Gulshan Residential Project</td>

                    <td>Md. Rahim</td>

                    <td>25 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td>3</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-wrench mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Steel Rod 16mm</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-success">
                        Stock In
                      </label>
                    </td>

                    <td>25 Tons</td>

                    <td>65 Tons</td>

                    <td>90 Tons</td>

                    <td>Purchase</td>

                    <td>Karim Hossain</td>

                    <td>24 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr>
                    <td>4</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-wrench mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Steel Rod 16mm</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-danger">
                        Stock Out
                      </label>
                    </td>

                    <td>-8 Tons</td>

                    <td>90 Tons</td>

                    <td>82 Tons</td>

                    <td>Uttara Commercial Building</td>

                    <td>Karim Hossain</td>

                    <td>24 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr>
                    <td>5</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-wall mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Red Brick</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-warning">
                        Adjustment
                      </label>
                    </td>

                    <td>-500 Pcs</td>

                    <td>13,000 Pcs</td>

                    <td>12,500 Pcs</td>

                    <td>Broken Bricks</td>

                    <td>Hasan Mahmud</td>

                    <td>23 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr>
                    <td>6</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-cube-outline mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Fine Sand</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-success">
                        Stock In
                      </label>
                    </td>

                    <td>10 Trucks</td>

                    <td>5 Trucks</td>

                    <td>15 Trucks</td>

                    <td>Purchase</td>

                    <td>Sohel Rana</td>

                    <td>22 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Row 7 */}
                  <tr>
                    <td>7</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-cube mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Stone Chips</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-danger">
                        Stock Out
                      </label>
                    </td>

                    <td>-4 Trucks</td>

                    <td>8 Trucks</td>

                    <td>4 Trucks</td>

                    <td>Dhanmondi Apartment Project</td>

                    <td>Arif Chowdhury</td>

                    <td>21 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
                        <i className="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>

                  {/* Row 8 */}
                  <tr>
                    <td>8</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <i
                          className="mdi mdi-flash mr-2"
                          style={{ fontSize: "24px" }}
                        ></i>

                        <span>Electrical Cable</span>
                      </div>
                    </td>

                    <td>
                      <label className="badge badge-warning">
                        Adjustment
                      </label>
                    </td>

                    <td>+50 Meters</td>

                    <td>1,200 Meters</td>

                    <td>1,250 Meters</td>

                    <td>Stock Count Correction</td>

                    <td>Jahid Hasan</td>

                    <td>20 Sep 2026</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        title="View"
                      >
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
                Showing 1 to 8 of 64 inventory transactions
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

export default InventoryHistory;