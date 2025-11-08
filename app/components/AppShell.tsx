'use client';

import { type ReactNode } from 'react';
import { Home, Trophy, User, Plus, Swords } from 'lucide-react';
import { ConnectWallet } from './ConnectWallet';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-primary/10 shadow-md">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-button">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TradeChampion
            </span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto pb-20 animate-fadeIn">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-primary/10 z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
          <button 
            className="flex flex-col items-center gap-1 text-primary transition-colors duration-200 hover:scale-110 active:scale-95"
            aria-label="Home"
            aria-current="page"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-neutral hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Tournaments"
          >
            <Trophy className="w-6 h-6" />
            <span className="text-xs">Tournaments</span>
          </button>
          <button 
            className="flex items-center justify-center w-14 h-14 -mt-8 rounded-full bg-gradient-to-r from-primary to-accent shadow-button hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Create new challenge"
          >
            <Plus className="w-7 h-7 text-white" />
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-neutral hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Duels"
          >
            <Swords className="w-6 h-6" />
            <span className="text-xs">Duels</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-neutral hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Profile"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
