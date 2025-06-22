import React, { useState } from 'react';
import { ArrowDownUp, RefreshCw } from 'lucide-react';
import { useSwapAid } from '../contexts/SwapAidContext';

const TOKENS = [
  { symbol: 'SOL', name: 'Solana', icon: '◎' },
  { symbol: 'BONK', name: 'Bonk', icon: '🐕' },
  { symbol: 'USDC', name: 'USD Coin', icon: '$' },
  { symbol: 'RAY', name: 'Raydium', icon: '⚡' },
];

export function SwapInterface() {
  const { addTransaction } = useSwapAid();
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[2]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    
    setIsSwapping(true);
    
    // Simulate swap API call
    addTransaction({
      type: 'swap',
      amount: parseFloat(fromAmount),
      token: fromToken.symbol,
      status: 'pending',
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSwapping(false);
      setFromAmount('');
      setToAmount('');
    }, 2000);
  };

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  React.useEffect(() => {
    if (fromAmount) {
      // Simulate conversion rate
      const rate = fromToken.symbol === 'SOL' ? 200 : fromToken.symbol === 'BONK' ? 0.000001 : 1;
      setToAmount((parseFloat(fromAmount) * rate).toFixed(6));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken]);

  return (
    <section id="swap" className="py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Token Swap</h2>
          <p className="text-white/70">Convert any Solana token to USDC using Jup.ag</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {/* From Token */}
          <div className="mb-4">
            <label className="block text-white/70 text-sm font-medium mb-2">From</label>
            <div className="flex items-center space-x-4">
              <select
                value={fromToken.symbol}
                onChange={(e) => setFromToken(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[0])}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white flex-shrink-0 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {TOKENS.map(token => (
                  <option key={token.symbol} value={token.symbol} className="bg-gray-800">
                    {token.icon} {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white flex-1 text-right focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-6">
            <button
              onClick={swapTokens}
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 text-white transition-all duration-200"
            >
              <ArrowDownUp className="w-5 h-5" />
            </button>
          </div>

          {/* To Token */}
          <div className="mb-8">
            <label className="block text-white/70 text-sm font-medium mb-2">To (for Aid Distribution)</label>
            <div className="flex items-center space-x-4">
              <select
                value={toToken.symbol}
                onChange={(e) => setToToken(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[2])}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white flex-shrink-0 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {TOKENS.map(token => (
                  <option key={token.symbol} value={token.symbol} className="bg-gray-800">
                    {token.icon} {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 flex-1 text-right"
              />
            </div>
          </div>

          <button
            onClick={handleSwap}
            disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isSwapping}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSwapping ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Swapping...
              </>
            ) : (
              'Swap Tokens'
            )}
          </button>

          <div className="mt-4 text-center">
            <p className="text-white/60 text-sm">Powered by Jup.ag • Low fees • Best rates</p>
          </div>
        </div>
      </div>
    </section>
  );
}