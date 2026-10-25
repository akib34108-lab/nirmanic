import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import axios from "../lib/axios.js";
import Layout from "./Layout.jsx";

const dashboardSources = [
  { key: "projects", path: "/projects/index.php" },
  { key: "clients", path: "/clients/index.php" },
  { key: "employees", path: "/employees/index.php" },
  { key: "inventory", path: "/material_inventory/index.php" },
  { key: "purchases", path: "/material_purchase/index.php" },
  { key: "transactions", path: "/material_transaction/index.php" },
];

const projectStatusLabels = {
  1: "Planning",
  2: "Upcoming",
  3: "Ongoing",
  4: "On Hold",
  5: "Delayed",
  6: "Completed",
  7: "Cancelled",
};

const purchaseStatusLabels = {
  1: "Draft",
  2: "Pending",
  3: "Ordered",
  4: "Partially Received",
  5: "Received",
  6: "Cancelled",
};

const transactionTypeLabels = {
  1: "Stock In",
  2: "Stock Out",
};

const dismissedUpdateStorageKey = "nirmanic-dismissed-update-build";
const dismissedLatestVersionStorageKey = "nirmanic-dismissed-latest-version";
const dismissButtonStyle = {
  width: "32px",
  height: "32px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "1px solid currentColor",
  borderRadius: "50%",
  background: "#fff",
  color: "#0d4876",
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: 1,
  cursor: "pointer",
};

function rowsFromResponse(response) {
  const data = response.data?.data;
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === "object") {
    return [data];
  }
  if (response.data?.status === false) {
    if (/no records found/i.test(response.data.message || "")) {
      return [];
    }
    throw new Error(response.data.message || "The server could not load this data.");
  }
  return [];
}

