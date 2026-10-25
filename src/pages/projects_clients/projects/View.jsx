import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "../../../lib/axios.js";
import Layout from "../../Layout.jsx";

const projectTypes = {
  1: "Residential",
  2: "Commercial",
  3: "Industrial",
  4: "Infrastructure",
  5: "Institutional",
  6: "Hospitality",
  7: "Government",
  8: "Renovation",
  9: "Other",
};

const projectStatuses = {
  1: "Planning",
  2: "Upcoming",
  3: "Ongoing",
  4: "On Hold",
  5: "Delayed",
  6: "Completed",
  7: "Cancelled",
};

const purchaseStatuses = {
  1: "Draft",
  2: "Pending",
  3: "Ordered",
  4: "Partially Received",
  5: "Received",
  6: "Cancelled",
};

function parseBudgetAmount(value) {
  const match = String(value || "")
    .trim()
    .replace(/,/g, "")
    .match(/^(\d+(?:\.\d+)?)\s*(cr|crore|lakh|lac|k)?$/i);
  if (!match) {
    return NaN;
  }

  const multiplier = {
    cr: 10000000,
    crore: 10000000,
    lakh: 100000,
    lac: 100000,
    k: 1000,
  }[(match[2] || "").toLowerCase()] || 1;
  return Number(match[1]) * multiplier;
}

