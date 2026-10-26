import Layout from "../../Layout.jsx";
import { Link } from "react-router";
import axios from "../../../lib/axios.js";
import { useEffect, useState } from "react";

const createPurchaseItem = () => ({
  material_id: "",
  quantity: "",
  unit_price: "",
});

function MaterialsPurchaseCreate() {
  const [project, setProject] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [material, setMaterial] = useState([]);
  const [projectId, setProjectId] = useState(
    new URLSearchParams(window.location.search).get("project_id") || ""
  );
  const [items, setItems] = useState([createPurchaseItem()]);
  const [purchaseNo, setPurchaseNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const totalAmount = items.reduce(
    (total, item) => total + Number(item.quantity || 0) * Number(item.unit_price || 0),
    0
  );

  async function fetchProject() {
    const res = await axios.get("projects/index.php");
    if (res.data.data) {
      setProject(res.data.data);
    }
  }

  async function fetchPoNo() {
    const res = await axios.get("material_purchase/get_po_no.php");
    if (res.data.pur_no) {
      setPurchaseNo(res.data.pur_no);
    }
  }

  async function fetchSupplier() {
    const res = await axios.get("supplier/index.php");
    if (res.data.data) {
      setSupplier(res.data.data);
    }
  }

  async function fetchMaterial() {
    const res = await axios.get("material_list/index.php");
    if (res.data.data) {
      setMaterial(res.data.data);
    }
  }

  useEffect(() => {
    fetchPoNo();
    fetchProject();
    fetchMaterial();
    fetchSupplier();
  }, []);

  function updateItem(index, field, value) {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  }

  function removeItem(index) {
    setItems((currentItems) => currentItems.filter((_, itemIndex) => itemIndex !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    const hasInvalidItem = items.some((item) => {
      const quantity = Number(item.quantity);
      const unitPrice = Number(item.unit_price);
      return (
        !item.material_id ||
        !Number.isFinite(quantity) ||
        quantity <= 0 ||
        !Number.isInteger(quantity) ||
        !Number.isFinite(unitPrice) ||
        unitPrice < 0 ||
        !Number.isInteger(unitPrice)
      );
    });

    if (items.length === 0 || hasInvalidItem) {
      setFeedback({
        type: "danger",
        message:
          "Add at least one material and enter a positive whole-number quantity and whole-number unit price for each item.",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("total_amount", totalAmount.toFixed(2));
    formData.set(
      "items",
      JSON.stringify(
        items.map((item) => ({
          material_id: item.material_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }))
      )
    );

    setSubmitting(true);
    try {
      const res = await axios.post("/material_purchase/create.php", formData);
      if (res.data.status) {
        setFeedback({
          type: "success",
          message: res.data.message || "Material purchase created successfully.",
        });
        if (projectId) {
          window.location.href = `/projects_clients/projects/view/${projectId}`;
        }
      } else {
        setFeedback({
          type: "danger",
          message: res.data.message || "Unable to create material purchase.",
        });
      }
    } catch (error) {
      setFeedback({
        type: "danger",
        message:
          error.response?.data?.message ||
          "Unable to create material purchase. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Create Material Purchase</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <i
                  className="mdi mdi-folder-multiple menu-icon pr-2"
                  style={{ color: "#c0b553" }}
                ></i>
                <Link to="/material_stock/material_purchase" style={{ color: "black" }}>
                  Material Purchase List
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create Material Purchase
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <p className="card-description fw-bold">Material Purchase Info</p>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="form-purchase-number-1">Purchase Number</label>
                      <input id="form-purchase-number-1"
                        placeholder="Purchase Number"
                        name="purchase_no"
                        type="text"
                        className="form-control"
                        value={purchaseNo}
                        readOnly
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="form-purchase-date-2">Purchase Date</label>
                      <input id="form-purchase-date-2"
                        aria-label="Purchase Date"
                        name="purchase_date"
                        type="date"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="form-project-id-3">Project</label>
                      <select id="form-project-id-3"
                        name="project_id"
                        className="form-control"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select Project
                        </option>
                        {project.map((projectItem) => (
                          <option key={projectItem.id} value={projectItem.id}>
                            {projectItem.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="form-supplier-id-4">Supplier</label>
                      <select id="form-supplier-id-4" name="supplier_id" className="form-control" defaultValue="">
                        <option value="" disabled>
                          Select Supplier
                        </option>
                        {supplier.map((supplierItem) => (
                          <option key={supplierItem.id} value={supplierItem.id}>
                            {supplierItem.supplier_name} ({supplierItem.company_name})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="form-status-6">Material Purchase Status</label>
                      <select id="form-status-6"
                        name="status"
                        className="form-control"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Material Purchase Status
                        </option>
                        <option value="1">Draft</option>
                        <option value="2">Pending</option>
                        <option value="3">Ordered</option>
                        <option value="4">Partially Received</option>
                        <option value="5">Received</option>
                        <option value="6">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="form-total-amount-5">Total Amount</label>
                      <input id="form-total-amount-5"
                        name="total_amount"
                        type="number"
                        className="form-control"
                        value={totalAmount.toFixed(2)}
                        placeholder="Total Amount"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="card-description fw-bold mb-0">Purchase Items</p>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setItems((currentItems) => [...currentItems, createPurchaseItem()])}
                  >
                    <i className="mdi mdi-plus"></i> Add Item
                  </button>
                </div>
                <div className="table-responsive mb-4">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Line Total</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => {
                        const lineTotal =
                          Number(item.quantity || 0) * Number(item.unit_price || 0);

                        return (
                          <tr key={index}>
                            <td>
                              <select
                                aria-label={`Material for item ${index + 1}`}
                                className="form-control"
                                value={item.material_id}
                                onChange={(e) => updateItem(index, "material_id", e.target.value)}
                                required
                              >
                                <option value="" disabled>
                                  Select Material
                                </option>
                                {material.map((materialItem) => (
                                  <option key={materialItem.id} value={materialItem.id}>
                                    {materialItem.material_name}
                                    {materialItem.unit_name ? ` (${materialItem.unit_name})` : ""}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                aria-label={`Quantity for item ${index + 1}`}
                                type="number"
                                min="1"
                                step="1"
                                className="form-control"
                                value={item.quantity}
                                onChange={(e) => updateItem(index, "quantity", e.target.value)}
                                placeholder="Quantity"
                                required
                              />
                            </td>
                            <td>
                              <input
                                aria-label={`Unit price for item ${index + 1}`}
                                type="number"
                                min="0"
                                step="1"
                                className="form-control"
                                value={item.unit_price}
                                onChange={(e) => updateItem(index, "unit_price", e.target.value)}
                                placeholder="Unit Price"
                                required
                              />
                            </td>
                            <td>{lineTotal.toFixed(2)}</td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeItem(index)}
                                disabled={items.length === 1}
                                aria-label={`Remove item ${index + 1}`}
                              >
                                <i className="mdi mdi-delete-outline"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {feedback.message && (
                  <div className={`alert alert-${feedback.type}`} role="alert" aria-live="polite">
                    {feedback.message}
                  </div>
                )}
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group text-center">
                      <button className="btn btn-primary" type="submit" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Material Purchase"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MaterialsPurchaseCreate;
