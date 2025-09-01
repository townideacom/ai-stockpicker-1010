/*
  # Seed Sample Data for Multifactor Backtest System

  This migration populates the database with sample data to demonstrate
  the multifactor backtest system functionality.

  ## 1. Data Seeded
  - Sample portfolio performance data for Q1-Q4 2023 and Q1-Q2 2024
  - Portfolio constituents for momentum strategy
  - AI scores for top Indian stocks
  - Sample backtest results
  - Market data samples

  ## 2. Portfolio Strategy
  - Momentum-based quarterly rebalancing
  - Equal-weighted 12-stock portfolio
  - Focus on large-cap Indian stocks
*/

-- Insert sample portfolio performance data
INSERT INTO portfolio_performance (portfolio_id, quarter, year, portfolio_return, benchmark_return, volatility, sharpe_ratio, max_drawdown, total_trades, winning_trades)
VALUES 
  (gen_random_uuid(), 'Q1', 2023, 8.2, 5.1, 12.5, 0.66, -3.2, 12, 9),
  (gen_random_uuid(), 'Q2', 2023, 12.4, 7.8, 14.2, 0.87, -4.1, 12, 10),
  (gen_random_uuid(), 'Q3', 2023, 15.7, 9.2, 13.8, 1.14, -2.8, 12, 11),
  (gen_random_uuid(), 'Q4', 2023, 18.9, 11.5, 15.1, 1.25, -3.5, 12, 10),
  (gen_random_uuid(), 'Q1', 2024, 22.3, 13.7, 16.4, 1.36, -4.2, 12, 11),
  (gen_random_uuid(), 'Q2', 2024, 25.8, 15.9, 17.2, 1.50, -3.8, 12, 11);

-- Get the portfolio IDs for constituent data
DO $$
DECLARE
  portfolio_q1_2023 uuid;
  portfolio_q2_2023 uuid;
  portfolio_q3_2023 uuid;
  portfolio_q4_2023 uuid;
  portfolio_q1_2024 uuid;
  portfolio_q2_2024 uuid;
BEGIN
  -- Get portfolio IDs
  SELECT id INTO portfolio_q1_2023 FROM portfolio_performance WHERE quarter = 'Q1' AND year = 2023;
  SELECT id INTO portfolio_q2_2023 FROM portfolio_performance WHERE quarter = 'Q2' AND year = 2023;
  SELECT id INTO portfolio_q3_2023 FROM portfolio_performance WHERE quarter = 'Q3' AND year = 2023;
  SELECT id INTO portfolio_q4_2023 FROM portfolio_performance WHERE quarter = 'Q4' AND year = 2023;
  SELECT id INTO portfolio_q1_2024 FROM portfolio_performance WHERE quarter = 'Q1' AND year = 2024;
  SELECT id INTO portfolio_q2_2024 FROM portfolio_performance WHERE quarter = 'Q2' AND year = 2024;

  -- Insert Q1 2023 portfolio constituents
  INSERT INTO portfolio_constituents (portfolio_id, stock_symbol, company_name, weight, quarter, year, quarterly_return)
  VALUES 
    (portfolio_q1_2023, 'RELIANCE', 'Reliance Industries Ltd.', 8.33, 'Q1', 2023, 12.5),
    (portfolio_q1_2023, 'TCS', 'Tata Consultancy Services Ltd.', 8.33, 'Q1', 2023, 15.2),
    (portfolio_q1_2023, 'HDFCBANK', 'HDFC Bank Ltd.', 8.33, 'Q1', 2023, 8.7),
    (portfolio_q1_2023, 'INFY', 'Infosys Ltd.', 8.33, 'Q1', 2023, 11.3),
    (portfolio_q1_2023, 'ICICIBANK', 'ICICI Bank Ltd.', 8.33, 'Q1', 2023, 9.8),
    (portfolio_q1_2023, 'HINDUNILVR', 'Hindustan Unilever Ltd.', 8.33, 'Q1', 2023, 6.4),
    (portfolio_q1_2023, 'ITC', 'ITC Ltd.', 8.33, 'Q1', 2023, 4.2),
    (portfolio_q1_2023, 'SBIN', 'State Bank of India', 8.33, 'Q1', 2023, 7.9),
    (portfolio_q1_2023, 'BHARTIARTL', 'Bharti Airtel Ltd.', 8.33, 'Q1', 2023, 13.6),
    (portfolio_q1_2023, 'ASIANPAINT', 'Asian Paints Ltd.', 8.33, 'Q1', 2023, 5.8),
    (portfolio_q1_2023, 'MARUTI', 'Maruti Suzuki India Ltd.', 8.33, 'Q1', 2023, 10.4),
    (portfolio_q1_2023, 'KOTAKBANK', 'Kotak Mahindra Bank Ltd.', 8.37, 'Q1', 2023, 7.1);

  -- Insert Q2 2024 portfolio constituents (most recent)
  INSERT INTO portfolio_constituents (portfolio_id, stock_symbol, company_name, weight, quarter, year, quarterly_return)
  VALUES 
    (portfolio_q2_2024, 'TCS', 'Tata Consultancy Services Ltd.', 8.33, 'Q2', 2024, 32.1),
    (portfolio_q2_2024, 'BHARTIARTL', 'Bharti Airtel Ltd.', 8.33, 'Q2', 2024, 34.8),
    (portfolio_q2_2024, 'TITAN', 'Titan Company Ltd.', 8.33, 'Q2', 2024, 31.2),
    (portfolio_q2_2024, 'RELIANCE', 'Reliance Industries Ltd.', 8.33, 'Q2', 2024, 24.7),
    (portfolio_q2_2024, 'NESTLEIND', 'Nestle India Ltd.', 8.33, 'Q2', 2024, 28.9),
    (portfolio_q2_2024, 'HDFCBANK', 'HDFC Bank Ltd.', 8.33, 'Q2', 2024, 21.4),
    (portfolio_q2_2024, 'HCLTECH', 'HCL Technologies Ltd.', 8.33, 'Q2', 2024, 26.3),
    (portfolio_q2_2024, 'INFY', 'Infosys Ltd.', 8.33, 'Q2', 2024, 27.8),
    (portfolio_q2_2024, 'ICICIBANK', 'ICICI Bank Ltd.', 8.33, 'Q2', 2024, 23.6),
    (portfolio_q2_2024, 'WIPRO', 'Wipro Ltd.', 8.33, 'Q2', 2024, 19.2),
    (portfolio_q2_2024, 'HINDUNILVR', 'Hindustan Unilever Ltd.', 8.33, 'Q2', 2024, 18.7),
    (portfolio_q2_2024, 'AXISBANK', 'Axis Bank Ltd.', 8.37, 'Q2', 2024, 20.8);
