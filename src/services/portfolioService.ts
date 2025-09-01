import { supabase } from '../lib/supabase';
import type { PortfolioPerformance, PortfolioConstituent, AIScore, BacktestResult } from '../lib/supabase';

export class PortfolioService {
  // Get portfolio performance data
  static async getPortfolioPerformance(): Promise<PortfolioPerformance[]> {
    const { data, error } = await supabase
      .from('portfolio_performance')
      .select('*')
      .order('year', { ascending: false })
      .order('quarter', { ascending: false });

    if (error) {
      console.error('Error fetching portfolio performance:', error);
      throw error;
    }

    return data || [];
  }

  // Get portfolio constituents for a specific quarter
  static async getPortfolioConstituents(quarter: string, year: number): Promise<PortfolioConstituent[]> {
    const { data, error } = await supabase
      .from('portfolio_constituents')
      .select('*')
      .eq('quarter', quarter)
      .eq('year', year)
      .order('weight', { ascending: false });

    if (error) {
      console.error('Error fetching portfolio constituents:', error);
      throw error;
    }

    return data || [];
  }

  // Get current AI scores
  static async getCurrentAIScores(): Promise<AIScore[]> {
    const { data, error } = await supabase
      .from('current_ai_scores')
      .select('*')
      .order('ai_score', { ascending: false });

    if (error) {
      console.error('Error fetching AI scores:', error);
      throw error;
    }

    return data || [];
  }

  // Get backtest results
  static async getBacktestResults(strategyName?: string): Promise<BacktestResult[]> {
    let query = supabase
      .from('backtest_results')
      .select('*')
      .order('buy_date', { ascending: false });

    if (strategyName) {
      query = query.eq('strategy_name', strategyName);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching backtest results:', error);
      throw error;
    }

    return data || [];
  }

  // Get portfolio metrics using the database function
  static async getPortfolioMetrics(
    portfolioId: string, 
    startDate: string, 
    endDate: string
  ): Promise<{
    total_return: number;
    annualized_return: number;
    volatility: number;
    sharpe_ratio: number;
    max_drawdown: number;
  } | null> {
    const { data, error } = await supabase
      .rpc('calculate_portfolio_metrics', {
        p_portfolio_id: portfolioId,
        p_start_date: startDate,
        p_end_date: endDate
      });

    if (error) {
      console.error('Error calculating portfolio metrics:', error);
      throw error;
    }

    return data?.[0] || null;
  }

  // Get portfolio composition using the database function
  static async getPortfolioComposition(
    portfolioId: string,
    quarter: string,
    year: number
  ): Promise<PortfolioConstituent[]> {
    const { data, error } = await supabase
      .rpc('get_portfolio_composition', {
        p_portfolio_id: portfolioId,
        p_quarter: quarter,
        p_year: year
      });

    if (error) {
      console.error('Error fetching portfolio composition:', error);
      throw error;
    }

    return data || [];
  }

  // Calculate performance statistics
  static calculatePerformanceStats(performance: PortfolioPerformance[]) {
    if (performance.length === 0) {
      return {
        avgPortfolioReturn: 0,
        avgBenchmarkReturn: 0,
        avgOutperformance: 0,
        totalQuarters: 0,
        winRate: 0
      };
    }

    const avgPortfolioReturn = performance.reduce((sum, p) => sum + p.portfolio_return, 0) / performance.length;
    const avgBenchmarkReturn = performance.reduce((sum, p) => sum + p.benchmark_return, 0) / performance.length;
    const avgOutperformance = avgPortfolioReturn - avgBenchmarkReturn;
    const winningQuarters = performance.filter(p => p.outperformance > 0).length;
    const winRate = (winningQuarters / performance.length) * 100;

    return {
      avgPortfolioReturn,
      avgBenchmarkReturn,
      avgOutperformance,
      totalQuarters: performance.length,
      winRate
    };
  }
}