import React from 'react';
import { Transaction } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income': return 'var(--color-income)';
      case 'expense': return 'var(--color-expense)';
      case 'investment': return 'var(--color-investment)';
      case 'loan': return 'var(--color-loan)';
      default: return 'var(--text-secondary)';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="recent-transactions">
      <h3 className="section-title">Recent Transactions</h3>
      <div className="glass p-6">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions yet. Start by adding your first transaction!</p>
          </div>
        ) : (
          <div className="transactions-list">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-header">
                    <span 
                      className="transaction-type"
                      style={{ color: getTypeColor(transaction.type) }}
                    >
                      {transaction.type.toUpperCase()}
                    </span>
                    <span className="transaction-date">
                      {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                    </span>
                  </div>
                  <h4 className="transaction-description">{transaction.description}</h4>
                  <p className="transaction-category">{transaction.category}</p>
                </div>
                <div className="transaction-amount">
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;