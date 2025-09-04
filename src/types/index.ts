export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'investment' | 'loan';
  amount: number;
  category: string;
  subcategory?: string;
  description: string;
  date: string;
  tags?: string[];
  isRecurring?: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  attachments?: string[];
}

export interface Income extends Transaction {
  type: 'income';
  source: string;
  isActive?: boolean;
}

export interface Expense extends Transaction {
  type: 'expense';
  paymentMethod: 'cash' | 'card' | 'transfer' | 'other';
  splitTransaction?: {
    participants: string[];
    splitType: 'equal' | 'percentage' | 'amount';
    splits: { participant: string; amount: number }[];
  };
}

export interface Investment extends Transaction {
  type: 'investment';
  investmentType: 'sip' | 'stock' | 'mutual_fund' | 'crypto' | 'other';
  units?: number;
  unitPrice?: number;
  currentValue?: number;
  returns?: number;
  returnsPercentage?: number;
}

export interface Loan extends Transaction {
  type: 'loan';
  loanType: 'personal' | 'home' | 'car' | 'education' | 'other';
  principal: number;
  interestRate: number;
  tenure: number; // in months
  emiAmount: number;
  remainingBalance: number;
  nextPaymentDate: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  alertThreshold: number; // percentage
  isActive: boolean;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  description?: string;
  category: 'emergency' | 'vacation' | 'home' | 'car' | 'retirement' | 'other';
  isActive: boolean;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalInvestments: number;
  totalLoans: number;
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface TrendData {
  period: string;
  income: number;
  expenses: number;
  investments: number;
  net: number;
}