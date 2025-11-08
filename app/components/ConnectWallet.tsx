'use client';

import { Wallet } from 'lucide-react';

export function ConnectWallet() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-accent text-white rounded-lg transition-all duration-200 shadow-button">
      <Wallet className="w-4 h-4" />
      <span className="text-sm font-medium">Connect</span>
    </button>
  );
}