END $$;

-- Insert current AI scores for top stocks
INSERT INTO ai_scores (stock_symbol, company_name, ai_score, fundamental_score, technical_score, sentiment_score, valuation_score, industry_score, trade_ranking, confidence_level, date)
VALUES 
  ('TCS', 'Tata Consultancy Services Ltd.', 9.2, 9.5, 9.0, 9.1, 8.8, 9.2, 'Strong Buy', 92.5, CURRENT_DATE),
  ('RELIANCE', 'Reliance Industries Ltd.', 8.8, 9.1, 8.8, 9.2, 8.5, 8.9, 'Strong Buy', 88.7, CURRENT_DATE),
  ('HDFCBANK', 'HDFC Bank Ltd.', 8.7, 8.9, 8.5, 8.7, 8.6, 8.8, 'Buy', 87.3, CURRENT_DATE),
  ('INFY', 'Infosys Ltd.', 8.5, 8.7, 8.3, 8.5, 8.4, 8.6, 'Buy', 85.2, CURRENT_DATE),
  ('BHARTIARTL', 'Bharti Airtel Ltd.', 8.4, 8.6, 8.2, 8.4, 8.1, 8.7, 'Buy', 84.1, CURRENT_DATE),
  ('ICICIBANK', 'ICICI Bank Ltd.', 8.3, 8.5, 8.1, 8.3, 8.2, 8.4, 'Buy', 83.5, CURRENT_DATE),
  ('TITAN', 'Titan Company Ltd.', 8.3, 8.5, 8.1, 8.3, 8.0, 8.6, 'Buy', 83.2, CURRENT_DATE),
  ('NESTLEIND', 'Nestle India Ltd.', 8.6, 8.8, 8.4, 8.6, 8.3, 8.9, 'Strong Buy', 86.4, CURRENT_DATE),
  ('HCLTECH', 'HCL Technologies Ltd.', 8.1, 8.3, 7.9, 8.1, 8.0, 8.2, 'Buy', 81.7, CURRENT_DATE),
  ('HINDUNILVR', 'Hindustan Unilever Ltd.', 8.1, 8.3, 7.9, 8.1, 7.8, 8.4, 'Buy', 81.3, CURRENT_DATE),
  ('ITC', 'ITC Ltd.', 7.9, 8.1, 7.7, 7.9, 8.2, 7.5, 'Hold', 79.2, CURRENT_DATE),
  ('SBIN', 'State Bank of India', 7.6, 7.8, 7.4, 7.6, 7.9, 7.3, 'Hold', 76.8, CURRENT_DATE),
  ('ASIANPAINT', 'Asian Paints Ltd.', 7.8, 8.0, 7.6, 7.8, 7.5, 8.1, 'Hold', 78.4, CURRENT_DATE),
  ('MARUTI', 'Maruti Suzuki India Ltd.', 8.2, 8.4, 8.0, 8.2, 7.9, 8.5, 'Buy', 82.1, CURRENT_DATE),
  ('KOTAKBANK', 'Kotak Mahindra Bank Ltd.', 8.0, 8.2, 7.8, 8.0, 8.1, 7.9, 'Hold', 80.3, CURRENT_DATE),
  ('ULTRACEMCO', 'UltraTech Cement Ltd.', 7.6, 7.8, 7.4, 7.6, 7.5, 7.7, 'Hold', 76.2, CURRENT_DATE),
  ('SUNPHARMA', 'Sun Pharmaceutical Industries Ltd.', 7.4, 7.6, 7.2, 7.4, 7.3, 7.5, 'Hold', 74.6, CURRENT_DATE),
  ('WIPRO', 'Wipro Ltd.', 7.5, 7.7, 7.3, 7.5, 7.4, 7.6, 'Hold', 75.1, CURRENT_DATE),
  ('AXISBANK', 'Axis Bank Ltd.', 7.9, 8.1, 7.7, 7.9, 7.8, 8.0, 'Hold', 79.5, CURRENT_DATE);

-- Insert sample backtest results
INSERT INTO backtest_results (strategy_name, stock_symbol, company_name, buy_date, sell_date, buy_price, sell_price, shares, ai_score_at_buy, transaction_cost)
VALUES 
  ('Momentum Strategy', 'TCS', 'Tata Consultancy Services Ltd.', '2024-01-15', '2024-04-15', 3200.50, 3542.30, 100, 8.9, 25.00),
  ('Momentum Strategy', 'RELIANCE', 'Reliance Industries Ltd.', '2024-02-01', '2024-05-01', 2180.25, 2456.75, 150, 8.7, 35.00),
  ('Momentum Strategy', 'HDFCBANK', 'HDFC Bank Ltd.', '2024-01-20', '2024-04-20', 1520.40, 1634.85, 200, 8.5, 40.00),
  ('Momentum Strategy', 'INFY', 'Infosys Ltd.', '2024-02-10', '2024-05-10', 1298.75, 1456.20, 180, 8.3, 32.00),
  ('Momentum Strategy', 'ICICIBANK', 'ICICI Bank Ltd.', '2024-01-25', '2024-04-25', 978.60, 1089.45, 250, 8.1, 45.00),
  ('Momentum Strategy', 'BHARTIARTL', 'Bharti Airtel Ltd.', '2024-02-05', '2024-05-05', 1089.30, 1234.50, 170, 8.2, 38.00),
  ('Momentum Strategy', 'TITAN', 'Titan Company Ltd.', '2024-01-30', '2024-04-30', 2876.40, 3234.50, 80, 8.0, 28.00),
  ('Momentum Strategy', 'NESTLEIND', 'Nestle India Ltd.', '2024-02-15', '2024-05-15', 21234.60, 23456.75, 10, 8.4, 15.00),
  ('Momentum Strategy', 'MARUTI', 'Maruti Suzuki India Ltd.', '2024-01-10', '2024-04-10', 9234.80, 10456.25, 25, 7.9, 22.00),
  ('Momentum Strategy', 'HCLTECH', 'HCL Technologies Ltd.', '2024-02-20', '2024-05-20', 1098.50, 1234.75, 190, 7.8, 35.00);

-- Insert sample market data for key stocks
INSERT INTO market_data (stock_symbol, date, open_price, high_price, low_price, close_price, volume, adjusted_close)
VALUES 
  ('TCS', CURRENT_DATE, 3540.00, 3560.50, 3535.20, 3542.30, 450000, 3542.30),
  ('RELIANCE', CURRENT_DATE, 2450.00, 2465.80, 2445.30, 2456.75, 1200000, 2456.75),
  ('HDFCBANK', CURRENT_DATE, 1630.00, 1640.25, 1628.50, 1634.85, 780000, 1634.85),
  ('INFY', CURRENT_DATE, 1450.00, 1462.40, 1448.90, 1456.20, 890000, 1456.20),
  ('BHARTIARTL', CURRENT_DATE, 1230.00, 1238.75, 1228.60, 1234.50, 670000, 1234.50),
  ('ICICIBANK', CURRENT_DATE, 1085.00, 1092.30, 1083.70, 1089.45, 1100000, 1089.45),
  ('TITAN', CURRENT_DATE, 3230.00, 3245.60, 3225.80, 3234.50, 150000, 3234.50),
  ('NESTLEIND', CURRENT_DATE, 23400.00, 23480.25, 23390.50, 23456.75, 30000, 23456.75),
  ('MARUTI', CURRENT_DATE, 10400.00, 10475.60, 10395.20, 10456.25, 80000, 10456.25),
  ('HCLTECH', CURRENT_DATE, 1230.00, 1238.90, 1228.40, 1234.75, 560000, 1234.75);

-- Insert sample stock fundamentals
INSERT INTO stock_fundamentals (stock_symbol, company_name, market_cap, pe_ratio, pb_ratio, debt_to_equity, roe, revenue_growth, profit_margin, fundamental_score, quarter, year)
VALUES 
  ('TCS', 'Tata Consultancy Services Ltd.', 1290000.00, 28.5, 12.8, 0.15, 0.42, 0.08, 0.25, 9.5, 'Q2', 2024),
  ('RELIANCE', 'Reliance Industries Ltd.', 1660000.00, 15.2, 2.1, 0.35, 0.13, 0.12, 0.08, 9.1, 'Q2', 2024),
  ('HDFCBANK', 'HDFC Bank Ltd.', 1210000.00, 18.7, 2.8, 0.85, 0.17, 0.15, 0.22, 8.9, 'Q2', 2024),
  ('INFY', 'Infosys Ltd.', 600000.00, 24.3, 8.9, 0.08, 0.31, 0.06, 0.21, 8.7, 'Q2', 2024),
  ('BHARTIARTL', 'Bharti Airtel Ltd.', 720000.00, 22.1, 4.2, 0.42, 0.14, 0.18, 0.16, 8.6, 'Q2', 2024),
  ('ICICIBANK', 'ICICI Bank Ltd.', 760000.00, 16.8, 2.5, 0.78, 0.16, 0.13, 0.19, 8.5, 'Q2', 2024),
  ('TITAN', 'Titan Company Ltd.', 290000.00, 45.6, 12.3, 0.12, 0.18, 0.22, 0.09, 8.5, 'Q2', 2024),
  ('NESTLEIND', 'Nestle India Ltd.', 230000.00, 52.8, 18.7, 0.05, 0.35, 0.09, 0.15, 8.8, 'Q2', 2024),
  ('MARUTI', 'Maruti Suzuki India Ltd.', 320000.00, 28.9, 3.4, 0.18, 0.12, 0.07, 0.08, 8.4, 'Q2', 2024),
  ('HCLTECH', 'HCL Technologies Ltd.', 330000.00, 21.5, 6.7, 0.22, 0.19, 0.11, 0.14, 8.3, 'Q2', 2024);

-- Insert sample technical data
INSERT INTO stock_technicals (stock_symbol, rsi, macd, bollinger_position, moving_avg_20, moving_avg_50, moving_avg_200, volume_ratio, momentum_score, technical_score, date)
VALUES 
  ('TCS', 65.4, 45.20, 0.75, 3520.30, 3480.60, 3420.80, 1.15, 0.82, 9.0, CURRENT_DATE),
  ('RELIANCE', 58.7, 32.15, 0.68, 2440.50, 2410.20, 2380.90, 1.08, 0.76, 8.8, CURRENT_DATE),
  ('HDFCBANK', 62.1, 28.90, 0.72, 1625.40, 1605.80, 1590.30, 1.12, 0.79, 8.5, CURRENT_DATE),
  ('INFY', 59.8, 35.75, 0.69, 1445.20, 1425.60, 1405.90, 1.09, 0.74, 8.3, CURRENT_DATE),
  ('BHARTIARTL', 61.3, 42.30, 0.71, 1225.80, 1210.40, 1195.70, 1.14, 0.81, 8.2, CURRENT_DATE),
  ('ICICIBANK', 57.9, 29.85, 0.66, 1080.90, 1065.30, 1050.80, 1.07, 0.73, 8.1, CURRENT_DATE),
  ('TITAN', 63.2, 38.60, 0.74, 3220.70, 3195.40, 3170.20, 1.11, 0.78, 8.1, CURRENT_DATE),
  ('NESTLEIND', 66.8, 48.90, 0.77, 23420.50, 23380.20, 23340.80, 1.18, 0.85, 8.4, CURRENT_DATE),
  ('MARUTI', 60.5, 41.25, 0.70, 10430.60, 10395.80, 10360.40, 1.13, 0.77, 8.0, CURRENT_DATE),
  ('HCLTECH', 58.4, 33.40, 0.67, 1228.90, 1215.60, 1202.30, 1.06, 0.72, 7.9, CURRENT_DATE);