import React, { useState } from 'react';
import { TrendingUp, Calendar, BarChart3, Target, Activity, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface PortfolioStock {
  symbol: string;
  company: string;
  weight: number;
  quarterlyReturn: number;
  logo?: string;
}

interface QuarterData {
  quarter: string;
  period: string;
  portfolioReturn: number;
  niftyReturn: number;
  stocks: PortfolioStock[];
}

const MomentumPortfolio = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('Q2-2024');
  const [showQuarterDropdown, setShowQuarterDropdown] = useState(false);

  // Historical performance data extracted from PDF
  const performanceData = [
    { quarter: 'Q1-2023', portfolioReturn: 8.2, niftyReturn: 5.1 },
    { quarter: 'Q2-2023', portfolioReturn: 12.4, niftyReturn: 7.8 },
    { quarter: 'Q3-2023', portfolioReturn: 15.7, niftyReturn: 9.2 },
    { quarter: 'Q4-2023', portfolioReturn: 18.9, niftyReturn: 11.5 },
    { quarter: 'Q1-2024', portfolioReturn: 22.3, niftyReturn: 13.7 },
    { quarter: 'Q2-2024', portfolioReturn: 25.8, niftyReturn: 15.9 },
  ];

  // Quarterly portfolio data with equal weights and quarterly returns
  const quarterlyData: { [key: string]: QuarterData } = {
    'Q1-2023': {
      quarter: 'Q1-2023',
      period: 'Jan - Mar 2023',
      portfolioReturn: 8.2,
      niftyReturn: 5.1,
      stocks: [
        { symbol: 'RELIANCE', company: 'Reliance Industries Ltd.', weight: 8.33, quarterlyReturn: 12.5, logo: 'https://logo.clearbit.com/ril.com' },
        { symbol: 'TCS', company: 'Tata Consultancy Services Ltd.', weight: 8.33, quarterlyReturn: 15.2, logo: 'https://logo.clearbit.com/tcs.com' },
        { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd.', weight: 8.33, quarterlyReturn: 8.7, logo: 'https://logo.clearbit.com/hdfcbank.com' },
        { symbol: 'INFY', company: 'Infosys Ltd.', weight: 8.33, quarterlyReturn: 11.3, logo: 'https://logo.clearbit.com/infosys.com' },
        { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd.', weight: 8.33, quarterlyReturn: 9.8, logo: 'https://logo.clearbit.com/icicibank.com' },
        { symbol: 'HINDUNILVR', company: 'Hindustan Unilever Ltd.', weight: 8.33, quarterlyReturn: 6.4, logo: 'https://logo.clearbit.com/hul.co.in' },
        { symbol: 'ITC', company: 'ITC Ltd.', weight: 8.33, quarterlyReturn: 4.2, logo: 'https://logo.clearbit.com/itcportal.com' },
        { symbol: 'SBIN', company: 'State Bank of India', weight: 8.33, quarterlyReturn: 7.9, logo: 'https://logo.clearbit.com/sbi.co.in' },
        { symbol: 'BHARTIARTL', company: 'Bharti Airtel Ltd.', weight: 8.33, quarterlyReturn: 13.6, logo: 'https://logo.clearbit.com/airtel.in' },
        { symbol: 'ASIANPAINT', company: 'Asian Paints Ltd.', weight: 8.33, quarterlyReturn: 5.8, logo: 'https://logo.clearbit.com/asianpaints.com' },
        { symbol: 'MARUTI', company: 'Maruti Suzuki India Ltd.', weight: 8.33, quarterlyReturn: 10.4, logo: 'https://logo.clearbit.com/marutisuzuki.com' },
        { symbol: 'KOTAKBANK', company: 'Kotak Mahindra Bank Ltd.', weight: 8.37, quarterlyReturn: 7.1, logo: 'https://logo.clearbit.com/kotak.com' }
      ]
    },
    'Q2-2023': {
      quarter: 'Q2-2023',
      period: 'Apr - Jun 2023',
      portfolioReturn: 12.4,
      niftyReturn: 7.8,
      stocks: [
        { symbol: 'TCS', company: 'Tata Consultancy Services Ltd.', weight: 8.33, quarterlyReturn: 18.7, logo: 'https://logo.clearbit.com/tcs.com' },
        { symbol: 'RELIANCE', company: 'Reliance Industries Ltd.', weight: 8.33, quarterlyReturn: 14.2, logo: 'https://logo.clearbit.com/ril.com' },
        { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd.', weight: 8.33, quarterlyReturn: 11.5, logo: 'https://logo.clearbit.com/hdfcbank.com' },
        { symbol: 'INFY', company: 'Infosys Ltd.', weight: 8.33, quarterlyReturn: 16.8, logo: 'https://logo.clearbit.com/infosys.com' },
        { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd.', weight: 8.33, quarterlyReturn: 12.9, logo: 'https://logo.clearbit.com/icicibank.com' },
        { symbol: 'BHARTIARTL', company: 'Bharti Airtel Ltd.', weight: 8.33, quarterlyReturn: 19.3, logo: 'https://logo.clearbit.com/airtel.in' },
        { symbol: 'HINDUNILVR', company: 'Hindustan Unilever Ltd.', weight: 8.33, quarterlyReturn: 8.1, logo: 'https://logo.clearbit.com/hul.co.in' },
        { symbol: 'TITAN', company: 'Titan Company Ltd.', weight: 8.33, quarterlyReturn: 15.4, logo: 'https://logo.clearbit.com/titan.co.in' },
        { symbol: 'ITC', company: 'ITC Ltd.', weight: 8.33, quarterlyReturn: 6.7, logo: 'https://logo.clearbit.com/itcportal.com' },
        { symbol: 'SBIN', company: 'State Bank of India', weight: 8.33, quarterlyReturn: 9.2, logo: 'https://logo.clearbit.com/sbi.co.in' },
        { symbol: 'ASIANPAINT', company: 'Asian Paints Ltd.', weight: 8.33, quarterlyReturn: 7.3, logo: 'https://logo.clearbit.com/asianpaints.com' },
        { symbol: 'MARUTI', company: 'Maruti Suzuki India Ltd.', weight: 8.37, quarterlyReturn: 4.8, logo: 'https://logo.clearbit.com/marutisuzuki.com' }
      ]
    },
    'Q3-2023': {
      quarter: 'Q3-2023',
      period: 'Jul - Sep 2023',
      portfolioReturn: 15.7,
      niftyReturn: 9.2,
      stocks: [
        { symbol: 'TCS', company: 'Tata Consultancy Services Ltd.', weight: 8.33, quarterlyReturn: 21.3, logo: 'https://logo.clearbit.com/tcs.com' },
        { symbol: 'RELIANCE', company: 'Reliance Industries Ltd.', weight: 8.33, quarterlyReturn: 16.8, logo: 'https://logo.clearbit.com/ril.com' },
        { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd.', weight: 8.33, quarterlyReturn: 13.2, logo: 'https://logo.clearbit.com/hdfcbank.com' },
        { symbol: 'BHARTIARTL', company: 'Bharti Airtel Ltd.', weight: 8.33, quarterlyReturn: 22.4, logo: 'https://logo.clearbit.com/airtel.in' },
        { symbol: 'INFY', company: 'Infosys Ltd.', weight: 8.33, quarterlyReturn: 18.9, logo: 'https://logo.clearbit.com/infosys.com' },
        { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd.', weight: 8.33, quarterlyReturn: 14.7, logo: 'https://logo.clearbit.com/icicibank.com' },
        { symbol: 'TITAN', company: 'Titan Company Ltd.', weight: 8.33, quarterlyReturn: 19.6, logo: 'https://logo.clearbit.com/titan.co.in' },
        { symbol: 'HINDUNILVR', company: 'Hindustan Unilever Ltd.', weight: 8.33, quarterlyReturn: 10.3, logo: 'https://logo.clearbit.com/hul.co.in' },
        { symbol: 'NESTLEIND', company: 'Nestle India Ltd.', weight: 8.33, quarterlyReturn: 17.2, logo: 'https://logo.clearbit.com/nestle.in' },
        { symbol: 'ITC', company: 'ITC Ltd.', weight: 8.33, quarterlyReturn: 8.5, logo: 'https://logo.clearbit.com/itcportal.com' },
        { symbol: 'SBIN', company: 'State Bank of India', weight: 8.33, quarterlyReturn: 11.8, logo: 'https://logo.clearbit.com/sbi.co.in' },
        { symbol: 'ASIANPAINT', company: 'Asian Paints Ltd.', weight: 8.37, quarterlyReturn: 9.1, logo: 'https://logo.clearbit.com/asianpaints.com' }
      ]
    },
    'Q4-2023': {
      quarter: 'Q4-2023',
      period: 'Oct - Dec 2023',
      portfolioReturn: 18.9,
      niftyReturn: 11.5,
      stocks: [
        { symbol: 'TCS', company: 'Tata Consultancy Services Ltd.', weight: 8.33, quarterlyReturn: 24.7, logo: 'https://logo.clearbit.com/tcs.com' },
        { symbol: 'RELIANCE', company: 'Reliance Industries Ltd.', weight: 8.33, quarterlyReturn: 19.3, logo: 'https://logo.clearbit.com/ril.com' },
        { symbol: 'BHARTIARTL', company: 'Bharti Airtel Ltd.', weight: 8.33, quarterlyReturn: 26.1, logo: 'https://logo.clearbit.com/airtel.in' },
        { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd.', weight: 8.33, quarterlyReturn: 15.8, logo: 'https://logo.clearbit.com/hdfcbank.com' },
        { symbol: 'TITAN', company: 'Titan Company Ltd.', weight: 8.33, quarterlyReturn: 23.4, logo: 'https://logo.clearbit.com/titan.co.in' },
        { symbol: 'INFY', company: 'Infosys Ltd.', weight: 8.33, quarterlyReturn: 21.6, logo: 'https://logo.clearbit.com/infosys.com' },
        { symbol: 'NESTLEIND', company: 'Nestle India Ltd.', weight: 8.33, quarterlyReturn: 20.9, logo: 'https://logo.clearbit.com/nestle.in' },
        { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd.', weight: 8.33, quarterlyReturn: 17.2, logo: 'https://logo.clearbit.com/icicibank.com' },
        { symbol: 'HINDUNILVR', company: 'Hindustan Unilever Ltd.', weight: 8.33, quarterlyReturn: 12.7, logo: 'https://logo.clearbit.com/hul.co.in' },
        { symbol: 'HCLTECH', company: 'HCL Technologies Ltd.', weight: 8.33, quarterlyReturn: 14.5, logo: 'https://logo.clearbit.com/hcltech.com' },
        { symbol: 'ITC', company: 'ITC Ltd.', weight: 8.33, quarterlyReturn: 10.8, logo: 'https://logo.clearbit.com/itcportal.com' },
        { symbol: 'SBIN', company: 'State Bank of India', weight: 8.37, quarterlyReturn: 13.9, logo: 'https://logo.clearbit.com/sbi.co.in' }
      ]
    },
    'Q1-2024': {
      quarter: 'Q1-2024',
      period: 'Jan - Mar 2024',
      portfolioReturn: 22.3,
      niftyReturn: 13.7,
      stocks: [
        { symbol: 'TCS', company: 'Tata Consultancy Services Ltd.', weight: 8.33, quarterlyReturn: 28.4, logo: 'https://logo.clearbit.com/tcs.com' },
        { symbol: 'BHARTIARTL', company: 'Bharti Airtel Ltd.', weight: 8.33, quarterlyReturn: 30.2, logo: 'https://logo.clearbit.com/airtel.in' },
        { symbol: 'RELIANCE', company: 'Reliance Industries Ltd.', weight: 8.33, quarterlyReturn: 21.8, logo: 'https://logo.clearbit.com/ril.com' },
        { symbol: 'TITAN', company: 'Titan Company Ltd.', weight: 8.33, quarterlyReturn: 27.1, logo: 'https://logo.clearbit.com/titan.co.in' },
        { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd.', weight: 8.33, quarterlyReturn: 18.5, logo: 'https://logo.clearbit.com/hdfcbank.com' },
        { symbol: 'NESTLEIND', company: 'Nestle India Ltd.', weight: 8.33, quarterlyReturn: 24.6, logo: 'https://logo.clearbit.com/nestle.in' },
        { symbol: 'INFY', company: 'Infosys Ltd.', weight: 8.33, quarterlyReturn: 23.9, logo: 'https://logo.clearbit.com/infosys.com' },
        { symbol: 'HCLTECH', company: 'HCL Technologies Ltd.', weight: 8.33, quarterlyReturn: 19.7, logo: 'https://logo.clearbit.com/hcltech.com' },
        { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd.', weight: 8.33, quarterlyReturn: 20.3, logo: 'https://logo.clearbit.com/icicibank.com' },
        { symbol: 'HINDUNILVR', company: 'Hindustan Unilever Ltd.', weight: 8.33, quarterlyReturn: 15.8, logo: 'https://logo.clearbit.com/hul.co.in' },
        { symbol: 'WIPRO', company: 'Wipro Ltd.', weight: 8.33, quarterlyReturn: 16.4, logo: 'https://logo.clearbit.com/wipro.com' },
        { symbol: 'AXISBANK', company: 'Axis Bank Ltd.', weight: 8.37, quarterlyReturn: 17.9, logo: 'https://logo.clearbit.com/axisbank.com' }
      ]
    },
    'Q2-2024': {
      quarter: 'Q2-2024',
      period: 'Apr - Jun 2024',
      portfolioReturn: 25.8,
      niftyReturn: 15.9,
      stocks: [
        { symbol: 'TCS', company: 'Tata Consultancy Services Ltd.', weight: 8.33, quarterlyReturn: 32.1, logo: 'https://logo.clearbit.com/tcs.com' },
        { symbol: 'BHARTIARTL', company: 'Bharti Airtel Ltd.', weight: 8.33, quarterlyReturn: 34.8, logo: 'https://logo.clearbit.com/airtel.in' },
        { symbol: 'TITAN', company: 'Titan Company Ltd.', weight: 8.33, quarterlyReturn: 31.2, logo: 'https://logo.clearbit.com/titan.co.in' },
        { symbol: 'RELIANCE', company: 'Reliance Industries Ltd.', weight: 8.33, quarterlyReturn: 24.7, logo: 'https://logo.clearbit.com/ril.com' },
        { symbol: 'NESTLEIND', company: 'Nestle India Ltd.', weight: 8.33, quarterlyReturn: 28.9, logo: 'https://logo.clearbit.com/nestle.in' },
        { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd.', weight: 8.33, quarterlyReturn: 21.4, logo: 'https://logo.clearbit.com/hdfcbank.com' },
        { symbol: 'HCLTECH', company: 'HCL Technologies Ltd.', weight: 8.33, quarterlyReturn: 26.3, logo: 'https://logo.clearbit.com/hcltech.com' },
        { symbol: 'INFY', company: 'Infosys Ltd.', weight: 8.33, quarterlyReturn: 27.8, logo: 'https://logo.clearbit.com/infosys.com' },
        { symbol: 'ICICIBANK', company: 'ICICI Bank Ltd.', weight: 8.33, quarterlyReturn: 23.6, logo: 'https://logo.clearbit.com/icicibank.com' },
        { symbol: 'WIPRO', company: 'Wipro Ltd.', weight: 8.33, quarterlyReturn: 19.2, logo: 'https://logo.clearbit.com/wipro.com' },
        { symbol: 'HINDUNILVR', company: 'Hindustan Unilever Ltd.', weight: 8.33, quarterlyReturn: 18.7, logo: 'https://logo.clearbit.com/hul.co.in' },
        { symbol: 'AXISBANK', company: 'Axis Bank Ltd.', weight: 8.37, quarterlyReturn: 20.8, logo: 'https://logo.clearbit.com/axisbank.com' }
      ]
    }
  };

  const currentQuarterData = quarterlyData[selectedQuarter];
  const availableQuarters = Object.keys(quarterlyData).reverse(); // Most recent first

  // Calculate overall statistics
  const avgPortfolioReturn = performanceData.reduce((sum, data) => sum + data.portfolioReturn, 0) / performanceData.length;
  const avgNiftyReturn = performanceData.reduce((sum, data) => sum + data.niftyReturn, 0) / performanceData.length;
  const outperformance = avgPortfolioReturn - avgNiftyReturn;

  // Chart component for performance comparison
  const PerformanceChart = () => {
    const maxValue = Math.max(...performanceData.map(d => Math.max(d.portfolioReturn, d.niftyReturn)));
    
    // Responsive chart dimensions
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    
    const chartHeight = isMobile ? 200 : isTablet ? 250 : 300;
    const barWidth = isMobile ? 25 : isTablet ? 35 : 40;
    const spacing = isMobile ? 15 : 20;
    const chartWidth = performanceData.length * (barWidth * 2 + spacing) + spacing;

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Historical Performance Comparison</h2>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Momentum Portfolio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Nifty 500</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="w-full">
          <div className="relative w-full" style={{ height: `${chartHeight + 80}px` }}>
            <svg width="100%" height={chartHeight + 80} viewBox={`0 0 ${Math.max(chartWidth, 320)} ${chartHeight + 80}`} className="w-full h-full">
              {/* Y-axis labels */}
              {[0, 5, 10, 15, 20, 25, 30].map((value) => (
                <g key={value}>
                  <line
                    x1={spacing}
                    y1={chartHeight - (value / maxValue) * chartHeight + 20}
                    x2={chartWidth - spacing}
                    y2={chartHeight - (value / maxValue) * chartHeight + 20}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x={spacing - 5}
                    y={chartHeight - (value / maxValue) * chartHeight + 25}
                    textAnchor="end"
                    className="text-xs sm:text-sm fill-gray-600"
                  >
                    {value}%
                  </text>
                </g>
              ))}

              {/* Bars */}
              {performanceData.map((data, index) => {
                const x = spacing + index * (barWidth * 2 + spacing);
                const portfolioHeight = (data.portfolioReturn / maxValue) * chartHeight;
                const niftyHeight = (data.niftyReturn / maxValue) * chartHeight;

                return (
                  <g key={data.quarter}>
                    {/* Portfolio bar */}
                    <rect
                      x={x}
                      y={chartHeight - portfolioHeight + 20}
                      width={barWidth}
                      height={portfolioHeight}
                      fill="#10b981"
                      className="hover:opacity-80 transition-opacity"
                    />
                    {/* Portfolio value label */}
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight - portfolioHeight + 15}
                      textAnchor="middle"
                      className="text-xs sm:text-sm fill-gray-800 font-medium"
                    >
                      {data.portfolioReturn.toFixed(1)}%
                    </text>

                    {/* Nifty bar */}
                    <rect
                      x={x + barWidth}
                      y={chartHeight - niftyHeight + 20}
                      width={barWidth}
                      height={niftyHeight}
                      fill="#3b82f6"
                      className="hover:opacity-80 transition-opacity"
                    />
                    {/* Nifty value label */}
                    <text
                      x={x + barWidth + barWidth / 2}
                      y={chartHeight - niftyHeight + 15}
                      textAnchor="middle"
                      className="text-xs sm:text-sm fill-gray-800 font-medium"
                    >
                      {data.niftyReturn.toFixed(1)}%
                    </text>

                    {/* X-axis label */}
                    <text
                      x={x + barWidth}
                      y={chartHeight + 40}
                      textAnchor="middle"
                      className="text-xs sm:text-sm fill-gray-600"
                    >
                      {data.quarter}
                    </text>
                  </g>
                );
              })}

              {/* Y-axis title */}
              <text
                x={15}
                y={chartHeight / 2}
                textAnchor="middle"
                transform={`rotate(-90, 15, ${chartHeight / 2})`}
                className="text-xs sm:text-sm fill-gray-700 font-medium"
              >
                Returns (%)
              </text>

              {/* X-axis title */}
              <text
                x={chartWidth / 2}
                y={chartHeight + 55}
                textAnchor="middle"
                className="text-xs sm:text-sm fill-gray-700 font-medium"
              >
                Quarter
              </text>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const getReturnColor = (returns: number) => {
    if (returns >= 0) return 'text-green-600';
    return 'text-red-600';
  };

  const getReturnIcon = (returns: number) => {
    if (returns >= 0) return <ArrowUp className="w-4 h-4" />;
    return <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">Passive Wealth Momentum Portfolio</h1>
            <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto px-4">
              A systematic momentum-based investment strategy that rebalances quarterly to capture market trends. 
              Active since 2023 with consistent outperformance against Nifty 500.
            </p>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0 mx-auto sm:mx-0">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-600">Avg Portfolio Return</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{avgPortfolioReturn.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0 mx-auto sm:mx-0">
                <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-600">Avg Nifty 500 Return</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{avgNiftyReturn.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0 mx-auto sm:mx-0">
                <Target className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-600">Outperformance</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">+{outperformance.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2 sm:mb-0 mx-auto sm:mx-0">
                <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-600">Rebalancing</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">Quarterly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <PerformanceChart />

        {/* Quarter Selection and Portfolio */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Portfolio Constituents</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Select a quarter to view the specific portfolio composition for that period
                </p>
              </div>
              
              {/* Quarter Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowQuarterDropdown(!showQuarterDropdown)}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{currentQuarterData.period}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showQuarterDropdown && (
                  <div className="absolute right-0 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    {availableQuarters.map((quarter) => (
                      <button
                        key={quarter}
                        onClick={() => {
                          setSelectedQuarter(quarter);
                          setShowQuarterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          selectedQuarter === quarter ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {quarterlyData[quarter].period}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio Performance for Selected Quarter */}
          <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Portfolio Return</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {currentQuarterData.portfolioReturn.toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Nifty 500 Return</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {currentQuarterData.niftyReturn.toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Outperformance</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  +{(currentQuarterData.portfolioReturn - currentQuarterData.niftyReturn).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Portfolio Holdings Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-fixed min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[10%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="w-[50%] px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="w-[20%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="w-[20%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quarterly Returns
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentQuarterData.stocks.map((stock, index) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 text-center text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
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
                            <span className="text-blue-600 font-semibold text-xs sm:text-sm">
                              {stock.symbol.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{stock.symbol}</div>
                          <div className="text-xs sm:text-sm text-gray-500 truncate">{stock.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-center">
                      <div className="text-sm font-medium text-gray-900">{stock.weight.toFixed(2)}%</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className={`flex items-center justify-center space-x-1 ${getReturnColor(stock.quarterlyReturn)}`}>
                        {getReturnIcon(stock.quarterlyReturn)}
                        <span className="text-sm font-bold">
                          {stock.quarterlyReturn >= 0 ? '+' : ''}{stock.quarterlyReturn.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Portfolio Methodology */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Methodology</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Investment Strategy</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Momentum-based stock selection</li>
                  <li>• Focus on large-cap stocks with strong price momentum</li>
                  <li>• Systematic rebalancing every 3 months</li>
                  <li>• Equal-weighted position sizing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Key Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Active since Q1 2023</li>
                  <li>• 12 stock concentrated portfolio</li>
                  <li>• Quarterly rebalancing frequency</li>
                  <li>• Benchmark: Nifty 500 Index</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison Table */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Quarterly Performance Comparison
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Detailed quarter-by-quarter performance vs Nifty 500 benchmark
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[15%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quarter
                  </th>
                  <th className="w-[25%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="w-[20%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Momentum Portfolio
                  </th>
                  <th className="w-[20%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nifty 500
                  </th>
                  <th className="w-[20%] px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outperformance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.slice().reverse().map((data) => {
                  const outperf = data.portfolioReturn - data.niftyReturn;
                  return (
                    <tr key={data.quarter} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 text-center text-sm font-medium text-gray-900">
                        {data.quarter}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-center text-sm text-gray-600">
                        {quarterlyData[data.quarter]?.period || 'N/A'}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-bold text-green-600">
                            {data.portfolioReturn.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-bold text-blue-600">
                            {data.niftyReturn.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <ArrowUp className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-bold text-orange-600">
                            +{outperf.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MomentumPortfolio;