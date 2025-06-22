import React from 'react';
import { BarChart3, DollarSign, Users, TrendingUp } from 'lucide-react';
import { useSwapAid } from '../contexts/SwapAidContext';
import { StatsChart } from './StatsChart';

export function Dashboard() {
  const { totalAidDistributed, totalBeneficiaries, transactions } = useSwapAid();
  
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

  const stats = [
    {
      name: 'Total Aid Distributed',
      value: `$${totalAidDistributed.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+12%'
    },
    {
      name: 'Active Beneficiaries',
      value: totalBeneficiaries.toString(),
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      change: '+5'
    },
    {
      name: 'Completed Transactions',
      value: completedTransactions.toString(),
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      change: '+8'
    },
    {
      name: 'Pending Distributions',
      value: pendingTransactions.toString(),
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      change: '2'
    }
  ];

  return (
    <section id="dashboard" className="py-16 bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Distribution Dashboard</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Real-time insights into your aid distribution activities and impact metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/60 text-sm">{stat.name}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Distribution Trends</h3>
            <StatsChart />
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.status === 'completed' ? 'bg-green-500' :
                      transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="text-white font-medium capitalize">
                        {transaction.type} - {transaction.amount} {transaction.token}
                      </p>
                      <p className="text-white/60 text-sm">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}