const formatCurrency = (value) =>
  `৳ ${Number(value || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function ProjectsView() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState("");
  const [galleryNotice, setGalleryNotice] = useState("");
  const [galleryRefresh, setGalleryRefresh] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imageCaption, setImageCaption] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await axios.get(`/projects/details.php?id=${id}`);
        if (!response.data.status || !response.data.data?.project) {
          setError(response.data.message || "Unable to load project details.");
          return;
        }
        setProject(response.data.data.project);
        setPurchases(response.data.data.purchases || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load project details. Please try again."
        );
      }
    }

    fetchProjectDetails();
  }, [id]);

  useEffect(() => {
    let active = true;

    async function fetchGallery() {
      setGalleryLoading(true);
      setGalleryError("");
      try {
        const response = await axios.get(
          `/projects/gallery.php?project_id=${encodeURIComponent(id)}`
        );
        if (!response.data.status) {
          throw new Error(response.data.message || "Unable to load project gallery.");
        }
        if (active) {
          setGallery(response.data.data || []);
        }
      } catch (requestError) {
        if (active) {
          setGalleryError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load project gallery."
          );
        }
      } finally {
        if (active) {
          setGalleryLoading(false);
        }
      }
    }

    fetchGallery();
    return () => {
      active = false;
    };
  }, [id, galleryRefresh]);

  async function handleGalleryUpload(event) {
    event.preventDefault();
    setGalleryError("");
    setGalleryNotice("");

    if (!imageFile) {
      setGalleryError("Choose a progress image to upload.");
      return;
    }
    if (imageFile.size > 10 * 1024 * 1024) {
      setGalleryError("Images must be 10 MB or smaller.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (imageFile.type && !allowedTypes.includes(imageFile.type)) {
      setGalleryError("Choose a JPEG, PNG, or WebP image.");
      return;
    }

    const formData = new FormData();
    formData.append("project_id", id);
    formData.append("caption", imageCaption);
    formData.append("image", imageFile);

    setUploadingImage(true);
    try {
      const response = await axios.post("/projects/gallery.php", formData);
      if (!response.data.status) {
        throw new Error(response.data.message || "Unable to upload progress image.");
      }
      setImageFile(null);
      setImageCaption("");
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      setGalleryNotice(response.data.message || "Progress image uploaded successfully.");
      setGalleryRefresh((current) => current + 1);
    } catch (requestError) {
      setGalleryError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to upload progress image."
      );
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleGalleryDelete(image) {
    if (!window.confirm("Delete this progress image from the gallery?")) {
      return;
    }

    setGalleryError("");
    setGalleryNotice("");
    setDeletingImageId(image.id);
    try {
      const response = await axios.delete(`/projects/gallery.php?id=${image.id}`);
      if (!response.data.status) {
        throw new Error(response.data.message || "Unable to delete progress image.");
      }
      setGallery((current) => current.filter((item) => item.id !== image.id));
      setGalleryNotice(response.data.message || "Progress image deleted successfully.");
    } catch (requestError) {
      setGalleryError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to delete progress image."
      );
    } finally {
      setDeletingImageId(null);
    }
  }

  const budgetValue = parseBudgetAmount(project?.budget);
  const hasNumericBudget = Number.isFinite(budgetValue) && budgetValue >= 0;
  const budgetHasUnit = /(?:cr|crore|lakh|lac|k)\s*$/i.test(project?.budget || "");
  const spentAmount = Number(project?.spent_amount || 0);
  const remainingBudget = hasNumericBudget ? budgetValue - spentAmount : null;
  const progress = Math.min(100, Math.max(0, Number(project?.progress || 0)));
  const spendProgress =
    hasNumericBudget && budgetValue > 0
      ? Math.min(100, (spentAmount / budgetValue) * 100)
      : 0;

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Project Details</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/projects_clients/projects" style={{ color: "black" }}>
                  Projects List
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Project Details
              </li>
            </ol>
          </nav>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!project && !error && <div className="alert alert-info">Loading project details...</div>}

        {project && (
          <>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-start">
                  <div>
                    <h4 className="mb-1">{project.name}</h4>
                    <p className="text-muted mb-0">
                      {project.project_code || "No project code"} ·{" "}
                      {projectTypes[project.type] || "Project"}
                    </p>
                  </div>
                  <div className="mt-2 mt-md-0">
                    <Link
                      to={`/projects_clients/projects/edit/${project.id}`}
                      className="btn btn-outline-secondary mr-2"
                    >
                      Edit Project
                    </Link>
                    <Link
                      to={`/material_stock/material_purchase/create?project_id=${project.id}`}
                      className="btn btn-primary"
                    >
                      <i className="mdi mdi-plus"></i> Record Material Purchase
                    </Link>
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <small className="text-muted d-block">Client</small>
                    <strong>{project.client_name || "—"}</strong>
                  </div>
                  <div className="col-md-4 mb-3">
                    <small className="text-muted d-block">Project Manager</small>
                    <strong>{project.employee_name || "—"}</strong>
                  </div>
                  <div className="col-md-4 mb-3">
                    <small className="text-muted d-block">Status</small>
                    <strong>{projectStatuses[project.status] || "—"}</strong>
                  </div>
                  <div className="col-md-4 mb-3">
                    <small className="text-muted d-block">Location</small>
                    <strong>{project.location || "—"}</strong>
                  </div>
                  <div className="col-md-4 mb-3">
                    <small className="text-muted d-block">Start Date</small>
                    <strong>{project.start_date || "—"}</strong>
                  </div>
                  <div className="col-md-4 mb-3">
                    <small className="text-muted d-block">Expected Completion</small>
                    <strong>{project.expected_completion_date || "—"}</strong>
                  </div>
                  <div className="col-12">
                    <small className="text-muted d-block">Description</small>
                    <p className="mb-0">{project.description || "No description provided."}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <small className="text-muted d-block">Project Budget</small>
                    <h4 className="mb-0">
                      {hasNumericBudget
                        ? budgetHasUnit
                          ? `৳ ${project.budget}`
                          : formatCurrency(budgetValue)
                        : project.budget || "Not set"}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <small className="text-muted d-block">Material Purchase Spend</small>
                    <h4 className="mb-0">{formatCurrency(spentAmount)}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <small className="text-muted d-block">Remaining Budget</small>
                    <h4 className={`mb-0 ${remainingBudget < 0 ? "text-danger" : ""}`}>
                      {remainingBudget === null
                        ? "Set a numeric budget"
                        : formatCurrency(remainingBudget)}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">Project Progress</h5>
                  <strong>{progress}% complete</strong>
                </div>
                <div className="progress mb-3" style={{ height: "10px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Project completion"
                  ></div>
                </div>
                <small className="text-muted">
                  Budget used by material purchases:{" "}
                  {hasNumericBudget ? `${spendProgress.toFixed(1)}%` : "budget is not numeric"}
                </small>
                {hasNumericBudget && (
                  <div className="progress mt-2" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar ${spentAmount > budgetValue ? "bg-danger" : "bg-info"}`}
                      role="progressbar"
                      style={{ width: `${spendProgress}%` }}
                      aria-valuenow={spendProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label="Material budget used"
                    ></div>
                  </div>
                )}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="card-title mb-1">Project Progress Gallery</h5>
                    <small className="text-muted">
                      Keep dated photos of work completed on site.
                    </small>
                  </div>
                  <span className="badge badge-light">{gallery.length} photo(s)</span>
                </div>

                {galleryError && (
                  <div className="alert alert-danger" role="alert">
                    {galleryError}
                  </div>
                )}
                {galleryNotice && (
                  <div className="alert alert-success" role="status">
                    {galleryNotice}
                  </div>
                )}

                <form onSubmit={handleGalleryUpload} className="border rounded p-3 mb-4">
                  <div className="form-row align-items-end">
                    <div className="form-group col-md-5">
                      <label htmlFor="progress-image">Progress image</label>
                      <input
                        ref={imageInputRef}
                        id="progress-image"
                        type="file"
                        className="form-control-file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                        disabled={uploadingImage}
                      />
                      <small className="form-text text-muted">
                        JPEG, PNG, or WebP; up to 10 MB.
                      </small>
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="progress-image-caption">Caption (optional)</label>
                      <input
                        id="progress-image-caption"
                        type="text"
                        className="form-control"
                        value={imageCaption}
                        onChange={(event) => setImageCaption(event.target.value)}
                        maxLength={255}
                        placeholder="e.g. Foundation work completed"
                        disabled={uploadingImage}
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={uploadingImage || !imageFile}
                      >
                        {uploadingImage ? "Uploading..." : "Upload photo"}
                      </button>
                    </div>
                  </div>
                </form>

                {galleryLoading ? (
                  <div className="text-muted" role="status">Loading progress photos...</div>
                ) : gallery.length ? (
                  <div className="row">
                    {gallery.map((image) => (
                      <div className="col-sm-6 col-lg-4 mb-4" key={image.id}>
                        <div className="card h-100">
                          <a
                            href={`${import.meta.env.VITE_API_URL}${image.image_path}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open progress photo${image.caption ? `: ${image.caption}` : ""}`}
                          >
                            <img
                              src={`${import.meta.env.VITE_API_URL}${image.image_path}`}
                              alt={image.caption || "Project progress"}
                              className="card-img-top"
                              loading="lazy"
                              style={{ height: "220px", objectFit: "cover" }}
                            />
                          </a>
                          <div className="card-body d-flex flex-column">
                            <p className="mb-2">{image.caption || "Project progress photo"}</p>
                            <small className="text-muted mt-auto">
                              {image.created_at
                                ? new Date(image.created_at.replace(" ", "T")).toLocaleDateString()
                                : "Date unavailable"}
                            </small>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm mt-3 align-self-start"
                              onClick={() => handleGalleryDelete(image)}
                              disabled={deletingImageId === image.id}
                            >
                              {deletingImageId === image.id ? "Deleting..." : "Delete photo"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : galleryError ? null : (
                  <div className="text-center text-muted py-4">
                    No progress photos yet. Upload the first site photo above.
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Material Purchase History</h5>
                  <span className="text-muted">{purchases.length} purchase(s)</span>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Purchase No.</th>
                        <th>Date</th>
                        <th>Supplier</th>
                        <th>Status</th>
                        <th className="text-right">Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.length ? (
                        purchases.map((purchase) => (
                          <tr key={purchase.id}>
                            <td>{purchase.purchase_no || "—"}</td>
                            <td>{purchase.purchase_date || "—"}</td>
                            <td>{purchase.supplier_name || "—"}</td>
                            <td>{purchaseStatuses[purchase.status] || "—"}</td>
                            <td className="text-right">{formatCurrency(purchase.total_amount)}</td>
                            <td>
                              <Link
                                to={`/material_stock/material_purchase/edit/${purchase.id}`}
                                className="btn btn-outline-primary btn-sm"
                              >
                                View / Edit
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center text-muted">
                            No material purchases have been recorded for this project.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default ProjectsView;
