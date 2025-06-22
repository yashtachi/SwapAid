import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Beneficiary {
  id: string;
  name: string;
  walletAddress: string;
  verified: boolean;
  amountReceived: number;
  lastDistribution: string;
}

interface Transaction {
  id: string;
  type: 'swap' | 'distribution';
  amount: number;
  token: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  hash?: string;
  beneficiaries?: number;
}

interface SwapAidContextType {
  beneficiaries: Beneficiary[];
  transactions: Transaction[];
  totalAidDistributed: number;
  totalBeneficiaries: number;
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id'>) => void;
  removeBeneficiary: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

const SwapAidContext = createContext<SwapAidContextType | undefined>(undefined);

export function SwapAidProvider({ children }: { children: ReactNode }) {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: '1',
      name: 'Maria Santos',
      walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      verified: true,
      amountReceived: 150.00,
      lastDistribution: '2024-01-15'
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      verified: true,
      amountReceived: 200.00,
      lastDistribution: '2024-01-14'
    },
    {
      id: '3',
      name: 'Priya Patel',
      walletAddress: '4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi',
      verified: false,
      amountReceived: 0,
      lastDistribution: 'Never'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'swap',
      amount: 500,
      token: 'SOL',
      status: 'completed',
      timestamp: '2024-01-15T10:30:00Z',
      hash: '5KJp89QY7xMn1MqT3Z8R4uW2vN3qX9jH6fG7sD4aB2cE'
    },
    {
      id: '2',
      type: 'distribution',
      amount: 350,
      token: 'USDC',
      status: 'completed',
      timestamp: '2024-01-15T11:15:00Z',
      hash: '8NpQ2fX7tK5jM9wV6rS1qH4gD3eA8bC7fE9xY2zR5nT4',
      beneficiaries: 2
    },
    {
      id: '3',
      type: 'swap',
      amount: 1000,
      token: 'BONK',
      status: 'pending',
      timestamp: '2024-01-15T12:00:00Z'
    }
  ]);

  const totalAidDistributed = beneficiaries.reduce((sum, b) => sum + b.amountReceived, 0);
  const totalBeneficiaries = beneficiaries.filter(b => b.verified).length;

  const addBeneficiary = (beneficiary: Omit<Beneficiary, 'id'>) => {
    const newBeneficiary = {
      ...beneficiary,
      id: Date.now().toString()
    };
    setBeneficiaries(prev => [...prev, newBeneficiary]);
  };

  const removeBeneficiary = (id: string) => {
    setBeneficiaries(prev => prev.filter(b => b.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return (
    <SwapAidContext.Provider value={{
      beneficiaries,
      transactions,
      totalAidDistributed,
      totalBeneficiaries,
      addBeneficiary,
      removeBeneficiary,
      addTransaction,
      updateTransaction
    }}>
      {children}
    </SwapAidContext.Provider>
  );
}

export function useSwapAid() {
  const context = useContext(SwapAidContext);
  if (context === undefined) {
    throw new Error('useSwapAid must be used within a SwapAidProvider');
  }
  return context;
}