
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from '../../../lib/axios.js';
import Layout from '../../Layout.jsx';

function TransactionView() {
    const { id } = useParams();

    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                setLoading(true);
                setError('');

                const res = await axios.get(
                    `/material_transaction/single.php?id=${id}`
                );

                // API response array অথবা {data: [...]} হতে পারে
                const responseData = res.data;

                let item = null;

                if (Array.isArray(responseData)) {
                    item = responseData[0] || null;
                } else if (Array.isArray(responseData?.data)) {
                    item = responseData.data[0] || null;
                } else if (responseData?.data && !Array.isArray(responseData.data)) {
                    item = responseData.data;
                } else if (responseData?.id) {
                    item = responseData;
                }

                if (!item) {
                    setError('Transaction not found.');
                    return;
                }

                setTransaction(item);
            } catch (err) {
                console.error('Failed to fetch transaction:', err);
                setError('Failed to load transaction details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTransaction();
        } else {
            setError('Transaction ID is missing.');
            setLoading(false);
        }
    }, [id]);

    const formatDate = (date) => {
        if (!date) return '—';

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const InfoItem = ({ label, value }) => (
        <div className="col-md-6 mb-4">
            <small className="text-muted d-block mb-1">
                {label}
            </small>
            <div className="font-weight-semibold text-dark">
                {value === null || value === undefined || value === ''
                    ? '—'
                    : value}
            </div>
        </div>
    );

    const transactionType = (
        Number(transaction?.transaction_type) === 1
            ? 'stock in'
            : Number(transaction?.transaction_type) === 2
              ? 'stock out'
              : transaction?.transaction_type || ''
    ).toString().toLowerCase();

    const isStockIn =
        transactionType.includes('in') ||
        transactionType.includes('purchase');

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <h3 className="page-title">
                            Transaction Details
                        </h3>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="breadcrumb-item">
                                    <Link to="/materials/transactions">
                                        Material Transactions
                                    </Link>
                                </li>

                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Details
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <Link
                        to="/materials/transactions"
                        className="btn btn-outline-secondary btn-sm"
                    >
                        <i className="mdi mdi-arrow-left mr-1"></i>
                        Back to List
                    </Link>
                </div>

                {loading ? (
                    <div className="card">
                        <div className="card-body text-center py-5">
                            <div
                                className="spinner-border text-primary mb-3"
                                role="status"
                            >
                                <span className="sr-only">
                                    Loading...
                                </span>
                            </div>

                            <p className="text-muted mb-0">
                                Loading transaction details...
                            </p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="card">
                        <div className="card-body text-center py-5">
                            <i className="mdi mdi-alert-circle-outline mdi-48px text-danger"></i>

                            <h5 className="mt-3">
                                Unable to Load Transaction
                            </h5>

                            <p className="text-muted">
                                {error}
                            </p>

                            <Link
                                to="/materials/transactions"
                                className="btn btn-primary btn-sm"
                            >
                                Back to Transactions
                            </Link>
                        </div>
                    </div>
                ) : transaction ? (
                    <>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <p className="text-muted mb-2">
                                                    Transaction ID
                                                </p>

                                                <h3 className="mb-0">
                                                    #{transaction.id}
                                                </h3>
                                            </div>

                                            <div className="bg-light rounded p-3">
                                                <i className="mdi mdi-swap-horizontal mdi-24px text-primary"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <p className="text-muted mb-2">
                                            Quantity In
                                        </p>

                                        <h3 className="text-success mb-0">
                                            +{transaction.quantity_in ?? 0}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <p className="text-muted mb-2">
                                            Quantity Out
                                        </p>

                                        <h3 className="text-danger mb-0">
                                            -{transaction.quantity_out ?? 0}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header bg-white">
                                <h4 className="card-title mb-0">
                                    <i className="mdi mdi-information-outline mr-2 text-primary"></i>
                                    General Information
                                </h4>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <InfoItem
                                        label="Material Name"
                                        value={transaction.material_name}
                                    />

                                    <InfoItem
                                        label="Transaction Date"
                                        value={formatDate(
                                            transaction.transaction_date
                                        )}
                                    />

                                    <InfoItem
                                        label="Transaction Type"
                                        value={
                                            <span
                                                className={`badge ${
                                                    isStockIn
                                                        ? 'badge-success'
                                                        : 'badge-danger'
                                                }`}
                                            >
                                                {Number(transaction.transaction_type) === 1
                                                    ? 'Stock In'
                                                    : Number(transaction.transaction_type) === 2
                                                      ? 'Stock Out'
                                                      : transaction.transaction_type || '—'}
                                            </span>
                                        }
                                    />

                                    <InfoItem
                                        label="Project"
                                        value={transaction.project_name}
                                    />

                                    <InfoItem
                                        label="Reference Type"
                                        value={transaction.reference_type_label || transaction.ref_type}
                                    />

                                    <InfoItem
                                        label="Reference ID"
                                        value={transaction.reference_number || transaction.ref_id}
                                    />

                                    <InfoItem
                                        label="Balance After Transaction"
                                        value={transaction.balance_after}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card mt-3">
                            <div className="card-header bg-white">
                                <h4 className="card-title mb-0">
                                    <i className="mdi mdi-clipboard-text-outline mr-2 text-primary"></i>
                                    Transaction Notes
                                </h4>
                            </div>

                            <div className="card-body">
                                <p className="mb-0 text-muted">
                                    {transaction.notes ||
                                        'No notes available for this transaction.'}
                                </p>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <Link
                                to="/materials/transactions"
                                className="btn btn-light"
                            >
                                <i className="mdi mdi-arrow-left mr-1"></i>
                                Back to List
                            </Link>
                        </div>
                    </>
                ) : null}
            </div>
        </Layout>
    );
}

export default TransactionView;
