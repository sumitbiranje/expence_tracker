import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import IncomeForm from './components/Forms/IncomeForm';
import ExpenseForm from './components/Forms/ExpenseForm';
import InvestmentForm from './components/Forms/InvestmentForm';
import LoanForm from './components/Forms/LoanForm';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'income':
        return <IncomeForm />;
      case 'expense':
        return <ExpenseForm />;
      case 'investment':
        return <InvestmentForm />;
      case 'loan':
        return <LoanForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <TransactionProvider>
      <div className="App">
        <Header 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme}
          currentView={currentView}
        />
        <div className="main-layout">
          <Navigation 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
          />
          <main className="main-content container">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </TransactionProvider>
  );
}

export default App;
