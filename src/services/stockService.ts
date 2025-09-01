import { supabase } from '../lib/supabase';
import type { AIScore, MarketData } from '../lib/supabase';

export class StockService {
  // Get current stock prices and AI scores
  static async getStockData(): Promise<AIScore[]> {
    const { data, error } = await supabase
      .from('ai_scores')
      .select('*')
      .eq('date', new Date().toISOString().split('T')[0])
      .order('ai_score', { ascending: false });

    if (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }

    return data || [];
  }

  // Get historical market data for a stock
  static async getMarketData(
    symbol: string, 
    startDate?: string, 
    endDate?: string
  ): Promise<MarketData[]> {
    let query = supabase
      .from('market_data')
      .select('*')
      .eq('stock_symbol', symbol)
      .order('date', { ascending: false });

    if (startDate) {
      query = query.gte('date', startDate);
    }

    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }

    return data || [];
  }

  // Get top stocks by AI score
  static async getTopStocks(limit: number = 20): Promise<AIScore[]> {
    const { data, error } = await supabase
      .from('current_ai_scores')
      .select('*')
      .order('ai_score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching top stocks:', error);
      throw error;
    }

    return data || [];
  }

  // Search stocks by symbol or company name
  static async searchStocks(query: string): Promise<AIScore[]> {
    const { data, error } = await supabase
      .from('current_ai_scores')
      .select('*')
      .or(`stock_symbol.ilike.%${query}%,company_name.ilike.%${query}%`)
      .order('ai_score', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error searching stocks:', error);
      throw error;
    }

    return data || [];
  }

  // Get stock performance over time
  static async getStockPerformance(symbol: string, days: number = 30): Promise<MarketData[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.getMarketData(symbol, startDate.toISOString().split('T')[0]);
  }

  // Calculate price change percentage
  static calculatePriceChange(currentPrice: number, previousPrice: number): number {
    if (previousPrice === 0) return 0;
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  }

  // Format price for display
  static formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  }

  // Format market cap for display
  static formatMarketCap(marketCap: number): string {
    if (marketCap >= 100000) {
      return `₹${(marketCap / 100000).toFixed(1)}L Cr`;
    } else if (marketCap >= 1000) {
      return `₹${(marketCap / 1000).toFixed(1)}K Cr`;
    }
    return `₹${marketCap.toFixed(0)} Cr`;
  }
}