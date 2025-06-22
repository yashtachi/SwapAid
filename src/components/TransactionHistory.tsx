import React from 'react';
import { ExternalLink, ArrowUpDown, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useSwapAid } from '../contexts/SwapAidContext';

export function TransactionHistory() {
  const { transactions } = useSwapAid();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'swap' ? (
      <ArrowUpDown className="w-4 h-4 text-blue-400" />
    ) : (
      <Send className="w-4 h-4 text-green-400" />
    );
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Transaction History</h2>
          <p className="text-white/70">Complete record of all swaps and distributions</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Type</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Amount</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Token</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Status</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Date</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Recipients</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Hash</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <span className="text-white capitalize font-medium">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{transaction.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-white/10 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        {transaction.token}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <span className={`capitalize text-sm font-medium ${
                          transaction.status === 'completed' ? 'text-green-400' :
                          transaction.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white/70 text-sm">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-white/50 text-xs">
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white/70">
                        {transaction.beneficiaries ? `${transaction.beneficiaries} recipients` : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {transaction.hash ? (
                        <div className="flex items-center gap-2">
                          <span className="text-white/70 font-mono text-sm">
                            {transaction.hash.slice(0, 8)}...
                          </span>
                          <a
                            href={`https://explorer.solana.com/tx/${transaction.hash}?cluster=devnet`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ) : (
                        <span className="text-white/50">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all duration-200">
            Load More Transactions
          </button>
        </div>
      </div>
    </section>
  );
}