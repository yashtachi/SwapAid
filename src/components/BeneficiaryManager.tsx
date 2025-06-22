import React, { useState } from 'react';
import { Plus, UserCheck, UserX, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useSwapAid } from '../contexts/SwapAidContext';

export function BeneficiaryManager() {
  const { beneficiaries, addBeneficiary, removeBeneficiary } = useSwapAid();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    walletAddress: '',
    verified: false,
    amountReceived: 0,
    lastDistribution: 'Never'
  });

  const handleAddBeneficiary = () => {
    if (newBeneficiary.name && newBeneficiary.walletAddress) {
      addBeneficiary(newBeneficiary);
      setNewBeneficiary({
        name: '',
        walletAddress: '',
        verified: false,
        amountReceived: 0,
        lastDistribution: 'Never'
      });
      setShowAddForm(false);
    }
  };

  const verifiedCount = beneficiaries.filter(b => b.verified).length;
  const unverifiedCount = beneficiaries.length - verifiedCount;

  return (
    <section id="beneficiaries" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Beneficiary Management</h2>
            <p className="text-white/70">Manage and verify aid recipients</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Beneficiary
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{verifiedCount}</div>
                <div className="text-white/60">Verified Recipients</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <UserX className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{unverifiedCount}</div>
                <div className="text-white/60">Pending Verification</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{beneficiaries.length}</div>
                <div className="text-white/60">Total Beneficiaries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Beneficiary Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Add New Beneficiary</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={newBeneficiary.name}
                    onChange={(e) => setNewBeneficiary(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter beneficiary name"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Wallet Address</label>
                  <input
                    type="text"
                    value={newBeneficiary.walletAddress}
                    onChange={(e) => setNewBeneficiary(prev => ({ ...prev, walletAddress: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter Solana wallet address"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={newBeneficiary.verified}
                    onChange={(e) => setNewBeneficiary(prev => ({ ...prev, verified: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="verified" className="text-white/70 text-sm">Mark as verified</label>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBeneficiary}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Add Beneficiary
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Beneficiaries List */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Name</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Wallet Address</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Status</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Total Received</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Last Distribution</th>
                  <th className="text-left text-white/70 font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{beneficiary.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white/70 font-mono text-sm">
                        {beneficiary.walletAddress.slice(0, 8)}...{beneficiary.walletAddress.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        beneficiary.verified 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {beneficiary.verified ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">${beneficiary.amountReceived.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white/70">{beneficiary.lastDistribution}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeBeneficiary(beneficiary.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}