import React from 'react';
import { TrendingUp, Smartphone, BarChart3 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              AI-Powered Stock Picking
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Smart stock analysis, powered by artificial intelligence. 
              Get AI-driven insights and make better investment decisions.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>AI analyzes 10,000+ stocks daily</span>
              </div>
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-green-400" />
                <span>Real-time market insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-green-400" />
                <span>Enhanced risk adjusted returns</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                Start Free Trial
              </button>
              <button className="border border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                View Demo
              </button>
            </div>
          </div>

          {/* Right Content - Mobile App Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-96 bg-white rounded-3xl shadow-2xl p-4">
                <div className="bg-gray-100 rounded-2xl h-full p-4">
                  <div className="text-center mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">PW</span>
                    </div>
                    <h3 className="text-gray-800 font-semibold">Top Picks</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { symbol: 'TCS', price: '₹3,542', change: '+2.1%', positive: true, logo: 'https://logo.clearbit.com/tcs.com' },
                      { symbol: 'RELIANCE', price: '₹2,457', change: '+1.8%', positive: true, logo: 'https://logo.clearbit.com/ril.com' },
                      { symbol: 'HDFCBANK', price: '₹1,635', change: '-0.5%', positive: false, logo: 'https://logo.clearbit.com/hdfcbank.com' },
                    ].map((stock, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
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
                            <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center" style={{ display: 'none' }}>
                              <span className="text-white font-bold text-xs">
                                {stock.symbol.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">{stock.symbol}</div>
                            <div className="text-xs text-gray-600">{stock.price}</div>
                          </div>
                        </div>
                        <div className={`text-xs font-medium ${stock.positive ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-3 text-white text-center">
                      <div className="text-sm">AI Score</div>
                      <div className="text-2xl font-bold">8.7</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;