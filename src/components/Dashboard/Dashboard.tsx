import React from 'react';
import { useTransaction } from '../../context/TransactionContext';
import SummaryCards from './SummaryCards';
import ChartsSection from './ChartsSection';
import RecentTransactions from './RecentTransactions';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { getFinancialSummary, transactions } = useTransaction();
  const summary = getFinancialSummary();

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Financial Overview</h2>
        <p className="dashboard-subtitle">
          Track your financial health at a glance
        </p>
      </div>

      <div className="dashboard-content">
        <SummaryCards summary={summary} />
        <ChartsSection transactions={transactions} />
        <RecentTransactions transactions={transactions.slice(-5)} />
      </div>
    </div>
  );
};

export default Dashboard;