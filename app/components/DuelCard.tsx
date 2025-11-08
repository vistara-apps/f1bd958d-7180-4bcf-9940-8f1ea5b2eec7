'use client';

import { Clock, TrendingUp } from 'lucide-react';

interface DuelCardProps {
  challengerName: string;
  challengerAvatar: string;
  challengedName: string;
  challengedAvatar: string;
  wagerAmount: string;
  metric: string;
  timeRemaining: string;
  status: 'pending' | 'active' | 'completed';
}

export function DuelCard({
  challengerName,
  challengerAvatar,
  challengedName,
  challengedAvatar,
  wagerAmount,
  metric,
  timeRemaining,
  status,
}: DuelCardProps) {
  const statusColors = {
    pending: 'bg-neutral/20 text-neutral',
    active: 'bg-success/20 text-success',
    completed: 'bg-primary/20 text-primary',
  };

  return (
    <div 
      className="bg-surface rounded-lg p-4 shadow-card hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/20 active:scale-[0.98]"
      role="article"
      aria-label={`Duel between ${challengerName} and ${challengedName}`}
    >
      <div className="flex items-center justify-between mb-3" role="status">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]} backdrop-blur-sm`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
        <div className="flex items-center gap-1 text-xs text-neutral">
          <Clock className="w-3 h-3" />
          <span>{timeRemaining}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
            {challengerAvatar}
          </div>
          <div>
            <div className="font-medium text-sm">{challengerName}</div>
            <div className="text-xs text-neutral">Challenger</div>
          </div>
        </div>

        <div className="text-danger text-xl font-bold animate-pulse">VS</div>

        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-sm text-right">{challengedName}</div>
            <div className="text-xs text-neutral text-right">Challenged</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-2xl">
            {challengedAvatar}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-primary/10">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-neutral">Metric: {metric}</span>
        </div>
        <div className="text-sm font-bold text-primary">{wagerAmount}</div>
      </div>
    </div>
  );
}
