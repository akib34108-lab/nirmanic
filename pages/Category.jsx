function Category() {
    return (
        <div className="content-wrapper">

            {/* Page Header */}
            <div className="page-header">
                <h3 className="page-title">Material Categories</h3>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Material & Inventory</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Category List
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Search & Add Category */}
            <div className="mb-4">
                <form className="form-inline mt-2 mt-md-0">
                    <div className="d-flex w-100">

                        <div className="input-group flex-grow-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Category"
                            />

                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="mdi mdi-magnify"></i>
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-info ml-2"
                        >
                            <i className="mdi mdi-plus mr-1"></i>
                            Add Category
                        </button>

                    </div>
                </form>
            </div>

            {/* Category List */}
            <div className="row">

                <div className="col-12 grid-margin">

                    <div className="card">

                        <div className="card-body">

                            <h4 className="card-title mb-4">
                                Material Category List
                            </h4>

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Materials</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th className="text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {/* Construction */}
                                        <tr>

                                            <td>01</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-office-building"
                                                            style={{
                                                                fontSize: "28px",
                                                                color: "#4B49AC"
                                                            }}
                                                        ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Construction
                                                        </h6>

                                                        <small className="text-muted">
                                                            General construction materials
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    Materials used for general construction work
                                                </small>
                                            </td>

                                            <td>
                                                <i className="mdi mdi-package-variant text-muted mr-1"></i>
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
                                                    04 Oct 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>


                                        {/* Steel */}
                                        <tr>

                                            <td>02</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-wrench"
                                                            style={{
                                                                fontSize: "28px",
                                                                color: "#248AFD"
                                                            }}
                                                        ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Steel
                                                        </h6>

                                                        <small className="text-muted">
                                                            Steel and reinforcement materials
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    Reinforcement bars and structural steel
                                                </small>
                                            </td>

                                            <td>
                                                <i className="mdi mdi-package-variant text-muted mr-1"></i>
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
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>


                                        {/* Masonry */}
                                        <tr>

                                            <td>03</td>

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
                                                            Masonry
                                                        </h6>

                                                        <small className="text-muted">
                                                            Brick and masonry materials
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    Bricks, blocks and related materials
                                                </small>
                                            </td>

                                            <td>
                                                <i className="mdi mdi-package-variant text-muted mr-1"></i>
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
                                                    28 Sep 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>


                                        {/* Electrical */}
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
                                                            Electrical
                                                        </h6>

                                                        <small className="text-muted">
                                                            Electrical installation materials
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    Cables, switches and electrical accessories
                                                </small>
                                            </td>

                                            <td>
                                                <i className="mdi mdi-package-variant text-muted mr-1"></i>
                                                15
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
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>


                                        {/* Plumbing */}
                                        <tr>

                                            <td>05</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-pipe"
                                                            style={{
                                                                fontSize: "28px",
                                                                color: "#00B8D9"
                                                            }}
                                                        ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Plumbing
                                                        </h6>

                                                        <small className="text-muted">
                                                            Plumbing and piping materials
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    Pipes, fittings and plumbing accessories
                                                </small>
                                            </td>

                                            <td>
                                                <i className="mdi mdi-package-variant text-muted mr-1"></i>
                                                10
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
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Delete"
                                                >
                                                    <i className="mdi mdi-delete"></i>
                                                </button>

                                            </td>

                                        </tr>


                                        {/* Finishing */}
                                        <tr>

                                            <td>06</td>

                                            <td>
                                                <div className="d-flex align-items-center">

                                                    <div className="mr-3">
                                                        <i
                                                            className="mdi mdi-format-paint"
                                                            style={{
                                                                fontSize: "28px",
                                                                color: "#9C27B0"
                                                            }}
                                                        ></i>
                                                    </div>

                                                    <div>
                                                        <h6 className="mb-1">
                                                            Finishing
                                                        </h6>

                                                        <small className="text-muted">
                                                            Interior and exterior finishing materials
                                                        </small>
                                                    </div>

                                                </div>
                                            </td>

                                            <td>
                                                <small className="text-muted">
                                                    Paint, tiles and finishing products
                                                </small>
                                            </td>

                                            <td>
                                                <i className="mdi mdi-package-variant text-muted mr-1"></i>
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
                                                    15 Sep 2026
                                                </small>
                                            </td>

                                            <td className="text-center">

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary mr-1"
                                                    title="Edit"
                                                >
                                                    <i className="mdi mdi-pencil"></i>
                                                </button>

                                                <button
                                                    type="button"
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

                            {/* Pagination */}
                            <div className="d-flex justify-content-between align-items-center mt-4">

                                <div>
                                    <small className="text-muted">
                                        Showing 1 to 6 of 12 categories
                                    </small>
                                </div>

                                <nav aria-label="Category pagination">

                                    <ul className="pagination mb-0">

                                        <li className="page-item disabled">
                                            <a className="page-link" href="#">
                                                <i className="mdi mdi-chevron-left"></i>
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

export default Category;