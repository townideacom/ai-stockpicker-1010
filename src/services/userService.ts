import { supabase } from '../lib/supabase';
import type { UserPortfolio, Watchlist, Alert } from '../lib/supabase';

export class UserService {
  // Get user portfolios
  static async getUserPortfolios(userId: string): Promise<UserPortfolio[]> {
    const { data, error } = await supabase
      .from('user_portfolios')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user portfolios:', error);
      throw error;
    }

    return data || [];
  }

  // Create user portfolio
  static async createUserPortfolio(portfolio: Omit<UserPortfolio, 'id' | 'created_at' | 'updated_at'>): Promise<UserPortfolio> {
    const { data, error } = await supabase
      .from('user_portfolios')
      .insert(portfolio)
      .select()
      .single();

    if (error) {
      console.error('Error creating user portfolio:', error);
      throw error;
    }

    return data;
  }

  // Update user portfolio
  static async updateUserPortfolio(id: string, updates: Partial<UserPortfolio>): Promise<UserPortfolio> {
    const { data, error } = await supabase
      .from('user_portfolios')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user portfolio:', error);
      throw error;
    }

    return data;
  }

  // Delete user portfolio
  static async deleteUserPortfolio(id: string): Promise<void> {
    const { error } = await supabase
      .from('user_portfolios')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user portfolio:', error);
      throw error;
    }
  }

  // Get user watchlists
  static async getUserWatchlists(userId: string): Promise<Watchlist[]> {
    const { data, error } = await supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user watchlists:', error);
      throw error;
    }

    return data || [];
  }

  // Add stock to watchlist
  static async addToWatchlist(watchlistItem: Omit<Watchlist, 'id' | 'created_at' | 'updated_at'>): Promise<Watchlist> {
    const { data, error } = await supabase
      .from('watchlists')
      .insert(watchlistItem)
      .select()
      .single();

    if (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }

    return data;
  }

  // Remove stock from watchlist
  static async removeFromWatchlist(id: string): Promise<void> {
    const { error } = await supabase
      .from('watchlists')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error removing from watchlist:', error);
      throw error;
    }
  }

  // Get user alerts
  static async getUserAlerts(userId: string): Promise<Alert[]> {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user alerts:', error);
      throw error;
    }

    return data || [];
  }

  // Create alert
  static async createAlert(alert: Omit<Alert, 'id' | 'created_at' | 'updated_at'>): Promise<Alert> {
    const { data, error } = await supabase
      .from('alerts')
      .insert(alert)
      .select()
      .single();

    if (error) {
      console.error('Error creating alert:', error);
      throw error;
    }

    return data;
  }

  // Update alert
  static async updateAlert(id: string, updates: Partial<Alert>): Promise<Alert> {
    const { data, error } = await supabase
      .from('alerts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating alert:', error);
      throw error;
    }

    return data;
  }

  // Delete alert
  static async deleteAlert(id: string): Promise<void> {
    const { error } = await supabase
      .from('alerts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting alert:', error);
      throw error;
    }
  }
}