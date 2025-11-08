'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { AppShell } from './components/AppShell';
import { DuelCard } from './components/DuelCard';
import { TournamentCard } from './components/TournamentCard';
import { LeaderboardItem } from './components/LeaderboardItem';
import { Trophy, Swords, TrendingUp } from 'lucide-react';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-pulse text-fg">Loading TradeChampion...</div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section */}
        <section className="text-center py-8 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">TradeChampion</h1>
          <p className="text-neutral text-base">
            Prove your trading skills. Challenge friends, win crypto.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-3 px-4">
          <div className="bg-surface rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">127</div>
            <div className="text-xs text-neutral mt-1">Active Duels</div>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">$12.5K</div>
            <div className="text-xs text-neutral mt-1">Prize Pool</div>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">892</div>
            <div className="text-xs text-neutral mt-1">Traders</div>
          </div>
        </section>

        {/* Active Duels */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Active Duels</h2>
            </div>
            <button className="text-sm text-primary hover:text-accent transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-3">
            <DuelCard
              challengerName="CryptoKing"
              challengerAvatar="👑"
              challengedName="NFTWhale"
              challengedAvatar="🐋"
              wagerAmount="0.05 ETH"
              metric="P&L"
              timeRemaining="2h 15m"
              status="active"
            />
            <DuelCard
              challengerName="DiamondHands"
              challengerAvatar="💎"
              challengedName="You"
              challengedAvatar="🎯"
              wagerAmount="0.02 ETH"
              metric="Volume"
              timeRemaining="Pending"
              status="pending"
            />
          </div>
        </section>

        {/* Tournaments */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Tournaments</h2>
            </div>
            <button className="text-sm text-primary hover:text-accent transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-3">
            <TournamentCard
              name="BAYC Trading Championship"
              prizePool="1.5 ETH"
              participants={24}
              maxParticipants={50}
              entryFee="0.05 ETH"
              timeRemaining="3d 12h"
              isGated={true}
              gatingCollection="BAYC"
            />
            <TournamentCard
              name="Weekly Volume Challenge"
              prizePool="0.8 ETH"
              participants={67}
              maxParticipants={100}
              entryFee="0.01 ETH"
              timeRemaining="5d 8h"
              isGated={false}
            />
          </div>
        </section>

        {/* Leaderboard */}
        <section className="px-4 pb-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Top Traders</h2>
            </div>
            <button className="text-sm text-primary hover:text-accent transition-colors duration-200">
              Full Leaderboard
            </button>
          </div>
          <div className="space-y-2">
            <LeaderboardItem
              rank={1}
              username="TradeGod"
              avatar="🏆"
              winRate={87}
              totalProfit="$54,157"
              isTopTier={true}
            />
            <LeaderboardItem
              rank={2}
              username="DeFiLord"
              avatar="👑"
              winRate={82}
              totalProfit="$38,647"
              isTopTier={true}
            />
            <LeaderboardItem
              rank={3}
              username="NFTMaster"
              avatar="💎"
              winRate={79}
              totalProfit="$28,943"
              isTopTier={true}
            />
            <LeaderboardItem
              rank={4}
              username="CryptoNinja"
              avatar="🥷"
              winRate={76}
              totalProfit="$22,156"
              isTopTier={false}
            />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
