/*
  # Multifactor Backtest Database Schema Migration

  This migration creates the complete database schema for the multifactor backtest system,
  including all tables, indexes, constraints, and security policies.

  ## 1. New Tables
  - `portfolio_constituents` - Stores portfolio composition data for each quarter
  - `portfolio_performance` - Tracks quarterly performance metrics
  - `stock_fundamentals` - Contains fundamental analysis data for stocks
  - `stock_technicals` - Stores technical analysis indicators
  - `market_data` - Historical price and volume data
  - `ai_scores` - AI-generated stock scores and rankings
  - `backtest_results` - Comprehensive backtest performance results
  - `user_portfolios` - User-specific portfolio configurations
  - `watchlists` - User stock watchlists
  - `alerts` - Price and score-based alerts

  ## 2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
  - Public read access for market data and general stock information
  - User-specific access for portfolios, watchlists, and alerts

  ## 3. Performance Optimizations
  - Indexes on frequently queried columns
  - Composite indexes for complex queries
  - Triggers for automatic timestamp updates
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE subscription_status AS ENUM ('free', 'premium', 'enterprise');

-- Portfolio constituents table
CREATE TABLE IF NOT EXISTS portfolio_constituents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid NOT NULL,
  stock_symbol text NOT NULL,
  company_name text NOT NULL,
  weight numeric(5,2) NOT NULL DEFAULT 0.00,
  quarter text NOT NULL,
  year integer NOT NULL,
  entry_price numeric(10,2),
  exit_price numeric(10,2),
  quarterly_return numeric(8,4),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT portfolio_constituents_weight_check CHECK (weight >= 0 AND weight <= 100),
  CONSTRAINT portfolio_constituents_year_check CHECK (year >= 2020)
);

-- Portfolio performance table
CREATE TABLE IF NOT EXISTS portfolio_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id uuid NOT NULL,
  quarter text NOT NULL,
  year integer NOT NULL,
  portfolio_return numeric(8,4) NOT NULL,
  benchmark_return numeric(8,4) NOT NULL,
  outperformance numeric(8,4) GENERATED ALWAYS AS (portfolio_return - benchmark_return) STORED,
  volatility numeric(8,4),
  sharpe_ratio numeric(8,4),
  max_drawdown numeric(8,4),
  total_trades integer DEFAULT 0,
  winning_trades integer DEFAULT 0,
  win_rate numeric(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN total_trades > 0 THEN (winning_trades::numeric / total_trades::numeric) * 100
      ELSE 0
    END
  ) STORED,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT portfolio_performance_year_check CHECK (year >= 2020),
  CONSTRAINT portfolio_performance_trades_check CHECK (winning_trades <= total_trades)
);

-- Stock fundamentals table
CREATE TABLE IF NOT EXISTS stock_fundamentals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_symbol text NOT NULL,
  company_name text NOT NULL,
  market_cap numeric(15,2),
  pe_ratio numeric(8,2),
  pb_ratio numeric(8,2),
  debt_to_equity numeric(8,2),
  roe numeric(8,4),
  revenue_growth numeric(8,4),
  profit_margin numeric(8,4),
  fundamental_score numeric(3,1) DEFAULT 0.0,
  quarter text NOT NULL,
  year integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT stock_fundamentals_year_check CHECK (year >= 2020),
  CONSTRAINT stock_fundamentals_score_check CHECK (fundamental_score >= 0 AND fundamental_score <= 10)
);

-- Stock technicals table
CREATE TABLE IF NOT EXISTS stock_technicals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_symbol text NOT NULL,
  rsi numeric(5,2),
  macd numeric(8,4),
  bollinger_position numeric(5,2),
  moving_avg_20 numeric(10,2),
  moving_avg_50 numeric(10,2),
  moving_avg_200 numeric(10,2),
  volume_ratio numeric(8,4),
  momentum_score numeric(8,4),
  technical_score numeric(3,1) DEFAULT 0.0,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT stock_technicals_score_check CHECK (technical_score >= 0 AND technical_score <= 10),
  CONSTRAINT stock_technicals_rsi_check CHECK (rsi >= 0 AND rsi <= 100)
);

-- Market data table
CREATE TABLE IF NOT EXISTS market_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_symbol text NOT NULL,
  date date NOT NULL,
  open_price numeric(10,2) NOT NULL,
  high_price numeric(10,2) NOT NULL,
  low_price numeric(10,2) NOT NULL,
  close_price numeric(10,2) NOT NULL,
  volume bigint NOT NULL,
  adjusted_close numeric(10,2),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT market_data_prices_check CHECK (
    open_price > 0 AND high_price > 0 AND low_price > 0 AND close_price > 0
  ),
  CONSTRAINT market_data_high_low_check CHECK (high_price >= low_price),
  CONSTRAINT market_data_volume_check CHECK (volume >= 0),
  UNIQUE(stock_symbol, date)
);

-- AI scores table
CREATE TABLE IF NOT EXISTS ai_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_symbol text NOT NULL,
  company_name text NOT NULL,
  ai_score numeric(3,1) NOT NULL DEFAULT 0.0,
  fundamental_score numeric(3,1) DEFAULT 0.0,
  technical_score numeric(3,1) DEFAULT 0.0,
  sentiment_score numeric(3,1) DEFAULT 0.0,
  valuation_score numeric(3,1) DEFAULT 0.0,
  industry_score numeric(3,1) DEFAULT 0.0,
  trade_ranking text DEFAULT 'Hold',
  confidence_level numeric(5,2) DEFAULT 50.0,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT ai_scores_score_check CHECK (
    ai_score >= 0 AND ai_score <= 10 AND
    fundamental_score >= 0 AND fundamental_score <= 10 AND
    technical_score >= 0 AND technical_score <= 10 AND
    sentiment_score >= 0 AND sentiment_score <= 10 AND
    valuation_score >= 0 AND valuation_score <= 10 AND
    industry_score >= 0 AND industry_score <= 10
  ),
  CONSTRAINT ai_scores_confidence_check CHECK (confidence_level >= 0 AND confidence_level <= 100),
  CONSTRAINT ai_scores_ranking_check CHECK (trade_ranking IN ('Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell')),
  UNIQUE(stock_symbol, date)
);

-- Backtest results table
CREATE TABLE IF NOT EXISTS backtest_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_name text NOT NULL,
  stock_symbol text NOT NULL,
  company_name text NOT NULL,
  buy_date date NOT NULL,
  sell_date date NOT NULL,
  buy_price numeric(10,2) NOT NULL,
  sell_price numeric(10,2) NOT NULL,
  shares integer NOT NULL,
  total_return numeric(8,4) GENERATED ALWAYS AS (
    ((sell_price - buy_price) / buy_price) * 100
  ) STORED,
  holding_period integer GENERATED ALWAYS AS (
    sell_date - buy_date
  ) STORED,
  ai_score_at_buy numeric(3,1),
  transaction_cost numeric(8,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT backtest_results_prices_check CHECK (buy_price > 0 AND sell_price > 0),
  CONSTRAINT backtest_results_shares_check CHECK (shares > 0),
  CONSTRAINT backtest_results_dates_check CHECK (sell_date >= buy_date)
);

-- User portfolios table
CREATE TABLE IF NOT EXISTS user_portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  strategy_type text DEFAULT 'custom',
  is_active boolean DEFAULT true,
  total_value numeric(15,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_portfolios_value_check CHECK (total_value >= 0)
);

-- Watchlists table
CREATE TABLE IF NOT EXISTS watchlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL DEFAULT 'My Watchlist',
  stock_symbol text NOT NULL,
  company_name text NOT NULL,
  target_price numeric(10,2),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT watchlists_target_price_check CHECK (target_price IS NULL OR target_price > 0)
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  stock_symbol text NOT NULL,
  alert_type text NOT NULL,
  threshold_value numeric(10,2) NOT NULL,
  current_value numeric(10,2),
  is_triggered boolean DEFAULT false,
  is_active boolean DEFAULT true,
  message text,
  triggered_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT alerts_threshold_check CHECK (threshold_value > 0),
  CONSTRAINT alerts_type_check CHECK (alert_type IN ('price_above', 'price_below', 'ai_score_above', 'ai_score_below', 'volume_spike'))
);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_portfolio_constituents_portfolio_quarter ON portfolio_constituents(portfolio_id, quarter, year);
CREATE INDEX IF NOT EXISTS idx_portfolio_constituents_symbol ON portfolio_constituents(stock_symbol);
CREATE INDEX IF NOT EXISTS idx_portfolio_performance_quarter ON portfolio_performance(quarter, year);
CREATE INDEX IF NOT EXISTS idx_stock_fundamentals_symbol_quarter ON stock_fundamentals(stock_symbol, quarter, year);
CREATE INDEX IF NOT EXISTS idx_stock_technicals_symbol_date ON stock_technicals(stock_symbol, date);
CREATE INDEX IF NOT EXISTS idx_market_data_symbol_date ON market_data(stock_symbol, date);
CREATE INDEX IF NOT EXISTS idx_ai_scores_symbol_date ON ai_scores(stock_symbol, date);
CREATE INDEX IF NOT EXISTS idx_ai_scores_score ON ai_scores(ai_score DESC);
CREATE INDEX IF NOT EXISTS idx_backtest_results_strategy ON backtest_results(strategy_name);
CREATE INDEX IF NOT EXISTS idx_backtest_results_symbol ON backtest_results(stock_symbol);
CREATE INDEX IF NOT EXISTS idx_backtest_results_dates ON backtest_results(buy_date, sell_date);
CREATE INDEX IF NOT EXISTS idx_user_portfolios_user ON user_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlists_user ON watchlists(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlists_symbol ON watchlists(stock_symbol);
CREATE INDEX IF NOT EXISTS idx_alerts_user_active ON alerts(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_alerts_symbol_type ON alerts(stock_symbol, alert_type);

-- Enable Row Level Security
ALTER TABLE portfolio_constituents ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_fundamentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_technicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE backtest_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public market data (readable by all authenticated users)
CREATE POLICY "Market data is readable by authenticated users"
  ON market_data
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "AI scores are readable by authenticated users"
  ON ai_scores
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Stock fundamentals are readable by authenticated users"
  ON stock_fundamentals
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Stock technicals are readable by authenticated users"
  ON stock_technicals
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Backtest results are readable by authenticated users"
  ON backtest_results
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for portfolio data (admin/system access)
CREATE POLICY "Portfolio constituents are readable by authenticated users"
  ON portfolio_constituents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Portfolio performance is readable by authenticated users"
  ON portfolio_performance
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user-specific data
CREATE POLICY "Users can manage their own portfolios"
  ON user_portfolios
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own watchlists"
  ON watchlists
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own alerts"
  ON alerts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_portfolio_constituents_updated_at
  BEFORE UPDATE ON portfolio_constituents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_performance_updated_at
  BEFORE UPDATE ON portfolio_performance
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stock_fundamentals_updated_at
  BEFORE UPDATE ON stock_fundamentals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stock_technicals_updated_at
  BEFORE UPDATE ON stock_technicals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_scores_updated_at
  BEFORE UPDATE ON ai_scores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_portfolios_updated_at
  BEFORE UPDATE ON user_portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_watchlists_updated_at
  BEFORE UPDATE ON watchlists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON alerts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create views for common queries
CREATE OR REPLACE VIEW current_ai_scores AS
SELECT DISTINCT ON (stock_symbol)
  stock_symbol,
  company_name,
  ai_score,
  fundamental_score,
  technical_score,
  sentiment_score,
  valuation_score,
  industry_score,
  trade_ranking,
  confidence_level,
  date
FROM ai_scores
ORDER BY stock_symbol, date DESC;

CREATE OR REPLACE VIEW latest_portfolio_performance AS
SELECT DISTINCT ON (portfolio_id)
  portfolio_id,
  quarter,
  year,
  portfolio_return,
  benchmark_return,
  outperformance,
  volatility,
  sharpe_ratio,
  max_drawdown,
  total_trades,
  winning_trades,
  win_rate
FROM portfolio_performance
ORDER BY portfolio_id, year DESC, quarter DESC;

-- Create function to get portfolio composition for a specific quarter
CREATE OR REPLACE FUNCTION get_portfolio_composition(
  p_portfolio_id uuid,
  p_quarter text,
  p_year integer
)
RETURNS TABLE (
  stock_symbol text,
  company_name text,
  weight numeric,
  quarterly_return numeric,
  entry_price numeric,
  exit_price numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pc.stock_symbol,
    pc.company_name,
    pc.weight,
    pc.quarterly_return,
    pc.entry_price,
    pc.exit_price
  FROM portfolio_constituents pc
  WHERE pc.portfolio_id = p_portfolio_id
    AND pc.quarter = p_quarter
    AND pc.year = p_year
  ORDER BY pc.weight DESC;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate portfolio metrics
CREATE OR REPLACE FUNCTION calculate_portfolio_metrics(
  p_portfolio_id uuid,
  p_start_date date,
  p_end_date date
)
RETURNS TABLE (
  total_return numeric,
  annualized_return numeric,
  volatility numeric,
  sharpe_ratio numeric,
  max_drawdown numeric
) AS $$
DECLARE
  returns_array numeric[];
  avg_return numeric;
  std_dev numeric;
  days_diff integer;
BEGIN
  -- Get portfolio returns for the period
  SELECT array_agg(portfolio_return)
  INTO returns_array
  FROM portfolio_performance pp
  WHERE pp.portfolio_id = p_portfolio_id
    AND make_date(pp.year, 
      CASE pp.quarter 
        WHEN 'Q1' THEN 3
        WHEN 'Q2' THEN 6
        WHEN 'Q3' THEN 9
        WHEN 'Q4' THEN 12
      END, 1) BETWEEN p_start_date AND p_end_date;

  -- Calculate metrics
  IF array_length(returns_array, 1) > 0 THEN
    SELECT 
      (array_agg(portfolio_return ORDER BY year, quarter))[array_length(array_agg(portfolio_return), 1)],
      avg(portfolio_return),
      stddev(portfolio_return)
    INTO total_return, avg_return, std_dev
    FROM portfolio_performance pp
    WHERE pp.portfolio_id = p_portfolio_id
      AND make_date(pp.year, 
        CASE pp.quarter 
          WHEN 'Q1' THEN 3
          WHEN 'Q2' THEN 6
          WHEN 'Q3' THEN 9
          WHEN 'Q4' THEN 12
        END, 1) BETWEEN p_start_date AND p_end_date;

    days_diff := p_end_date - p_start_date;
    annualized_return := CASE 
      WHEN days_diff > 0 THEN (power(1 + total_return/100, 365.0/days_diff) - 1) * 100
      ELSE 0
    END;
    
    volatility := COALESCE(std_dev, 0);
    sharpe_ratio := CASE 
      WHEN volatility > 0 THEN avg_return / volatility
      ELSE 0
    END;
    
    -- Simplified max drawdown calculation
    max_drawdown := COALESCE(
      (SELECT MIN(portfolio_return) FROM portfolio_performance pp
       WHERE pp.portfolio_id = p_portfolio_id
         AND make_date(pp.year, 
           CASE pp.quarter 
             WHEN 'Q1' THEN 3
             WHEN 'Q2' THEN 6
             WHEN 'Q3' THEN 9
             WHEN 'Q4' THEN 12
           END, 1) BETWEEN p_start_date AND p_end_date), 0);
  ELSE
    total_return := 0;
    annualized_return := 0;
    volatility := 0;
    sharpe_ratio := 0;
    max_drawdown := 0;
  END IF;

  RETURN QUERY SELECT total_return, annualized_return, volatility, sharpe_ratio, max_drawdown;
END;
$$ LANGUAGE plpgsql;