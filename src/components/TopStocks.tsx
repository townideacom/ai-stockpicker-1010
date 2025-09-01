import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import StockTable from './StockTable';
import { mockStockData } from '../data/mockData';

const TopStocks = () => {
  const [stocks, setStocks] = useState(mockStockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Top Stocks</h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
              Discover the highest-rated stocks analyzed by our AI system. 
              Make informed investment decisions with comprehensive stock analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Stocks Analyzed</p>
                <p className="text-2xl font-bold text-green-600">10,000+</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">AI Models</p>
                <p className="text-2xl font-bold text-blue-600">15+</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="text-orange-600 font-bold text-lg">★</div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg AI Score</p>
                <p className="text-2xl font-bold text-orange-600">8.2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <StockTable stocks={stocks} loading={loading} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TopStocks;