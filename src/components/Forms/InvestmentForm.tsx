import React, { useState } from 'react';
import { useTransaction } from '../../context/TransactionContext';

const InvestmentForm: React.FC = () => {
  const { addTransaction } = useTransaction();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    investmentType: 'mutual_fund' as 'sip' | 'stock' | 'mutual_fund' | 'crypto' | 'other',
    units: '',
    unitPrice: '',
    currentValue: '',
    isRecurring: false
  });

  const investmentCategories = [
    'Equity Mutual Funds',
    'Debt Mutual Funds',
    'Hybrid Mutual Funds',
    'Index Funds',
    'ETFs',
    'Individual Stocks',
    'Cryptocurrency',
    'Fixed Deposits',
    'Public Provident Fund (PPF)',
    'Employee Provident Fund (EPF)',
    'National Savings Certificate (NSC)',
    'Gold',
    'Real Estate',
    'Bonds',
    'Government Securities',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      const investmentData: any = {
        type: 'investment',
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
        isRecurring: formData.isRecurring,
        investmentType: formData.investmentType
      };

      // Add optional fields if provided
      if (formData.units) investmentData.units = parseFloat(formData.units);
      if (formData.unitPrice) investmentData.unitPrice = parseFloat(formData.unitPrice);
      if (formData.currentValue) investmentData.currentValue = parseFloat(formData.currentValue);

      addTransaction(investmentData);
      
      // Reset form
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        investmentType: 'mutual_fund',
        units: '',
        unitPrice: '',
        currentValue: '',
        isRecurring: false
      });
      
      alert('Investment added successfully!');
    }
  };

  return (
    <div className="form-container fade-in">
      <div className="form-header">
        <h2>Add Investment</h2>
        <p>Track your investment portfolio and performance</p>
      </div>
      
      <form onSubmit={handleSubmit} className="glass p-6">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="amount">Investment Amount (₹)</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              placeholder="Enter investment amount"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="investmentType">Investment Type</label>
            <select
              id="investmentType"
              value={formData.investmentType}
              onChange={(e) => setFormData({ ...formData, investmentType: e.target.value as any })}
              required
            >
              <option value="mutual_fund">Mutual Fund</option>
              <option value="sip">SIP</option>
              <option value="stock">Stock</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="category">Investment Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select investment category</option>
              {investmentCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="description">Description/Fund Name</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Enter fund name or investment description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Investment Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="units">Units/Quantity (Optional)</label>
            <input
              type="number"
              id="units"
              value={formData.units}
              onChange={(e) => setFormData({ ...formData, units: e.target.value })}
              placeholder="Number of units"
              step="0.001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price (₹) (Optional)</label>
            <input
              type="number"
              id="unitPrice"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
              placeholder="Price per unit"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentValue">Current Value (₹) (Optional)</label>
            <input
              type="number"
              id="currentValue"
              value={formData.currentValue}
              onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
              placeholder="Current market value"
              step="0.01"
            />
          </div>

          <div className="form-group span-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              />
              <span>This is a recurring investment (SIP/STP)</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Investment
        </button>
      </form>
    </div>
  );
};

export default InvestmentForm;