import React from 'react';
import { Transaction } from '../../types';

interface ChartsSectionProps {
  transactions: Transaction[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ transactions }) => {
  return (
    <div className="charts-section">
      <h3 className="section-title">Financial Insights</h3>
      <div className="grid grid-cols-2">
        <div className="glass p-6">
          <h4>Income vs Expenses</h4>
          <p>Chart coming soon...</p>
        </div>
        <div className="glass p-6">
          <h4>Category Breakdown</h4>
          <p>Chart coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;