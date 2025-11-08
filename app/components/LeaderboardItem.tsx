'use client';

import { TrendingUp } from 'lucide-react';

interface LeaderboardItemProps {
  rank: number;
  username: string;
  avatar: string;
  winRate: number;
  totalProfit: string;
  isTopTier: boolean;
}

export function LeaderboardItem({
  rank,
  username,
  avatar,
  winRate,
  totalProfit,
  isTopTier,
}: LeaderboardItemProps) {
  const rankColors = {
    1: 'bg-yellow-500/20 text-yellow-500',
    2: 'bg-gray-400/20 text-gray-400',
    3: 'bg-orange-500/20 text-orange-500',
  };

  const getRankColor = () => {
    if (rank === 1) return rankColors[1];
    if (rank === 2) return rankColors[2];
    if (rank === 3) return rankColors[3];
    return 'bg-surface text-neutral';
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 cursor-pointer ${
      isTopTier ? 'bg-primary/5 hover:bg-primary/10' : 'bg-surface hover:bg-surface/80'
    }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankColor()}`}>
        {rank}
      </div>

      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
        {avatar}
      </div>

      <div className="flex-1">
        <div className="font-semibold text-sm mb-1">{username}</div>
        <div className="flex items-center gap-2 text-xs text-neutral">
          <TrendingUp className="w-3 h-3" />
          <span>{winRate}% Win Rate</span>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold text-success">{totalProfit}</div>
        <div className="text-xs text-neutral">Total Profit</div>
      </div>
    </div>
  );
}
