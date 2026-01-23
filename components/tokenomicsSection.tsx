import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Shield, Lock, Users, Coins, TrendingUp, Database, ExternalLink, CheckCircle } from 'lucide-react';

const Card: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`rounded-lg ${className}`}>{children}</div>
);

export default function TokenomicsSection() {
  const allocationData = [
    { name: 'Ecosystem Treasury', value: 40, tokens: '7,200,000,000', color: '#dba640' },
    { name: 'Corporate Incentives', value: 20, tokens: '3,600,000,000', color: '#5cb89f' },
    { name: 'Liquidity & Exchanges', value: 15, tokens: '2,700,000,000', color: '#c49636' },
    { name: 'Team & Advisors', value: 10, tokens: '1,800,000,000', color: '#4fa88d' },
    { name: 'Community & Marketing', value: 10, tokens: '1,800,000,000', color: '#e8c469' },
    { name: 'Strategic Reserves', value: 5, tokens: '900,000,000', color: '#6bc4ad' }
  ];

  const keyMetrics = [
    { icon: Coins, label: 'Total Supply', value: '18B', subtitle: 'MDAO tokens (Fixed)' },
    { icon: TrendingUp, label: 'Initial Circulation', value: '1.8B', subtitle: '10% of total supply' },
    { icon: Shield, label: 'Tax Structure', value: '0%', subtitle: 'No buy/sell taxes' },
    { icon: Database, label: 'Token Standard', value: 'BEP-20', subtitle: 'BNB Smart Chain' }
  ];

  const tokenInfo = [
    { label: 'Token Name', value: 'MLEE DAO' },
    { label: 'Symbol', value: 'MDAO' },
    { label: 'Network', value: 'BNB Smart Chain' },
    { label: 'Decimals', value: '18' },
    { label: 'Total Supply', value: '18,000,000,000' },
    { label: 'Chain ID', value: '56 (BSC Mainnet)' }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-1">{payload[0].payload.name}</p>
          <p className="text-yellow-400 font-bold">{payload[0].value}%</p>
          <p className="text-gray-300 text-sm">{payload[0].payload.tokens} MDAO</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section id="tokenomics" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-green-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Tokenomics
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl px-4">
            A sustainable and governance-focused economic model designed for long-term value creation and community empowerment
          </p>
        </div>

        {/* BscScan Verification Button */}
        <div className="flex justify-center mb-12">
          <a 
            href="https://bscscan.com/token/YOUR_CONTRACT_ADDRESS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" />
            Verified on BscScan
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card 
                key={index}
                className="p-4 sm:p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <h4 className="font-semibold mb-1 text-white text-sm sm:text-base lg:text-lg">{metric.label}</h4>
                <p className="text-xs sm:text-sm text-gray-400">{metric.subtitle}</p>
              </Card>
            );
          })}
        </div>

        {/* Allocation Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Pie Chart */}
          <Card className="p-4 sm:p-6 lg:p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white text-center">Token Allocation</h3>
            <ResponsiveContainer width="100%" height={300} className="sm:h-96">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={window.innerWidth < 640 ? 80 : 120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Allocation Details */}
          <Card className="p-4 sm:p-6 lg:p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Distribution Breakdown</h3>
            <div className="space-y-4 sm:space-y-5">
              {allocationData.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div 
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white font-semibold text-sm sm:text-base">{item.name}</span>
                    </div>
                    <span className="text-yellow-400 font-bold text-sm sm:text-base">{item.value}%</span>
                  </div>
                  <div className="ml-5 sm:ml-7 mb-3">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">{item.tokens} MDAO</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Allocation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 backdrop-blur-sm rounded-xl hover:border-yellow-500/40 transition-all">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
              <h4 className="text-lg sm:text-xl font-bold text-white">Ecosystem Treasury</h4>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">40% - 7.2B MDAO</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Controlled via DAO governance for grants, partnerships, R&D, and ecosystem expansion across target industries.
            </p>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 backdrop-blur-sm rounded-xl hover:border-green-500/40 transition-all">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
              <h4 className="text-lg sm:text-xl font-bold text-white">Corporate Incentives</h4>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-400 mb-2">20% - 3.6B MDAO</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Reserved for verified participants based on actual involvement and contribution to the ecosystem.
            </p>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/30 backdrop-blur-sm rounded-xl hover:border-yellow-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
              <h4 className="text-lg sm:text-xl font-bold text-white">Liquidity & Exchanges</h4>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">15% - 2.7B MDAO</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Used for DEX liquidity and future listings, released in stages to maintain market stability.
            </p>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/30 backdrop-blur-sm rounded-xl hover:border-green-500/50 transition-all">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
              <h4 className="text-lg sm:text-xl font-bold text-white">Team & Advisors</h4>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-400 mb-2">10% - 1.8B MDAO</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              For founders, developers, and advisors, with vesting tied to long-term milestones and project success.
            </p>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/25 backdrop-blur-sm rounded-xl hover:border-yellow-500/45 transition-all">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
              <h4 className="text-lg sm:text-xl font-bold text-white">Community & Marketing</h4>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">10% - 1.8B MDAO</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Supports structured awareness and participation initiatives focused on sustainable growth.
            </p>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/25 backdrop-blur-sm rounded-xl hover:border-green-500/45 transition-all">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 flex-shrink-0" />
              <h4 className="text-lg sm:text-xl font-bold text-white">Strategic Reserves</h4>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-400 mb-2">5% - 0.9B MDAO</p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Buffer for compliance, audits, legal requirements, and unforeseen strategic needs.
            </p>
          </Card>
        </div>

        {/* Token Information */}
        <Card className="p-4 sm:p-6 lg:p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-white flex items-center gap-3">
            <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            Token Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tokenInfo.map((item, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-3 sm:py-4 px-3 sm:px-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-yellow-500/30 transition-all"
              >
                <span className="text-gray-400 font-medium text-sm sm:text-base">{item.label}</span>
                <span className="font-bold text-white text-sm sm:text-base ml-2">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl text-center hover:border-yellow-500/40 transition-all">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
            <h4 className="font-bold text-white mb-2 text-sm sm:text-base">Fixed Supply</h4>
            <p className="text-xs sm:text-sm text-gray-400">No inflation or additional minting</p>
          </Card>
          
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl text-center hover:border-green-500/40 transition-all">
            <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4" />
            <h4 className="font-bold text-white mb-2 text-sm sm:text-base">Vesting Schedules</h4>
            <p className="text-xs sm:text-sm text-gray-400">Long-term alignment for all stakeholders</p>
          </Card>
          
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl text-center hover:border-yellow-500/40 transition-all">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
            <h4 className="font-bold text-white mb-2 text-sm sm:text-base">DAO Governed</h4>
            <p className="text-xs sm:text-sm text-gray-400">Community-driven decision making</p>
          </Card>
          
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 rounded-xl text-center hover:border-green-500/40 transition-all">
            <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-3 sm:mb-4" />
            <h4 className="font-bold text-white mb-2 text-sm sm:text-base">Sustainable Growth</h4>
            <p className="text-xs sm:text-sm text-gray-400">Designed for long-term value creation</p>
          </Card>
        </div>
      </div>
    </section>
  );
}