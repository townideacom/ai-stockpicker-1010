import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface PortfolioConstituent {
  id: string;
  portfolio_id: string;
  stock_symbol: string;
  company_name: string;
  weight: number;
  quarter: string;
  year: number;
  entry_price?: number;
  exit_price?: number;
  quarterly_return?: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioPerformance {
  id: string;
  portfolio_id: string;
  quarter: string;
  year: number;
  portfolio_return: number;
  benchmark_return: number;
  outperformance: number;
  volatility?: number;
  sharpe_ratio?: number;
  max_drawdown?: number;
  total_trades: number;
  winning_trades: number;
  win_rate: number;
  created_at: string;
  updated_at: string;
}

export interface AIScore {
  id: string;
  stock_symbol: string;
  company_name: string;
  ai_score: number;
  fundamental_score: number;
  technical_score: number;
  sentiment_score: number;
  valuation_score: number;
  industry_score: number;
  trade_ranking: string;
  confidence_level: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface BacktestResult {
  id: string;
  strategy_name: string;
  stock_symbol: string;
  company_name: string;
  buy_date: string;
  sell_date: string;
  buy_price: number;
  sell_price: number;
  shares: number;
  total_return: number;
  holding_period: number;
  ai_score_at_buy?: number;
  transaction_cost: number;
  created_at: string;
}

export interface MarketData {
  id: string;
  stock_symbol: string;
  date: string;
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  volume: number;
  adjusted_close?: number;
  created_at: string;
}

export interface UserPortfolio {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  strategy_type: string;
  is_active: boolean;
  total_value: number;
  created_at: string;
  updated_at: string;
}

export interface Watchlist {
  id: string;
  user_id: string;
  name: string;
  stock_symbol: string;
  company_name: string;
  target_price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  stock_symbol: string;
  alert_type: string;
  threshold_value: number;
  current_value?: number;
  is_triggered: boolean;
  is_active: boolean;
  message?: string;
  triggered_at?: string;
  created_at: string;
  updated_at: string;
}