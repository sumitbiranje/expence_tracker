import React from 'react';
import { TrendingUp, TrendingDown, PieChart, CreditCard, Target, DollarSign } from 'lucide-react';
import { FinancialSummary } from '../../types';
import './SummaryCards.css';

interface SummaryCardsProps {
  summary: FinancialSummary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      title: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'var(--color-income)',
      trend: '+12.5%'
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: 'var(--color-expense)',
      trend: '+8.2%'
    },
    {
      title: 'Investments',
      value: summary.totalInvestments,
      icon: PieChart,
      color: 'var(--color-investment)',
      trend: '+15.3%'
    },
    {
      title: 'Loans/EMI',
      value: summary.totalLoans,
      icon: CreditCard,
      color: 'var(--color-loan)',
      trend: '-5.1%'
    },
    {
      title: 'Net Worth',
      value: summary.netWorth,
      icon: Target,
      color: 'var(--color-savings)',
      trend: '+22.1%'
    },
    {
      title: 'Savings Rate',
      value: summary.savingsRate,
      icon: DollarSign,
      color: 'var(--color-income)',
      trend: '+3.4%',
      isPercentage: true
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="summary-cards">
      <h3 className="section-title">Financial Summary</h3>
      <div className="cards-grid">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className="summary-card glass"
              style={{ '--card-color': card.color } as React.CSSProperties}
            >
              <div className="card-header">
                <div className="card-icon">
                  <IconComponent size={24} />
                </div>
                <div className="card-trend">
                  {card.trend}
                </div>
              </div>
              
              <div className="card-content">
                <h4 className="card-title">{card.title}</h4>
                <div className="card-value">
                  {card.isPercentage 
                    ? formatPercentage(card.value)
                    : formatCurrency(card.value)
                  }
                </div>
              </div>

              <div className="card-background">
                <IconComponent size={80} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryCards;