# Multifactor Backtest Database Schema Documentation

## Overview

This document provides comprehensive documentation for the multifactor backtest database schema deployed on Supabase PostgreSQL. The schema is designed to support AI-powered stock analysis, portfolio management, and backtesting functionality.

## Database Architecture

### Core Tables

#### 1. `portfolio_constituents`
Stores the composition of portfolios for each quarter.

**Columns:**
- `id` (uuid, PK) - Unique identifier
- `portfolio_id` (uuid) - Reference to portfolio
- `stock_symbol` (text) - Stock ticker symbol
- `company_name` (text) - Full company name
- `weight` (numeric) - Portfolio weight percentage (0-100)
- `quarter` (text) - Quarter identifier (Q1, Q2, Q3, Q4)
- `year` (integer) - Year (≥2020)
- `entry_price` (numeric) - Entry price for the position
- `exit_price` (numeric) - Exit price for the position
- `quarterly_return` (numeric) - Return for the quarter
- `created_at` (timestamptz) - Creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

**Constraints:**
- Weight must be between 0 and 100
- Year must be ≥ 2020

**Indexes:**
- `idx_portfolio_constituents_portfolio_quarter` - Composite index on portfolio_id, quarter, year
- `idx_portfolio_constituents_symbol` - Index on stock_symbol

#### 2. `portfolio_performance`
Tracks quarterly performance metrics for portfolios.

**Columns:**
- `id` (uuid, PK) - Unique identifier
- `portfolio_id` (uuid) - Reference to portfolio
- `quarter` (text) - Quarter identifier
- `year` (integer) - Year
- `portfolio_return` (numeric) - Portfolio return percentage
- `benchmark_return` (numeric) - Benchmark return percentage
- `outperformance` (numeric, computed) - Portfolio return - benchmark return
- `volatility` (numeric) - Portfolio volatility
- `sharpe_ratio` (numeric) - Risk-adjusted return metric
- `max_drawdown` (numeric) - Maximum drawdown percentage
- `total_trades` (integer) - Total number of trades
- `winning_trades` (integer) - Number of profitable trades
- `win_rate` (numeric, computed) - Percentage of winning trades
- `created_at` (timestamptz) - Creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

**Computed Columns:**
- `outperformance` = `portfolio_return` - `benchmark_return`
- `win_rate` = (`winning_trades` / `total_trades`) * 100

**Constraints:**
- Year must be ≥ 2020
- Winning trades cannot exceed total trades

#### 3. `ai_scores`
Contains AI-generated scores and rankings for stocks.

**Columns:**
- `id` (uuid, PK) - Unique identifier
- `stock_symbol` (text) - Stock ticker symbol
- `company_name` (text) - Full company name
- `ai_score` (numeric) - Overall AI score (0-10)
- `fundamental_score` (numeric) - Fundamental analysis score (0-10)
- `technical_score` (numeric) - Technical analysis score (0-10)
- `sentiment_score` (numeric) - Market sentiment score (0-10)
- `valuation_score` (numeric) - Valuation score (0-10)
- `industry_score` (numeric) - Industry comparison score (0-10)
- `trade_ranking` (text) - Trading recommendation
- `confidence_level` (numeric) - Confidence percentage (0-100)
- `date` (date) - Score calculation date
- `created_at` (timestamptz) - Creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

**Constraints:**
- All scores must be between 0 and 10
- Confidence level must be between 0 and 100
- Trade ranking must be one of: 'Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'
- Unique constraint on (stock_symbol, date)

#### 4. `backtest_results`
Comprehensive backtest performance results.

**Columns:**
- `id` (uuid, PK) - Unique identifier
- `strategy_name` (text) - Name of the trading strategy
- `stock_symbol` (text) - Stock ticker symbol
- `company_name` (text) - Full company name
- `buy_date` (date) - Purchase date
- `sell_date` (date) - Sale date
- `buy_price` (numeric) - Purchase price
- `sell_price` (numeric) - Sale price
- `shares` (integer) - Number of shares
- `total_return` (numeric, computed) - Total return percentage
- `holding_period` (integer, computed) - Days held
- `ai_score_at_buy` (numeric) - AI score at time of purchase
- `transaction_cost` (numeric) - Trading fees and costs
- `created_at` (timestamptz) - Creation timestamp

**Computed Columns:**
- `total_return` = ((sell_price - buy_price) / buy_price) * 100
- `holding_period` = sell_date - buy_date

#### 5. `market_data`
Historical price and volume data for stocks.

**Columns:**
- `id` (uuid, PK) - Unique identifier
- `stock_symbol` (text) - Stock ticker symbol
- `date` (date) - Trading date
- `open_price` (numeric) - Opening price
- `high_price` (numeric) - Highest price
- `low_price` (numeric) - Lowest price
- `close_price` (numeric) - Closing price
- `volume` (bigint) - Trading volume
- `adjusted_close` (numeric) - Adjusted closing price
- `created_at` (timestamptz) - Creation timestamp

**Constraints:**
- All prices must be positive
- High price must be ≥ low price
- Volume must be ≥ 0
- Unique constraint on (stock_symbol, date)

### User-Specific Tables

#### 6. `user_portfolios`
User-created portfolio configurations.

#### 7. `watchlists`
User stock watchlists with target prices and notes.

#### 8. `alerts`
Price and score-based alerts for users.

## Views

### `current_ai_scores`
Returns the most recent AI scores for each stock.

### `latest_portfolio_performance`
Returns the most recent performance data for each portfolio.

## Functions

### `get_portfolio_composition(portfolio_id, quarter, year)`
Returns the stock composition for a specific portfolio and quarter.

### `calculate_portfolio_metrics(portfolio_id, start_date, end_date)`
Calculates comprehensive portfolio performance metrics for a given period.

## Security (Row Level Security)

### Public Data Access
- Market data, AI scores, fundamentals, technicals, and backtest results are readable by all authenticated users
- Portfolio constituents and performance data are readable by authenticated users

### User-Specific Data Access
- Users can only access and modify their own portfolios, watchlists, and alerts
- All user-specific tables use `auth.uid() = user_id` policies

## Performance Optimizations

### Indexes
- Composite indexes on frequently queried column combinations
- Single-column indexes on foreign keys and commonly filtered columns
- Unique indexes to enforce data integrity

### Triggers
- Automatic timestamp updates using `update_updated_at_column()` function
- Triggers on all tables with `updated_at` columns

## Data Integrity

### Constraints
- Check constraints ensure data validity (positive prices, valid score ranges)
- Foreign key relationships maintain referential integrity
- Unique constraints prevent duplicate records

### Computed Columns
- Automatic calculation of derived metrics (outperformance, win rate, returns)
- Reduces calculation overhead and ensures consistency

## Migration Notes

### Supabase Compatibility
- Uses Supabase-native authentication with `auth.uid()`
- Leverages PostgreSQL extensions (uuid-ossp)
- Implements proper RLS policies for multi-tenant security
- Uses timestamptz for timezone-aware timestamps

### Performance Considerations
- Optimized for read-heavy workloads (stock analysis, portfolio viewing)
- Efficient indexing strategy for complex queries
- Computed columns reduce real-time calculation overhead

## Usage Examples

### Getting Current Top Stocks
```sql
SELECT * FROM current_ai_scores 
ORDER BY ai_score DESC 
LIMIT 10;
```

### Portfolio Performance Analysis
```sql
SELECT * FROM calculate_portfolio_metrics(
  'portfolio-uuid', 
  '2023-01-01', 
  '2024-06-30'
);
```

### Quarterly Portfolio Composition
```sql
SELECT * FROM get_portfolio_composition(
  'portfolio-uuid', 
  'Q2', 
  2024
);
```

## Maintenance

### Regular Tasks
- Update AI scores daily
- Refresh market data after market close
- Archive old backtest results quarterly
- Monitor index performance and query patterns

### Backup Strategy
- Supabase handles automated backups
- Critical data should be exported regularly for additional safety
- Consider point-in-time recovery for production environments