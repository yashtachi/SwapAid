import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Heart, Menu, X, ExternalLink } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="relative bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SwapAid</h1>
              <p className="text-xs text-purple-200">Powered by Solana</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
            <a href="#swap" className="text-white/80 hover:text-white transition-colors">Swap</a>
            <a href="#distribute" className="text-white/80 hover:text-white transition-colors">Distribute</a>
            <a href="#beneficiaries" className="text-white/80 hover:text-white transition-colors">Beneficiaries</a>
          </nav>

          <div className="flex items-center space-x-4">
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !border-0 !rounded-lg !font-medium !text-sm !px-4 !py-2 hover:!from-purple-600 hover:!to-pink-600 !transition-all !duration-200" />

            <a
              href="https://jup.ag"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-gradient-to-r from-[#FF3F34] to-[#FF9E9B] border-0 rounded-lg font-medium text-sm px-4 py-2 text-white hover:opacity-90 transition-all duration-200"
            >
              Jupiter
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white/80 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10">
          <nav className="px-4 py-4 space-y-4">
            <a href="#dashboard" className="block text-white/80 hover:text-white transition-colors">Dashboard</a>
            <a href="#swap" className="block text-white/80 hover:text-white transition-colors">Swap</a>
            <a href="#distribute" className="block text-white/80 hover:text-white transition-colors">Distribute</a>
            <a href="#beneficiaries" className="block text-white/80 hover:text-white transition-colors">Beneficiaries</a>
          </nav>
        </div>
      )}
    </header>
  );
}