import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Layout from "../Layout.jsx";
import axios from "../../lib/axios.js";

const money = (value) =>
  `৳ ${Number(value || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const statusStyles = {
  draft: { color: "#64748b", background: "#f1f5f9" },
  pending: { color: "#b45309", background: "#fef3c7" },
  approved: { color: "#15803d", background: "#dcfce7" },
  rejected: { color: "#b91c1c", background: "#fee2e2" },
};

function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.draft;
  return (
    <span className="badge" style={{ color: style.color, background: style.background }}>
      {status || "draft"}
    </span>
  );
}

function PageHeader({ title, children }) {
  return (
    <div className="page-header flex-wrap">
      <div>
        <h3 className="page-title">{title}</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/boq">BOQ & Estimates</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{title}</li>
          </ol>
        </nav>
      </div>
      {children}
    </div>
  );
}

function ErrorMessage({ children }) {
  return children ? <div className="alert alert-danger" role="alert">{children}</div> : null;
}

export function BOQList() {
  const [boqs, setBoqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    let active = true;
    axios.get("/boq/index.php")
      .then((response) => {
        if (!active) return;
        if (!response.data.status && response.data.message !== "No records found") {
          throw new Error(response.data.message || "Unable to load BOQs.");
        }
        setBoqs(response.data.data || []);
        setError("");
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || requestError.message || "Unable to load BOQs.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const filteredBoqs = useMemo(() => boqs.filter((boq) => {
    const matchesSearch = `${boq.boq_no} ${boq.title} ${boq.project_name}`
      .toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (!status || boq.status === status);
  }), [boqs, search, status]);

  return (
    <Layout>
      <div className="content-wrapper">
        <PageHeader title="BOQ List">
          <div className="d-flex flex-wrap mt-3 mt-md-0">
            <Link to="/boq/report" className="btn btn-outline-primary mr-2">
              <i className="mdi mdi-chart-box-outline mr-1" /> Budget vs Actual
            </Link>
            <Link to="/boq/create" className="btn btn-primary">
              <i className="mdi mdi-plus mr-1" /> Create BOQ
            </Link>
          </div>
        </PageHeader>
        <ErrorMessage>{error}</ErrorMessage>
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-8 mb-2">
                <input className="form-control" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search BOQ, project, or reference" aria-label="Search BOQs" />
              </div>
              <div className="col-md-4 mb-2">
                <select className="form-control" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
                  <option value="">All statuses</option>
                  {Object.keys(statusStyles).map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}
                </select>
              </div>
            </div>
            {loading ? <div className="alert alert-info">Loading BOQs...</div> : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead><tr><th>BOQ No.</th><th>Title</th><th>Project</th><th>Revision</th><th>Estimate</th><th>Status</th><th>Updated</th><th /></tr></thead>
                  <tbody>
                    {filteredBoqs.map((boq) => (
                      <tr key={boq.id}>
                        <td><strong>{boq.boq_no}</strong></td>
                        <td>{boq.title}</td>
                        <td>{boq.project_name}</td>
                        <td>Rev. {boq.revision}</td>
                        <td>{money(boq.estimate_total)}</td>
                        <td><StatusBadge status={boq.status} /></td>
                        <td>{boq.updated_at ? new Date(boq.updated_at.replace(" ", "T")).toLocaleDateString() : "—"}</td>
                        <td><Link className="btn btn-sm btn-outline-primary" to={`/boq/${boq.id}`}>Open</Link></td>
                      </tr>
                    ))}
                    {!filteredBoqs.length && <tr><td colSpan="8" className="text-center text-muted py-4">No BOQs match your filters.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const emptyItem = () => ({ material_id: "", description: "", unit: "", quantity: "", rate: "" });

export function BOQForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [projects, setProjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({ project_id: "", title: "", notes: "", change_note: "", items: [emptyItem()] });
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFormData() {
      try {
        const [projectResponse, materialResponse] = await Promise.all([
          axios.get("/projects/index.php"),
          axios.get("/material_list/index.php"),
        ]);
        setProjects(projectResponse.data.data || []);
        setMaterials(materialResponse.data.data || []);
        if (id) {
          const response = await axios.get(`/boq/index.php?id=${id}`);
          if (!response.data.status) throw new Error(response.data.message || "Unable to load BOQ.");
          const boq = response.data.data;
          setForm({
            project_id: String(boq.project_id),
            title: boq.title,
            notes: boq.notes || "",
            change_note: "",
            items: (boq.items || []).map((item) => ({
              material_id: item.material_id ? String(item.material_id) : "",
              description: item.description || "",
              unit: item.unit || "",
              quantity: item.quantity,
              rate: item.rate,
            })),
          });
        }
      } catch (requestError) {
        setError(requestError.response?.data?.message || requestError.message || "Unable to load form data.");
      } finally {
        setLoading(false);
      }
    }
    loadFormData();
  }, [id]);

  const estimate = form.items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0), 0);

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateItem(index, field, value) {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        const next = { ...item, [field]: value };
        if (field === "material_id") {
          const material = materials.find((entry) => String(entry.id) === value);
          if (material) {
            next.description = material.material_name || next.description;
            next.unit = material.unit_name || next.unit;
          }
        }
        return next;
      }),
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!form.project_id || !form.title.trim() || !form.items.length || form.items.some((item) =>
      !item.description.trim() || !item.unit.trim() || !Number.isFinite(Number(item.quantity)) ||
      Number(item.quantity) <= 0 || !Number.isFinite(Number(item.rate)) || Number(item.rate) < 0
    )) {
      setError("Select a project, enter a title, and provide a description, unit, positive quantity, and non-negative rate for every item.");
      return;
    }
    setSubmitting(true);
    const payload = new FormData();
    payload.set("project_id", form.project_id);
    payload.set("title", form.title.trim());
    payload.set("notes", form.notes);
    payload.set("change_note", form.change_note);
    payload.set("items", JSON.stringify(form.items.map((item) => ({
      material_id: item.material_id || null,
      description: item.description.trim(),
      unit: item.unit.trim(),
      quantity: item.quantity,
      rate: item.rate,
    }))));
    if (id) payload.set("id", id);
    try {
      const response = await axios.post(`/boq/index.php?action=${id ? "update" : "create"}`, payload);
      if (!response.data.status) throw new Error(response.data.message || "Unable to save BOQ.");
      navigate(`/boq/${response.data.data.id || id}`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to save BOQ.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="content-wrapper">
        <PageHeader title={isEditing ? "Revise BOQ" : "Create BOQ"} />
        <ErrorMessage>{error}</ErrorMessage>
        {loading ? <div className="alert alert-info">Loading BOQ...</div> : (
          <form onSubmit={submit}>
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="card-title">BOQ information</h4>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="boq-project">Project</label>
                    <select id="boq-project" className="form-control" value={form.project_id} onChange={(event) => updateForm("project_id", event.target.value)} required>
                      <option value="">Select project</option>
                      {projects.map((project) => <option key={project.id} value={project.id}>{project.name} {project.project_code ? `(${project.project_code})` : ""}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="boq-title">BOQ title</label>
                    <input id="boq-title" className="form-control" value={form.title} onChange={(event) => updateForm("title", event.target.value)} maxLength="180" placeholder="e.g. Structural works — Phase 1" required />
                  </div>
                  {isEditing && <div className="col-12 form-group">
                    <label htmlFor="boq-change-note">Revision note</label>
                    <input id="boq-change-note" className="form-control" value={form.change_note} onChange={(event) => updateForm("change_note", event.target.value)} maxLength="255" placeholder="What changed in this revision?" required />
                  </div>}
                  <div className="col-12 form-group mb-0">
                    <label htmlFor="boq-notes">Notes</label>
                    <textarea id="boq-notes" className="form-control" rows="2" value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} placeholder="Scope assumptions or estimate notes" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="card-title mb-0">BOQ items</h4>
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => updateForm("items", [...form.items, emptyItem()])}><i className="mdi mdi-plus" /> Add item</button>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead><tr><th style={{ minWidth: 190 }}>Material link (optional)</th><th style={{ minWidth: 190 }}>Description</th><th style={{ minWidth: 90 }}>Unit</th><th style={{ minWidth: 110 }}>Quantity</th><th style={{ minWidth: 130 }}>Rate</th><th style={{ minWidth: 140 }}>Amount</th><th /></tr></thead>
                    <tbody>
                      {form.items.map((item, index) => (
                        <tr key={index}>
                          <td><select className="form-control" aria-label={`Link material for item ${index + 1}`} value={item.material_id} onChange={(event) => updateItem(index, "material_id", event.target.value)}><option value="">No linked material</option>{materials.map((material) => <option key={material.id} value={material.id}>{material.material_name}</option>)}</select></td>
                          <td><input className="form-control" aria-label={`Item ${index + 1} description`} value={item.description} onChange={(event) => updateItem(index, "description", event.target.value)} maxLength="255" required /></td>
                          <td><input className="form-control" aria-label={`Item ${index + 1} unit`} value={item.unit} onChange={(event) => updateItem(index, "unit", event.target.value)} maxLength="50" placeholder="e.g. m³" required /></td>
                          <td><input className="form-control" aria-label={`Item ${index + 1} quantity`} type="number" min="0.001" step="0.001" value={item.quantity} onChange={(event) => updateItem(index, "quantity", event.target.value)} required /></td>
                          <td><input className="form-control" aria-label={`Item ${index + 1} rate`} type="number" min="0" step="0.01" value={item.rate} onChange={(event) => updateItem(index, "rate", event.target.value)} required /></td>
                          <td className="align-middle">{money(Number(item.quantity || 0) * Number(item.rate || 0))}</td>
                          <td className="align-middle"><button type="button" className="btn btn-sm btn-outline-danger" aria-label={`Remove item ${index + 1}`} disabled={form.items.length === 1} onClick={() => updateForm("items", form.items.filter((_, itemIndex) => itemIndex !== index))}><i className="mdi mdi-delete-outline" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end mt-3"><div className="text-right"><small className="text-muted d-block">Estimate total</small><h3 className="mb-0">{money(estimate)}</h3></div></div>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-4">
              <Link to={id ? `/boq/${id}` : "/boq"} className="btn btn-light mr-2">Cancel</Link>
              <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? "Saving..." : isEditing ? "Save revision" : "Save draft"}</button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

export function BOQDetails() {
  const { id } = useParams();
  const [boq, setBoq] = useState(null);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    axios.get(`/boq/index.php?id=${id}`)
      .then((response) => {
        if (!active) return;
        if (!response.data.status) throw new Error(response.data.message || "Unable to load BOQ.");
        setBoq(response.data.data);
        setError("");
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || requestError.message || "Unable to load BOQ.");
        }
      });
    return () => { active = false; };
  }, [id, refreshKey]);

  async function action(actionName) {
    setBusy(true);
    setError("");
    setNotice("");
    const payload = new FormData();
    payload.set("id", id);
    payload.set("comment", comment);
    try {
      const response = await axios.post(`/boq/index.php?action=${actionName}`, payload);
      if (!response.data.status) throw new Error(response.data.message || "Unable to update BOQ status.");
      setNotice(response.data.message || "BOQ status updated.");
      setComment("");
      setRefreshKey((current) => current + 1);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to update BOQ status.");
    } finally {
      setBusy(false);
    }
  }

  const estimate = Number(boq?.estimate_total || 0);
  return (
    <Layout>
      <div className="content-wrapper">
        <PageHeader title="BOQ Details">
          {boq && (
            <div className="d-flex flex-wrap mt-3 mt-md-0">
              {boq.status !== "pending" && <Link to={`/boq/edit/${id}`} className="btn btn-outline-primary mr-2">{boq.status === "draft" ? "Edit draft" : "Create revision"}</Link>}
              <Link to={`/boq/report?project_id=${boq.project_id}`} className="btn btn-outline-secondary">Budget vs Actual</Link>
            </div>
          )}
        </PageHeader>
        <ErrorMessage>{error}</ErrorMessage>
        {notice && <div className="alert alert-success" role="status">{notice}</div>}
        {!boq && !error && <div className="alert alert-info">Loading BOQ...</div>}
        {boq && <>
          <div className="card mb-4"><div className="card-body">
            <div className="d-flex flex-wrap justify-content-between align-items-start">
              <div><div className="d-flex align-items-center mb-2"><h3 className="mb-0 mr-3">{boq.title}</h3><StatusBadge status={boq.status} /></div><p className="text-muted mb-0">{boq.boq_no} · {boq.project_name} · Revision {boq.revision}</p></div>
              <h3 className="mt-3 mt-md-0">{money(estimate)}</h3>
            </div>
            {boq.notes && <p className="mt-3 mb-0">{boq.notes}</p>}
            {boq.status === "approved" && <div className="alert alert-success mt-3 mb-0">Approved{boq.approved_at ? ` on ${new Date(boq.approved_at.replace(" ", "T")).toLocaleString()}` : ""}. Any changes create a new draft revision and require approval again.</div>}
            {boq.status === "rejected" && boq.rejection_note && <div className="alert alert-warning mt-3 mb-0">Revision requested: {boq.rejection_note}</div>}
          </div></div>
          <div className="card mb-4"><div className="card-body">
            <h4 className="card-title">Estimate items</h4>
            <div className="table-responsive"><table className="table table-hover"><thead><tr><th>#</th><th>Description</th><th>Linked material</th><th>Unit</th><th className="text-right">Quantity</th><th className="text-right">Rate</th><th className="text-right">Amount</th></tr></thead>
              <tbody>{(boq.items || []).map((item, index) => <tr key={item.id || index}><td>{index + 1}</td><td>{item.description}</td><td>{item.material_name || "—"}</td><td>{item.unit}</td><td className="text-right">{Number(item.quantity).toLocaleString()}</td><td className="text-right">{money(item.rate)}</td><td className="text-right">{money(item.amount)}</td></tr>)}
                <tr><th colSpan="6" className="text-right">Estimate total</th><th className="text-right">{money(estimate)}</th></tr>
              </tbody>
            </table></div>
            <Link to={`/material_stock/material_purchase/create?project_id=${boq.project_id}`} className="btn btn-outline-info"><i className="mdi mdi-cart-plus mr-1" /> Record project material purchase</Link>
          </div></div>
          {boq.status === "draft" && <div className="card mb-4"><div className="card-body">
            <h4 className="card-title">Approval workflow</h4>
            <p className="text-muted">Submit this estimate for approval. An approver can approve it or request changes with a note.</p>
            <button className="btn btn-primary" disabled={busy} onClick={() => action("submit")}>{busy ? "Updating..." : "Submit for approval"}</button>
          </div></div>}
          {boq.status === "pending" && <div className="card mb-4"><div className="card-body">
            <h4 className="card-title">Review & approval</h4>
            <div className="form-group"><label htmlFor="boq-approval-comment">Approval or revision note</label><textarea id="boq-approval-comment" className="form-control" value={comment} onChange={(event) => setComment(event.target.value)} rows="2" placeholder="Required when requesting a revision" /></div>
            <button className="btn btn-success mr-2" disabled={busy} onClick={() => action("approve")}>Approve BOQ</button>
            <button className="btn btn-outline-danger" disabled={busy || !comment.trim()} onClick={() => action("reject")}>Request revision</button>
          </div></div>}
          <div className="card"><div className="card-body">
            <h4 className="card-title">Revision & approval history</h4>
            {!(boq.history || []).length ? <p className="text-muted mb-0">No previous revisions or approval actions.</p> : (
              <div className="table-responsive"><table className="table"><thead><tr><th>Revision / action</th><th>Details</th><th>By</th><th>Date</th></tr></thead><tbody>
                {(boq.history || []).map((entry) => <tr key={`${entry.entry_type}-${entry.id}`}><td>{entry.entry_type === "revision" ? `Revision ${entry.revision}` : entry.action}</td><td>{entry.change_note || entry.comment || "—"}</td><td>{entry.actor_name || "—"}</td><td>{entry.created_at ? new Date(entry.created_at.replace(" ", "T")).toLocaleString() : "—"}</td></tr>)}
              </tbody></table></div>
            )}
          </div></div>
        </>}
      </div>
    </Layout>
  );
}

export function BOQReport() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectId, setProjectId] = useState(new URLSearchParams(window.location.search).get("project_id") || "");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/projects/index.php")
      .then((response) => setProjects(response.data.data || []))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load projects."));
  }, []);

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      try {
        const response = await axios.get(`/boq/index.php?action=report${projectId ? `&project_id=${encodeURIComponent(projectId)}` : ""}`);
        if (!response.data.status && response.data.message !== "No records found") throw new Error(response.data.message || "Unable to load report.");
        setRows(response.data.data || []);
        setError("");
      } catch (requestError) {
        setError(requestError.response?.data?.message || requestError.message || "Unable to load report.");
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [projectId]);

  const totals = rows.reduce((result, row) => ({
    estimate: result.estimate + Number(row.estimate_total || 0),
    actual: result.actual + Number(row.actual_total || 0),
  }), { estimate: 0, actual: 0 });
  const variance = totals.estimate - totals.actual;

  return (
    <Layout>
      <div className="content-wrapper">
        <PageHeader title="Budget vs Actual">
          <Link to="/boq" className="btn btn-outline-secondary mt-3 mt-md-0">Back to BOQ list</Link>
        </PageHeader>
        <ErrorMessage>{error}</ErrorMessage>
        <div className="card mb-4"><div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-6 form-group mb-md-0"><label htmlFor="report-project">Project</label><select id="report-project" className="form-control" value={projectId} onChange={(event) => setProjectId(event.target.value)}><option value="">All projects</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></div>
            <div className="col-md-6 text-md-right mt-3 mt-md-0"><small className="text-muted d-block">Variance (estimate − actual)</small><h3 className={variance < 0 ? "text-danger mb-0" : "text-success mb-0"}>{money(variance)}</h3></div>
          </div>
        </div></div>
        <div className="row">
          {[
            ["Approved BOQ estimate", totals.estimate, "mdi-clipboard-check-outline"],
            ["Actual material spend", totals.actual, "mdi-package-variant"],
            ["Remaining estimate", variance, "mdi-scale-balance"],
          ].map(([label, value, icon]) => (
            <div className="col-md-4 mb-3" key={label}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="text-muted">{label}</small>
                      <h4 className="mt-2 mb-0">{money(value)}</h4>
                    </div>
                    <i className={`mdi ${icon} text-primary`} style={{ fontSize: 30 }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card"><div className="card-body">
          <h4 className="card-title">BOQ budget and project actuals</h4>
          <p className="text-muted">Actuals include partially received and received material purchases. Project actuals are allocated across approved BOQs in proportion to their estimate totals.</p>
          {loading ? <div className="alert alert-info">Loading report...</div> : <div className="table-responsive"><table className="table table-hover"><thead><tr><th>BOQ</th><th>Project</th><th>Revision</th><th>Estimate</th><th>Actual spend</th><th>Variance</th><th>Status</th></tr></thead><tbody>
            {rows.map((row) => {
              const rowVariance = Number(row.estimate_total || 0) - Number(row.actual_total || 0);
              return <tr key={row.id}><td><Link to={`/boq/${row.id}`}>{row.boq_no} · {row.title}</Link></td><td>{row.project_name}</td><td>{row.revision}</td><td>{money(row.estimate_total)}</td><td>{money(row.actual_total)}</td><td className={rowVariance < 0 ? "text-danger" : "text-success"}>{money(rowVariance)}</td><td><StatusBadge status={row.status} /></td></tr>;
            })}
            {!rows.length && <tr><td colSpan="7" className="text-center text-muted py-4">No BOQ estimates found for this filter.</td></tr>}
          </tbody></table></div>}
        </div></div>
      </div>
    </Layout>
  );
}