function parseBudget(value) {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const match = String(value)
    .trim()
    .replace(/,/g, "")
    .match(/^(?:৳\s*|BDT\s*)?(\d+(?:\.\d+)?)\s*(cr|crore|crores|lakh|lac|k)?$/i);
  if (!match) {
    return null;
  }

  const multiplier =
    {
      cr: 10000000,
      crore: 10000000,
      crores: 10000000,
      lakh: 100000,
      lac: 100000,
      k: 1000,
    }[(match[2] || "").toLowerCase()] || 1;
  const amount = Number(match[1]) * multiplier;
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

function formatMoney(amount, maximumFractionDigits = 0) {
  return `৳${Number(amount || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  })}`;
}

function formatDate(date) {
  if (!date) {
    return "Date not set";
  }
  const parsedDate = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsedDate.getTime())
    ? date
    : parsedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

function getUserName() {
  try {
    const userData = JSON.parse(localStorage.getItem("userdata") || "null");
    return userData?.name || userData?.employee_name || "there";
  } catch {
    return "there";
  }
}

function Dashboard() {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";
  const [dashboardData, setDashboardData] = useState({
    projects: [],
    clients: [],
    employees: [],
    inventory: [],
    purchases: [],
    transactions: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateCheckComplete, setUpdateCheckComplete] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateNoticeDismissed, setUpdateNoticeDismissed] = useState(false);
  const [availableBuildId, setAvailableBuildId] = useState("");
  const [userName] = useState(getUserName);
  const [monthAnchor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const fetchDashboardData = useCallback(async () => {
    const results = await Promise.allSettled(
      dashboardSources.map(async ({ key, path }) => {
        const response = await axios.get(path);
        return [key, rowsFromResponse(response)];
      })
    );

    const nextData = {};
    const nextErrors = {};
    results.forEach((result, index) => {
      const key = dashboardSources[index].key;
      if (result.status === "fulfilled") {
        nextData[result.value[0]] = result.value[1];
      } else {
        nextErrors[key] =
          result.reason?.response?.data?.message ||
          result.reason?.message ||
          "Unable to load data.";
        console.error(`Dashboard ${key} request failed:`, result.reason);
      }
    });

    return { data: nextData, errors: nextErrors };
  }, []);

  useEffect(() => {
    let isCurrent = true;
    fetchDashboardData().then(({ data, errors: requestErrors }) => {
      if (!isCurrent) {
        return;
      }
      setDashboardData((currentData) => ({ ...currentData, ...data }));
      setErrors(requestErrors);
      setLoading(false);
    });

    return () => {
      isCurrent = false;
    };
  }, [fetchDashboardData]);

  useEffect(() => {
    let isCurrent = true;

    async function checkForUpdates() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}version.json?t=${Date.now()}`,
          { cache: "no-store" }
        );
        if (!response.ok) {
          throw new Error(`Version check failed with status ${response.status}.`);
        }
        const version = await response.json();
        if (isCurrent && typeof version.buildId === "string") {
          const hasUpdate = version.buildId !== import.meta.env.VITE_APP_BUILD_ID;
          const dismissedBuildId = localStorage.getItem(dismissedUpdateStorageKey);
          const dismissedLatestBuildId = localStorage.getItem(dismissedLatestVersionStorageKey);
          setAvailableBuildId(hasUpdate ? version.buildId : "");
          setUpdateAvailable(hasUpdate && dismissedBuildId !== version.buildId);
          setUpdateNoticeDismissed(
            hasUpdate
              ? dismissedBuildId === version.buildId
              : dismissedLatestBuildId === import.meta.env.VITE_APP_BUILD_ID
          );
          setUpdateCheckComplete(true);
        }
      } catch (error) {
        console.error("Dashboard update check failed:", error);
      }
    }

    checkForUpdates();
    const intervalId = window.setInterval(checkForUpdates, 5 * 60 * 1000);
    window.addEventListener("focus", checkForUpdates);

    return () => {
      isCurrent = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", checkForUpdates);
    };
  }, []);

  function dismissUpdateNotice() {
    setUpdateAvailable(false);
    setUpdateNoticeDismissed(true);
    try {
      if (availableBuildId) {
        localStorage.setItem(dismissedUpdateStorageKey, availableBuildId);
      } else {
        localStorage.setItem(
          dismissedLatestVersionStorageKey,
          import.meta.env.VITE_APP_BUILD_ID
        );
      }
    } catch (error) {
      console.error("Unable to save dismissed update notice:", error);
    }
  }

  const stats = useMemo(() => {
    const projects = dashboardData.projects;
    const budgetedProjects = projects
      .map((project) => ({ ...project, parsedBudget: parseBudget(project.budget) }))
      .filter((project) => project.parsedBudget !== null);
    const spentAmount = dashboardData.purchases.reduce(
      (total, purchase) => total + Number(purchase.total_amount || 0),
      0
    );
    const budgetedProjectIds = new Set(budgetedProjects.map((project) => String(project.id)));
    const budgetedSpend = dashboardData.purchases.reduce(
      (total, purchase) =>
        budgetedProjectIds.has(String(purchase.project_id))
          ? total + Number(purchase.total_amount || 0)
          : total,
      0
    );
    const lowStockItems = dashboardData.inventory.filter(
      (item) =>
        Number(item.current_stock || 0) <= 0 ||
        Number(item.current_stock || 0) <= Number(item.minimum_stock || 0)
    );

    return {
      projects: projects.length,
      activeProjects: projects.filter((project) => Number(project.status) === 3).length,
      clients: dashboardData.clients.length,
      employees: dashboardData.employees.length,
      inventoryItems: dashboardData.inventory.length,
      lowStockItems,
      totalBudget: budgetedProjects.reduce((total, project) => total + project.parsedBudget, 0),
      projectsWithBudget: budgetedProjects.length,
      spentAmount,
      remainingBudget: budgetedProjects.reduce((total, project) => total + project.parsedBudget, 0) - budgetedSpend,
    };
  }, [dashboardData]);

  const monthlySpend = useMemo(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months = Array.from({ length: 6 }, (_, index) => {
      const monthOffset = monthAnchor.month - (5 - index);
      const monthIndex = ((monthOffset % 12) + 12) % 12;
      const monthYear = monthAnchor.year + Math.floor(monthOffset / 12);
      return {
        key: `${monthYear}-${String(monthIndex + 1).padStart(2, "0")}`,
        label: monthNames[monthIndex],
        total: 0,
      };
    });
    const monthsByKey = new Map(months.map((month) => [month.key, month]));

    dashboardData.purchases.forEach((purchase) => {
      const monthKey = String(purchase.purchase_date || "").slice(0, 7);
      const month = monthsByKey.get(monthKey);
      if (month) {
        month.total += Number(purchase.total_amount || 0);
      }
    });

    return months;
  }, [dashboardData.purchases, monthAnchor]);

  const maxMonthlySpend = Math.max(...monthlySpend.map((month) => month.total), 1);
  const recentProjects = [...dashboardData.projects]
    .sort((first, second) => {
      const dateComparison = String(second.start_date || "").localeCompare(String(first.start_date || ""));
      return dateComparison || Number(second.id || 0) - Number(first.id || 0);
    })
    .slice(0, 5);
  const recentPurchases = [...dashboardData.purchases]
    .sort((first, second) => {
      const dateComparison = String(second.purchase_date || "").localeCompare(String(first.purchase_date || ""));
      return dateComparison || Number(second.id || 0) - Number(first.id || 0);
    })
    .slice(0, 5);
  const recentTransactions = [...dashboardData.transactions].slice(0, 6);

  const unavailableSections = Object.keys(errors).map((key) => {
    const labels = {
      projects: "projects",
      clients: "clients",
      employees: "employees",
      inventory: "inventory",
      purchases: "material purchases",
      transactions: "material transactions",
    };
    return `${labels[key]}: ${errors[key]}`;
  });

  return (
    <Layout>
      <div className="content-wrapper">
        <div className="page-header flex-wrap">
          <div>
            <h3 className="page-title mb-1">{greeting}, {userName}</h3>
            <p className="text-muted mb-0">
              Your Nirmanic construction operations at a glance.
            </p>
          </div>
          <div className="d-flex flex-wrap mt-3 mt-md-0">
            <Link to="/projects_clients/projects/create" className="btn btn-primary mr-2">
              <i className="mdi mdi-plus mr-1"></i> New Project
            </Link>
            <Link to="/material_stock/material_purchase/create" className="btn btn-info">
              <i className="mdi mdi-cart-plus mr-1"></i> New Purchase
            </Link>
          </div>
        </div>

        {updateAvailable && (
          <div className="alert alert-info d-flex flex-wrap align-items-center" role="status">
            <span className="mr-auto"><i className="mdi mdi-update mr-2"></i>Update version is available.</span>
            <button type="button" className="btn btn-sm btn-primary mt-2 mt-sm-0 mr-2" onClick={() => window.location.reload()}>
              Reload to update
            </button>
            <button
              type="button"
              className="btn"
              aria-label="Dismiss update notification"
              title="Dismiss update notification"
              onClick={dismissUpdateNotice}
              style={dismissButtonStyle}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {updateCheckComplete &&
          !updateAvailable &&
          !updateNoticeDismissed && (
          <div className="alert alert-success d-flex align-items-center" role="status">
            <span className="mr-auto">
              <i className="mdi mdi-check-circle-outline mr-2"></i>
              No updates available. You’re using the latest version.
            </span>
            <button
              type="button"
              className="btn"
              aria-label="Dismiss version status"
              title="Dismiss version status"
              onClick={dismissUpdateNotice}
              style={dismissButtonStyle}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {unavailableSections.length > 0 && (
          <div className="alert alert-warning" role="alert">
            Some dashboard data could not be loaded.{" "}
            {unavailableSections.join(" · ")}
          </div>
        )}

        <div className="row">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Total Projects</p>
                    <h3 className="mb-1">{loading ? "—" : stats.projects}</h3>
                    <small className="text-success">{stats.activeProjects} ongoing</small>
                  </div>
                  <div className="text-primary"><i className="mdi mdi-domain h2"></i></div>
                </div>
                <Link to="/projects_clients/projects" className="small d-inline-block mt-3">
                  View projects <i className="mdi mdi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Material Purchase Spend</p>
                    <h3 className="mb-1">{loading ? "—" : formatMoney(stats.spentAmount)}</h3>
                    <small className="text-muted">{stats.projectsWithBudget} projects with numeric budgets</small>
                  </div>
                  <div className="text-info"><i className="mdi mdi-cart-outline h2"></i></div>
                </div>
                <Link to="/material_stock/material_purchase" className="small d-inline-block mt-3">
                  View purchases <i className="mdi mdi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Project Budgets</p>
                    <h3 className="mb-1">{loading ? "—" : formatMoney(stats.totalBudget)}</h3>
                    <small className={stats.remainingBudget < 0 ? "text-danger" : "text-muted"}>
                      {formatMoney(stats.remainingBudget)} remaining
                    </small>
                  </div>
                  <div className="text-success"><i className="mdi mdi-cash-multiple h2"></i></div>
                </div>
                <Link to="/projects_clients/projects" className="small d-inline-block mt-3">
                  Budget overview <i className="mdi mdi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-muted mb-1">Low Stock Alerts</p>
                    <h3 className={`mb-1 ${stats.lowStockItems.length ? "text-danger" : ""}`}>
                      {loading ? "—" : stats.lowStockItems.length}
                    </h3>
                    <small className="text-muted">{stats.inventoryItems} project inventory records</small>
                  </div>
                  <div className="text-warning"><i className="mdi mdi-alert-circle-outline h2"></i></div>
                </div>
                <Link to="/material_stock/material_inventory" className="small d-inline-block mt-3">
                  Check inventory <i className="mdi mdi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h4 className="card-title mb-1">Material Purchase Trend</h4>
                    <p className="text-muted mb-0">Recorded purchase totals by month</p>
                  </div>
                  <Link to="/material_stock/material_purchase" className="btn btn-outline-primary btn-sm">
                    All purchases
                  </Link>
                </div>
                {dashboardData.purchases.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    {loading ? "Loading purchase history..." : "No material purchases recorded yet."}
                  </div>
                ) : (
                  <div className="d-flex align-items-end justify-content-around" style={{ height: "220px" }}>
                    {monthlySpend.map((month) => (
                      <div key={month.key} className="d-flex flex-column align-items-center justify-content-end h-100 mx-1" style={{ width: "14%" }}>
                        <small className="text-muted mb-1">
                          {month.total ? formatMoney(month.total) : ""}
                        </small>
                        <div
                          className="bg-primary rounded-top"
                          title={`${month.label}: ${formatMoney(month.total)}`}
                          style={{
                            width: "min(44px, 85%)",
                            height: `${Math.max(month.total ? 12 : 4, (month.total / maxMonthlySpend) * 145)}px`,
                            opacity: month.total ? 1 : 0.18,
                          }}
                        ></div>
                        <small className="text-muted mt-2">{month.label}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-4 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <h4 className="card-title">Team & Clients</h4>
                <div className="d-flex justify-content-between border-bottom py-3">
                  <span className="text-muted">Employees</span>
                  <strong>{loading ? "—" : stats.employees}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom py-3">
                  <span className="text-muted">Clients</span>
                  <strong>{loading ? "—" : stats.clients}</strong>
                </div>
                <div className="d-flex justify-content-between py-3">
                  <span className="text-muted">Completed Projects</span>
                  <strong>
                    {loading
                      ? "—"
                      : dashboardData.projects.filter((project) => Number(project.status) === 6).length}
                  </strong>
                </div>
                <div className="d-flex mt-3">
                  <Link to="/human_resource/employees" className="btn btn-outline-secondary btn-sm mr-2">
                    Employees
                  </Link>
                  <Link to="/projects_clients/clients" className="btn btn-outline-secondary btn-sm">
                    Clients
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="card-title mb-0">Projects Overview</h4>
                  <Link to="/projects_clients/projects" className="small">All projects</Link>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProjects.length ? recentProjects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            <Link to={`/projects_clients/projects/view/${project.id}`}>
                              {project.name || "Untitled project"}
                            </Link>
                            <small className="d-block text-muted">{project.project_code || "No code"}</small>
                          </td>
                          <td>{projectStatusLabels[project.status] || "Unknown"}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 mr-2" style={{ height: "6px", minWidth: "45px" }}>
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${Math.min(100, Math.max(0, Number(project.progress || 0)))}%` }}
                                  aria-valuenow={Number(project.progress || 0)}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <small>{Number(project.progress || 0)}%</small>
                            </div>
                          </td>
                          <td>{parseBudget(project.budget) === null ? project.budget || "—" : formatMoney(parseBudget(project.budget))}</td>
                        </tr>
                      )) : (
                        <tr><td colSpan="4" className="text-center text-muted py-4">
                          {loading ? "Loading projects..." : "No projects found."}
                        </td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="card-title mb-0">Low Stock</h4>
                  <Link to="/material_stock/material_inventory" className="small">Inventory</Link>
                </div>
                {stats.lowStockItems.length ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead><tr><th>Material</th><th>Project</th><th>Available</th></tr></thead>
                      <tbody>
                        {stats.lowStockItems.slice(0, 6).map((item) => (
                          <tr key={item.id}>
                            <td>{item.material_name || "Material"}</td>
                            <td>{item.name || "—"}</td>
                            <td className="text-danger">{Number(item.current_stock || 0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted py-4 mb-0 text-center">
                    {loading ? "Loading inventory..." : "No low-stock materials."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="card-title mb-0">Recent Material Purchases</h4>
                  <Link to="/material_stock/material_purchase" className="small">All purchases</Link>
                </div>
                {recentPurchases.length ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead><tr><th>Purchase</th><th>Date</th><th>Status</th><th className="text-right">Amount</th></tr></thead>
                      <tbody>
                        {recentPurchases.map((purchase) => (
                          <tr key={purchase.id}>
                            <td>
                              <Link to={`/material_stock/material_purchase/edit/${purchase.id}`}>
                                {purchase.purchase_no || `#${purchase.id}`}
                              </Link>
                              <small className="d-block text-muted">{purchase.name || "No project"}</small>
                            </td>
                            <td>{formatDate(purchase.purchase_date)}</td>
                            <td>{purchaseStatusLabels[purchase.status] || "Unknown"}</td>
                            <td className="text-right">{formatMoney(purchase.total_amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted py-4 mb-0 text-center">
                    {loading ? "Loading purchases..." : "No material purchases recorded."}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card w-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="card-title mb-0">Recent Stock Activity</h4>
                  <Link to="/material_stock/material_transaction" className="small">All transactions</Link>
                </div>
                {recentTransactions.length ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead><tr><th>Material</th><th>Project</th><th>Type</th><th>Date</th><th className="text-right">Quantity</th></tr></thead>
                      <tbody>
                        {recentTransactions.map((transaction) => {
                          const isStockIn = Number(transaction.transaction_type) === 1;
                          const quantity = isStockIn
                            ? transaction.quantity_in
                            : transaction.quantity_out;
                          return (
                            <tr key={transaction.id}>
                              <td>{transaction.material_name || "Material"}</td>
                              <td>{transaction.project_name || "—"}</td>
                              <td className={isStockIn ? "text-success" : "text-warning"}>
                                {transactionTypeLabels[transaction.transaction_type] || "Transaction"}
                              </td>
                              <td>{formatDate(transaction.transaction_date)}</td>
                              <td className="text-right">{Number(quantity || 0)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted py-4 mb-0 text-center">
                    {loading ? "Loading transactions..." : "No stock transactions recorded."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
