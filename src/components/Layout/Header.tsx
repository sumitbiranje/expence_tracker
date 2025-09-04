import React from 'react';
import { Sun, Moon, DollarSign } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme, currentView }) => {
  const getViewTitle = (view: string) => {
    switch (view) {
      case 'dashboard':
        return 'Dashboard';
      case 'income':
        return 'Income Management';
      case 'expense':
        return 'Expense Tracking';
      case 'investment':
        return 'Investment Portfolio';
      case 'loan':
        return 'Loan Management';
      default:
        return 'Expense Tracker';
    }
  };

  return (
    <header className="header glass">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <DollarSign size={24} />
            </div>
            <div className="logo-text">
              <h1 className="app-title">ExpenseTracker</h1>
              <p className="view-title">{getViewTitle(currentView)}</p>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              className="theme-toggle glass"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;