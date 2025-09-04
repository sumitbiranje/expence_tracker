import React, { useState } from 'react';
import { useTransaction } from '../../context/TransactionContext';

const IncomeForm: React.FC = () => {
  const { addTransaction } = useTransaction();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    source: '',
    isRecurring: false
  });

  const categories = [
    'Salary',
    'Freelance',
    'Business',
    'Investment Returns',
    'Rental Income',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      addTransaction({
        type: 'income',
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
        isRecurring: formData.isRecurring
      });
      
      // Reset form
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        source: '',
        isRecurring: false
      });
      
      alert('Income added successfully!');
    }
  };

  return (
    <div className="form-container fade-in">
      <div className="form-header">
        <h2>Add Income</h2>
        <p>Record your income sources and track your earnings</p>
      </div>
      
      <form onSubmit={handleSubmit} className="glass p-6">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              placeholder="Enter amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Enter description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              id="source"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              placeholder="Enter income source"
            />
          </div>

          <div className="form-group span-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              />
              <span>This is a recurring income</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Income
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;