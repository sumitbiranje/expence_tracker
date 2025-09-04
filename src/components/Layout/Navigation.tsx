import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  CreditCard,
  Target
} from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setCurrentView }) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'var(--color-investment)'
    },
    {
      id: 'income',
      label: 'Income',
      icon: TrendingUp,
      color: 'var(--color-income)'
    },
    {
      id: 'expense',
      label: 'Expenses',
      icon: TrendingDown,
      color: 'var(--color-expense)'
    },
    {
      id: 'investment',
      label: 'Investments',
      icon: PieChart,
      color: 'var(--color-investment)'
    },
    {
      id: 'loan',
      label: 'Loans/EMI',
      icon: CreditCard,
      color: 'var(--color-loan)'
    }
  ];

  return (
    <nav className="navigation glass">
      <div className="nav-header">
        <Target size={20} />
        <span className="nav-title">Financial Hub</span>
      </div>
      
      <ul className="nav-list">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <li key={item.id}>
              <button
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
                style={{ '--accent-color': item.color } as React.CSSProperties}
              >
                <div className="nav-icon">
                  <IconComponent size={20} />
                </div>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      
      <div className="nav-footer">
        <div className="glass-card nav-tip">
          <h4>💡 Pro Tip</h4>
          <p>Set up recurring transactions to automate your tracking!</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;