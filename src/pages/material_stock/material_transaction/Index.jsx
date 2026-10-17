import { useEffect, useState } from 'react';
import axios from '../../../lib/axios.js';
import Layout from '../../Layout.jsx';
import { Link } from "react-router";
function MaterialTransaction() {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const res = await axios.get(
                '/material_transactions/index.php'
            );

            console.log(res.data);

            // API response অনুযায়ী data সেট করবে
            setTransactions(
                Array.isArray(res.data)
                    ? res.data
                    : res.data.data || []
            );
        } catch (error) {
            console.error(
                'Failed to fetch transactions:',
                error
            );
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <Layout>
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">
                        Material Transactions
                    </h3>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            Transaction List
                        </h4>
                        
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Material</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Reference</th>
                                        <th>Stock In</th>
                                        <th>Stock Out</th>
                                        <th>Balance</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions.length > 0 ? (
                                        transactions.map(
                                            (item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {item.material_name || '-'}
                                                    </td>
                                                    <td>
                                                        {item.transaction_date || '-'}
                                                    </td>
                                                    <td>
                                                        {item.trasaction_type || '-'}
                                                    </td>
                                                    <td>
                                                        {item.ref_type || '-'}
                                                        {item.ref_id
                                                            ? ` #${item.ref_id}`
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {item.quantity_in ?? 0}
                                                    </td>
                                                    <td>
                                                        {item.quantity_out ?? 0}
                                                    </td>
                                                    <td>
                                                        {item.balance_after ?? 0}
                                                    </td>
                                                    <td>
                                                        <Link
    to={`/material_stock/material_transaction/view/${item.id}`}
    className="btn btn-outline-primary btn-sm"
    title="View Transaction"
>
    <i className="mdi mdi-eye-outline"></i>
</Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center"
                                            >
                                                No transactions found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default MaterialTransaction;