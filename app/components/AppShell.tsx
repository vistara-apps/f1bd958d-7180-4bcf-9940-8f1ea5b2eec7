'use client';

import { type ReactNode } from 'react';
import { Home, Trophy, User, Plus } from 'lucide-react';
import { ConnectWallet } from './ConnectWallet';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">TradeChampion</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-primary/10 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-primary transition-colors duration-200">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral hover:text-primary transition-colors duration-200">
            <Trophy className="w-6 h-6" />
            <span className="text-xs">Tournaments</span>
          </button>
          <button className="flex items-center justify-center w-14 h-14 -mt-8 rounded-full bg-primary shadow-button hover:bg-accent transition-all duration-200">
            <Plus className="w-7 h-7 text-white" />
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral hover:text-primary transition-colors duration-200">
            <Trophy className="w-6 h-6" />
            <span className="text-xs">Duels</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral hover:text-primary transition-colors duration-200">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
