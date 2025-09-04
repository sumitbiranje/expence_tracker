import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Transaction } from '../../types';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import './ChartsSection.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsSectionProps {
  transactions: Transaction[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ transactions }) => {
  // Prepare data for Income vs Expenses trend chart
  const trendData = useMemo(() => {
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 5);
    const months = eachMonthOfInterval({ start: sixMonthsAgo, end: now });

    const monthlyData = months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= monthStart && transactionDate <= monthEnd;
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const investments = monthTransactions
        .filter(t => t.type === 'investment')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        label: format(month, 'MMM yyyy'),
        income,
        expenses,
        investments,
        net: income - expenses
      };
    });

    return {
      labels: monthlyData.map(d => d.label),
      datasets: [
        {
          label: 'Income',
          data: monthlyData.map(d => d.income),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Expenses',
          data: monthlyData.map(d => d.expenses),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Net',
          data: monthlyData.map(d => d.net),
          borderColor: 'rgb(139, 92, 246)',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          tension: 0.4,
        }
      ]
    };
  }, [transactions]);

  // Prepare data for expense category breakdown
  const categoryData = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

    const sortedCategories = Object.entries(expensesByCategory)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8); // Top 8 categories

    const colors = [
      '#ef4444', '#f97316', '#eab308', '#22c55e',
      '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
    ];

    return {
      labels: sortedCategories.map(([category]) => category),
      datasets: [
        {
          data: sortedCategories.map(([, amount]) => amount),
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }
      ]
    };
  }, [transactions]);

  // Prepare data for monthly spending pattern
  const spendingPatternData = useMemo(() => {
    const currentMonth = new Date();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const currentMonthExpenses = transactions
      .filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'expense' && transactionDate >= monthStart && transactionDate <= monthEnd;
      })
      .reduce((acc, transaction) => {
        const day = new Date(transaction.date).getDate();
        acc[day] = (acc[day] || 0) + transaction.amount;
        return acc;
      }, {} as Record<number, number>);

    const daysInMonth = monthEnd.getDate();
    const dailySpending = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return currentMonthExpenses[day] || 0;
    });

    return {
      labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
      datasets: [
        {
          label: 'Daily Expenses',
          data: dailySpending,
          backgroundColor: 'rgba(239, 68, 68, 0.6)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1,
        }
      ]
    };
  }, [transactions]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          callback: function(value: any) {
            return '₹' + new Intl.NumberFormat('en-IN').format(value);
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 11
          },
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ₹${new Intl.NumberFormat('en-IN').format(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="charts-section">
      <h3 className="section-title">Financial Insights</h3>
      <div className="charts-grid">
        <div className="chart-card glass">
          <h4>Income vs Expenses Trend</h4>
          <div className="chart-container">
            <Line data={trendData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card glass">
          <h4>Expense Categories</h4>
          <div className="chart-container">
            {categoryData.labels.length > 0 ? (
              <Doughnut data={categoryData} options={doughnutOptions} />
            ) : (
              <div className="empty-chart">
                <p>No expense data available</p>
              </div>
            )}
          </div>
        </div>

        <div className="chart-card glass span-2">
          <h4>Daily Spending This Month</h4>
          <div className="chart-container">
            <Bar data={spendingPatternData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;