import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Shield, Lock, Users, Coins, TrendingUp, Database } from 'lucide-react';

const Card: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`rounded-lg ${className}`}>{children}</div>
);

export default function TokenomicsSection() {
  const allocationData = [
    { name: 'Ecosystem Treasury', value: 40, tokens: '400,000,000', color: '#dba640' },
    { name: 'Corporate Incentives', value: 20, tokens: '200,000,000', color: '#5cb89f' },
    { name: 'Liquidity & Exchanges', value: 15, tokens: '150,000,000', color: '#c49636' },
    { name: 'Team & Advisors', value: 10, tokens: '100,000,000', color: '#4fa88d' },
    { name: 'Community & Marketing', value: 10, tokens: '100,000,000', color: '#e8c469' },
    { name: 'Strategic Reserves', value: 5, tokens: '50,000,000', color: '#6bc4ad' }
  ];

  const keyMetrics = [
    { icon: Coins, label: 'Total Supply', value: '1,000,000,000', subtitle: 'MDAO tokens (Fixed)' },
    { icon: TrendingUp, label: 'Initial Circulation', value: '100,000,000', subtitle: '10% of total supply' },
    { icon: Shield, label: 'Tax Structure', value: '0%', subtitle: 'No buy/sell taxes' },
    { icon: Database, label: 'Token Standard', value: 'BEP-20', subtitle: 'BNB Smart Chain' }
  ];

  const tokenInfo = [
    { label: 'Token Name', value: 'MLEE DAO' },
    { label: 'Symbol', value: 'MDAO' },
    { label: 'Network', value: 'BNB Smart Chain' },
    { label: 'Decimals', value: '18' },
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Chain ID', value: '56 (BSC Mainnet)' }
  ];

  return (
    <section id="tokenomics" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Tokenomics
            </span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg sm:text-xl">
            A sustainable and governance-focused economic model designed for long-term value creation and community empowerment
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card 
                key={index}
                className={`p-6 bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-in-up delay-${index * 100}`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 animate-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <h4 className="font-semibold mb-1 text-foreground text-lg">{metric.label}</h4>
                <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
              </Card>
            );
          })}
        </div>

        {/* Allocation Breakdown */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Pie Chart */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border rounded-xl animate-slide-in-left hover-lift">
            <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Token Allocation</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'oklch(0.12 0.01 250)',
                    border: '1px solid oklch(0.2 0.02 250)',
                    borderRadius: '8px',
                    color: 'oklch(0.98 0 0)'
                  }}
                  formatter={(value, name, props) => [
                    `${value}% (${props.payload.tokens} MDAO)`,
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Allocation Details */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border rounded-xl animate-slide-in-right hover-lift">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Distribution Breakdown</h3>
            <div className="space-y-4">
              {allocationData.map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-lg" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-foreground font-semibold">{item.name}</span>
                    </div>
                    <span className="text-primary font-bold">{item.value}%</span>
                  </div>
                  <div className="ml-7 mb-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.tokens} MDAO</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Allocation Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm rounded-xl hover:border-primary/40 transition-all animate-scale-in delay-100 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h4 className="text-xl font-bold text-foreground">Ecosystem Treasury</h4>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">40% - 400M MDAO</p>
            <p className="text-muted-foreground text-sm">
              Controlled via DAO governance for grants, partnerships, R&D, and ecosystem expansion across target industries.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border border-secondary/20 backdrop-blur-sm rounded-xl hover:border-secondary/40 transition-all animate-scale-in delay-200 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-secondary" />
              <h4 className="text-xl font-bold text-foreground">Corporate Incentives</h4>
            </div>
            <p className="text-2xl font-bold text-secondary mb-2">20% - 200M MDAO</p>
            <p className="text-muted-foreground text-sm">
              Reserved for verified participants based on actual involvement and contribution to the ecosystem.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/30 backdrop-blur-sm rounded-xl hover:border-primary/50 transition-all animate-scale-in delay-300 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-primary" />
              <h4 className="text-xl font-bold text-foreground">Liquidity & Exchanges</h4>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">15% - 150M MDAO</p>
            <p className="text-muted-foreground text-sm">
              Used for DEX liquidity and future listings, released in stages to maintain market stability.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border border-secondary/30 backdrop-blur-sm rounded-xl hover:border-secondary/50 transition-all animate-scale-in delay-500 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-secondary" />
              <h4 className="text-xl font-bold text-foreground">Team & Advisors</h4>
            </div>
            <p className="text-2xl font-bold text-secondary mb-2">10% - 100M MDAO</p>
            <p className="text-muted-foreground text-sm">
              For founders, developers, and advisors, with vesting tied to long-term milestones and project success.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/25 backdrop-blur-sm rounded-xl hover:border-primary/45 transition-all animate-scale-in delay-700 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h4 className="text-xl font-bold text-foreground">Community & Marketing</h4>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">10% - 100M MDAO</p>
            <p className="text-muted-foreground text-sm">
              Supports structured awareness and participation initiatives focused on sustainable growth.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border border-secondary/25 backdrop-blur-sm rounded-xl hover:border-secondary/45 transition-all animate-scale-in delay-1000 hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-secondary" />
              <h4 className="text-xl font-bold text-foreground">Strategic Reserves</h4>
            </div>
            <p className="text-2xl font-bold text-secondary mb-2">5% - 50M MDAO</p>
            <p className="text-muted-foreground text-sm">
              Buffer for compliance, audits, legal requirements, and unforeseen strategic needs.
            </p>
          </Card>
        </div>

        {/* Token Information */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border border-border rounded-xl mb-16 animate-fade-in-up hover-lift">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Coins className="w-8 h-8 text-primary" />
            Token Information
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokenInfo.map((item, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-4 px-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-all hover-lift"
              >
                <span className="text-muted-foreground font-medium">{item.label}</span>
                <span className="font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl text-center hover:border-primary/40 transition-all animate-fade-in delay-100 hover-lift">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
            <h4 className="font-bold text-foreground mb-2">Fixed Supply</h4>
            <p className="text-sm text-muted-foreground">No inflation or additional minting</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 rounded-xl text-center hover:border-secondary/40 transition-all animate-fade-in delay-200 hover-lift">
            <Lock className="w-12 h-12 text-secondary mx-auto mb-4 animate-float" />
            <h4 className="font-bold text-foreground mb-2">Vesting Schedules</h4>
            <p className="text-sm text-muted-foreground">Long-term alignment for all stakeholders</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl text-center hover:border-primary/40 transition-all animate-fade-in delay-300 hover-lift">
            <Users className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
            <h4 className="font-bold text-foreground mb-2">DAO Governed</h4>
            <p className="text-sm text-muted-foreground">Community-driven decision making</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 rounded-xl text-center hover:border-secondary/40 transition-all animate-fade-in delay-500 hover-lift">
            <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4 animate-float" />
            <h4 className="font-bold text-foreground mb-2">Sustainable Growth</h4>
            <p className="text-sm text-muted-foreground">Designed for long-term value creation</p>
          </Card>
        </div>
      </div>
    </section>
  );
}