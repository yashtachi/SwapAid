import React, { useState } from 'react';
import { Send, Plus, X, CheckCircle } from 'lucide-react';
import { useSwapAid } from '../contexts/SwapAidContext';

export function DistributionInterface() {
  const { beneficiaries, addTransaction } = useSwapAid();
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<string[]>([]);
  const [distributionAmount, setDistributionAmount] = useState('');
  const [isDistributing, setIsDistributing] = useState(false);

  const verifiedBeneficiaries = beneficiaries.filter(b => b.verified);

  const toggleBeneficiary = (id: string) => {
    setSelectedBeneficiaries(prev => 
      prev.includes(id) 
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedBeneficiaries(verifiedBeneficiaries.map(b => b.id));
  };

  const clearAll = () => {
    setSelectedBeneficiaries([]);
  };

  const handleDistribution = async () => {
    if (!distributionAmount || selectedBeneficiaries.length === 0) return;

    setIsDistributing(true);

    addTransaction({
      type: 'distribution',
      amount: parseFloat(distributionAmount) * selectedBeneficiaries.length,
      token: 'USDC',
      status: 'pending',
      timestamp: new Date().toISOString(),
      beneficiaries: selectedBeneficiaries.length
    });

    setTimeout(() => {
      setIsDistributing(false);
      setDistributionAmount('');
      setSelectedBeneficiaries([]);
    }, 3000);
  };

  const totalDistribution = distributionAmount ? 
    parseFloat(distributionAmount) * selectedBeneficiaries.length : 0;

  return (
    <section id="distribute" className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Bulk Distribution</h2>
          <p className="text-white/70">Distribute USDC to multiple verified beneficiaries instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribution Settings */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Distribution Settings</h3>
            
            <div className="mb-6">
              <label className="block text-white/70 text-sm font-medium mb-2">
                Amount per beneficiary (USDC)
              </label>
              <input
                type="number"
                value={distributionAmount}
                onChange={(e) => setDistributionAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-white/70 text-sm font-medium">
                  Selected Beneficiaries ({selectedBeneficiaries.length})
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-red-400 hover:text-red-300 text-sm transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {verifiedBeneficiaries.map(beneficiary => (
                  <div
                    key={beneficiary.id}
                    onClick={() => toggleBeneficiary(beneficiary.id)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedBeneficiaries.includes(beneficiary.id)
                        ? 'bg-purple-500/20 border border-purple-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedBeneficiaries.includes(beneficiary.id)
                          ? 'bg-purple-500 border-purple-500'
                          : 'border-white/30'
                      }`}>
                        {selectedBeneficiaries.includes(beneficiary.id) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{beneficiary.name}</p>
                        <p className="text-white/60 text-xs">{beneficiary.walletAddress.slice(0, 8)}...</p>
                      </div>
                    </div>
                    {selectedBeneficiaries.includes(beneficiary.id) && distributionAmount && (
                      <span className="text-green-400 font-medium">
                        ${parseFloat(distributionAmount).toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {totalDistribution > 0 && (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Total Distribution:</span>
                  <span className="text-white font-bold text-lg">${totalDistribution.toFixed(2)} USDC</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/60 text-sm">Recipients:</span>
                  <span className="text-white/80">{selectedBeneficiaries.length} beneficiaries</span>
                </div>
              </div>
            )}

            <button
              onClick={handleDistribution}
              disabled={!distributionAmount || selectedBeneficiaries.length === 0 || isDistributing}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isDistributing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Distributing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Distribute Aid
                </>
              )}
            </button>
          </div>

          {/* Preview */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Distribution Preview</h3>
            
            {selectedBeneficiaries.length > 0 && distributionAmount ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">${totalDistribution.toFixed(2)}</div>
                  <div className="text-white/60">Total USDC to distribute</div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedBeneficiaries.map(id => {
                    const beneficiary = beneficiaries.find(b => b.id === id);
                    if (!beneficiary) return null;
                    
                    return (
                      <div key={id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div>
                          <p className="text-white font-medium">{beneficiary.name}</p>
                          <p className="text-white/60 text-sm">{beneficiary.walletAddress.slice(0, 16)}...</p>
                        </div>
                        <div className="text-green-400 font-semibold">
                          ${parseFloat(distributionAmount).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-white/60">
                <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select beneficiaries and enter amount to preview distribution</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}