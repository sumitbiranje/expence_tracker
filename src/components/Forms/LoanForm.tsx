import React, { useState } from 'react';
import { useTransaction } from '../../context/TransactionContext';

const LoanForm: React.FC = () => {
  const { addTransaction } = useTransaction();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    loanType: 'personal' as 'personal' | 'home' | 'car' | 'education' | 'other',
    principal: '',
    interestRate: '',
    tenure: '',
    emiAmount: '',
    nextPaymentDate: '',
    isRecurring: true // EMIs are typically recurring
  });

  const loanCategories = [
    'Home Loan EMI',
    'Car Loan EMI',
    'Personal Loan EMI',
    'Education Loan EMI',
    'Credit Card Payment',
    'Business Loan EMI',
    'Gold Loan EMI',
    'Bike Loan EMI',
    'Loan Against Property',
    'Other EMI'
  ];

  const calculateEMI = () => {
    const principal = parseFloat(formData.principal);
    const rate = parseFloat(formData.interestRate) / 100 / 12; // Monthly interest rate
    const tenure = parseFloat(formData.tenure); // in months

    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      setFormData(prev => ({ ...prev, emiAmount: emi.toFixed(2) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      const loanData: any = {
        type: 'loan',
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
        isRecurring: formData.isRecurring,
        loanType: formData.loanType
      };

      // Add loan-specific fields if provided
      if (formData.principal) loanData.principal = parseFloat(formData.principal);
      if (formData.interestRate) loanData.interestRate = parseFloat(formData.interestRate);
      if (formData.tenure) loanData.tenure = parseFloat(formData.tenure);
      if (formData.emiAmount) loanData.emiAmount = parseFloat(formData.emiAmount);
      if (formData.nextPaymentDate) loanData.nextPaymentDate = formData.nextPaymentDate;
      
      // For loans, the remaining balance starts as the principal
      if (formData.principal) loanData.remainingBalance = parseFloat(formData.principal);

      addTransaction(loanData);
      
      // Reset form
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        loanType: 'personal',
        principal: '',
        interestRate: '',
        tenure: '',
        emiAmount: '',
        nextPaymentDate: '',
        isRecurring: true
      });
      
      alert('Loan/EMI added successfully!');
    }
  };

  return (
    <div className="form-container fade-in">
      <div className="form-header">
        <h2>Add Loan/EMI</h2>
        <p>Manage your loans and EMI payments</p>
      </div>
      
      <form onSubmit={handleSubmit} className="glass p-6">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="amount">EMI/Payment Amount (₹)</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              placeholder="Enter EMI amount"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="loanType">Loan Type</label>
            <select
              id="loanType"
              value={formData.loanType}
              onChange={(e) => setFormData({ ...formData, loanType: e.target.value as any })}
              required
            >
              <option value="home">Home Loan</option>
              <option value="car">Car Loan</option>
              <option value="personal">Personal Loan</option>
              <option value="education">Education Loan</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="category">Loan Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select loan category</option>
              {loanCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group span-2">
            <label htmlFor="description">Description/Bank Name</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Enter loan description or bank name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="principal">Principal Amount (₹)</label>
            <input
              type="number"
              id="principal"
              value={formData.principal}
              onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
              placeholder="Total loan amount"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <input
              type="number"
              id="interestRate"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              placeholder="Annual interest rate"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tenure">Tenure (Months)</label>
            <input
              type="number"
              id="tenure"
              value={formData.tenure}
              onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
              placeholder="Loan tenure in months"
            />
          </div>

          <div className="form-group">
            <label htmlFor="emiAmount">Calculated EMI (₹)</label>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
              <input
                type="number"
                id="emiAmount"
                value={formData.emiAmount}
                onChange={(e) => setFormData({ ...formData, emiAmount: e.target.value })}
                placeholder="EMI amount"
                step="0.01"
                readOnly={!!formData.principal && !!formData.interestRate && !!formData.tenure}
              />
              <button
                type="button"
                onClick={calculateEMI}
                className="submit-btn"
                style={{ width: 'auto', padding: 'var(--spacing-2) var(--spacing-3)', fontSize: 'var(--font-size-sm)' }}
                disabled={!formData.principal || !formData.interestRate || !formData.tenure}
              >
                Calculate
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Payment Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nextPaymentDate">Next Payment Date</label>
            <input
              type="date"
              id="nextPaymentDate"
              value={formData.nextPaymentDate}
              onChange={(e) => setFormData({ ...formData, nextPaymentDate: e.target.value })}
            />
          </div>

          <div className="form-group span-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              />
              <span>This is a recurring EMI payment</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Loan/EMI
        </button>
      </form>
    </div>
  );
};

export default LoanForm;