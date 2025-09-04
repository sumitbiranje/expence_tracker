import React, { useState } from 'react';
import { useTransaction } from '../../context/TransactionContext';

const ExpenseForm: React.FC = () => {
  const { addTransaction } = useTransaction();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    subcategory: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'card' as 'cash' | 'card' | 'transfer' | 'other',
    tags: '',
    isRecurring: false
  });

  const categories = [
    { 
      name: 'Food & Dining', 
      subcategories: ['Restaurants', 'Fast Food', 'Groceries', 'Coffee Shops', 'Alcohol & Bars'] 
    },
    { 
      name: 'Transportation', 
      subcategories: ['Gas', 'Parking', 'Car Maintenance', 'Public Transport', 'Uber/Taxi'] 
    },
    { 
      name: 'Shopping', 
      subcategories: ['Clothing', 'Electronics', 'Books', 'Home & Garden', 'Gifts'] 
    },
    { 
      name: 'Entertainment', 
      subcategories: ['Movies', 'Music', 'Games', 'Sports', 'Hobbies'] 
    },
    { 
      name: 'Bills & Utilities', 
      subcategories: ['Phone', 'Internet', 'Electricity', 'Water', 'Gas', 'Insurance'] 
    },
    { 
      name: 'Healthcare', 
      subcategories: ['Doctor', 'Pharmacy', 'Dental', 'Vision', 'Gym'] 
    },
    { 
      name: 'Education', 
      subcategories: ['Tuition', 'Books', 'Courses', 'Training'] 
    },
    { 
      name: 'Travel', 
      subcategories: ['Hotels', 'Flights', 'Car Rental', 'Activities'] 
    },
    { 
      name: 'Personal Care', 
      subcategories: ['Haircut', 'Cosmetics', 'Clothing', 'Spa'] 
    },
    { 
      name: 'Other', 
      subcategories: ['Miscellaneous'] 
    }
  ];

  const currentCategory = categories.find(cat => cat.name === formData.category);
  const subcategories = currentCategory?.subcategories || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.category && formData.description) {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      addTransaction({
        type: 'expense',
        amount: parseFloat(formData.amount),
        category: formData.category,
        subcategory: formData.subcategory,
        description: formData.description,
        date: formData.date,
        isRecurring: formData.isRecurring,
        tags: tagsArray.length > 0 ? tagsArray : undefined
      });
      
      // Reset form
      setFormData({
        amount: '',
        category: '',
        subcategory: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'card',
        tags: '',
        isRecurring: false
      });
      
      alert('Expense added successfully!');
    }
  };

  return (
    <div className="form-container fade-in">
      <div className="form-header">
        <h2>Add Expense</h2>
        <p>Track your expenses and manage your spending</p>
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
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
              required
            >
              <option value="card">Card</option>
              <option value="cash">Cash</option>
              <option value="transfer">Bank Transfer</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              id="subcategory"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              disabled={!formData.category}
            >
              <option value="">Select subcategory</option>
              {subcategories.map(subcat => (
                <option key={subcat} value={subcat}>{subcat}</option>
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
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. urgent, work, personal"
            />
          </div>

          <div className="form-group span-2">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              />
              <span>This is a recurring expense</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;