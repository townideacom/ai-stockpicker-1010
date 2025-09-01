import React, { useState } from 'react';
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown, Info, Filter, BarChart3 } from 'lucide-react';
import { Stock } from '../types/Stock';

interface StockTableProps {
  stocks: Stock[];
  loading: boolean;
}

interface FilterState {
  fundamental: { min: number; max: number };
  technical: { min: number; max: number };
  sentiment: { min: number; max: number };
  valuation: { min: number; max: number };
  industry: { min: number; max: number };
  aiScore: { min: number; max: number };
}

const StockTable: React.FC<StockTableProps> = ({ stocks, loading }) => {
  const [sortField, setSortField] = useState<keyof Stock>('aiScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    fundamental: { min: 0, max: 10 },
    technical: { min: 0, max: 10 },
    sentiment: { min: 0, max: 10 },
    valuation: { min: 0, max: 10 },
    industry: { min: 0, max: 10 },
    aiScore: { min: 0, max: 10 }
  });
  const itemsPerPage = 20;

  const handleSort = (field: keyof Stock) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleFilterChange = (category: keyof FilterState, type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }));
    setCurrentPage(1);
  };

  const filteredStocks = stocks.filter(stock => {
    return (
      stock.fundamental >= filters.fundamental.min && stock.fundamental <= filters.fundamental.max &&
      stock.technical >= filters.technical.min && stock.technical <= filters.technical.max &&
      stock.sentiment >= filters.sentiment.min && stock.sentiment <= filters.sentiment.max &&
      stock.valuation >= filters.valuation.min && stock.valuation <= filters.valuation.max &&
      stock.industry >= filters.industry.min && stock.industry <= filters.industry.max &&
      stock.aiScore >= filters.aiScore.min && stock.aiScore <= filters.aiScore.max
    );
  });

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return sortDirection === 'asc' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const paginatedStocks = sortedStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedStocks.length / itemsPerPage);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Top Popular Stocks Ranked by Passive Wealth AI
        </h2>
        <p className="text-gray-600">
          Discover AI-based stocks with market cap &gt; 2B and above &gt; 10M. 
          The higher the score, the higher the probability of beating the market in the next 3 months.
        </p>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <div className="text-sm text-gray-600">
            Showing {sortedStocks.length} of {stocks.length} stocks
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4 bg-white rounded-lg border">
            {Object.entries(filters).map(([category, range]) => (
              <div key={category} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {category === 'aiScore' ? 'AI Score' : category}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={range.min}
                    onChange={(e) => handleFilterChange(category as keyof FilterState, 'min', parseFloat(e.target.value))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={range.max}
                    onChange={(e) => handleFilterChange(category as keyof FilterState, 'max', parseFloat(e.target.value))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed min-w-[1200px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-[8%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th 
                className="w-[20%] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('symbol')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  {sortField === 'symbol' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="w-[10%] px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="w-[12%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('aiScore')}
              >
                <div className="flex items-center space-x-1">
                  <span>AI Score</span>
                  {sortField === 'aiScore' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="w-[10%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('fundamental')}
              >
                <div className="flex items-center space-x-1">
                  <span>Fundamental</span>
                  {sortField === 'fundamental' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="w-[10%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('technical')}
              >
                <div className="flex items-center space-x-1">
                  <span>Technical</span>
                  {sortField === 'technical' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="w-[10%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('sentiment')}
              >
                <div className="flex items-center space-x-1">
                  <span>Sentiment</span>
                  {sortField === 'sentiment' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="w-[10%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('valuation')}
              >
                <div className="flex items-center space-x-1">
                  <span>Valuation</span>
                  {sortField === 'valuation' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th 
                className="w-[10%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('industry')}
              >
                <div className="flex items-center space-x-1">
                  <span>Industry</span>
                  {sortField === 'industry' && (
                    sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th className="w-[10%] px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trade Ranking
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedStocks.map((stock, index) => (
              <tr key={stock.symbol} className="hover:bg-gray-50">
                <td className="px-3 py-4 text-center text-sm font-medium text-gray-900">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {stock.logo ? (
                        <img 
                          src={stock.logo} 
                          alt={`${stock.symbol} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center" style={{ display: stock.logo ? 'none' : 'flex' }}>
                        <span className="text-blue-600 font-semibold text-xs">
                          {stock.symbol.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-xs text-gray-500 truncate" title={stock.company}>
                        {stock.company}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-right text-sm font-medium text-gray-900">
                  ₹{stock.price.toFixed(0)}
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className={`w-16 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-md ${getScoreColor(stock.aiScore)} border border-white transform hover:scale-105 transition-transform`}>
                        <span className="flex items-center space-x-1">
                          <BarChart3 className="w-3 h-3" />
                          <span>{stock.aiScore.toFixed(1)}</span>
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white flex items-center justify-center animate-pulse">
                        <span className="text-xs text-yellow-800 font-bold">★</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center">
                    <div className={`w-10 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getScoreColor(stock.fundamental)}`}>
                    {stock.fundamental}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center">
                    <div className={`w-10 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getScoreColor(stock.technical)}`}>
                    {stock.technical}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center">
                    <div className={`w-10 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getScoreColor(stock.sentiment)}`}>
                    {stock.sentiment}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center">
                    <div className={`w-10 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getScoreColor(stock.valuation)}`}>
                    {stock.valuation}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex justify-center">
                    <div className={`w-10 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getScoreColor(stock.industry)}`}>
                    {stock.industry}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="text-sm font-medium text-blue-600">
                    {stock.tradeRanking}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-3 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedStocks.length)} of {sortedStocks.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Backtest History Button */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/backtest"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Backtest History
            </a>
            <a
              href="/momentum"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Momentum Portfolio
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Explore our systematic investment strategies and historical performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockTable;