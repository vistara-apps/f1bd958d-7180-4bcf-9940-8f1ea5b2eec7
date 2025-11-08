'use client';

import { Users, Clock, Lock } from 'lucide-react';

interface TournamentCardProps {
  name: string;
  prizePool: string;
  participants: number;
  maxParticipants: number;
  entryFee: string;
  timeRemaining: string;
  isGated: boolean;
  gatingCollection?: string;
}

export function TournamentCard({
  name,
  prizePool,
  participants,
  maxParticipants,
  entryFee,
  timeRemaining,
  isGated,
  gatingCollection,
}: TournamentCardProps) {
  const participationPercentage = (participants / maxParticipants) * 100;

  return (
    <div className="bg-surface rounded-lg p-4 shadow-card hover:shadow-button transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-base mb-1">{name}</h3>
          {isGated && gatingCollection && (
            <div className="flex items-center gap-1 text-xs text-accent">
              <Lock className="w-3 h-3" />
              <span>{gatingCollection} Holders Only</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">{prizePool}</div>
          <div className="text-xs text-neutral">Prize Pool</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-neutral">
            <Users className="w-4 h-4" />
            <span>{participants}/{maxParticipants} Participants</span>
          </div>
          <div className="flex items-center gap-2 text-neutral">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
          </div>
        </div>

        <div className="w-full bg-bg rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${participationPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-neutral">Entry: {entryFee}</div>
          <button className="px-4 py-2 bg-primary hover:bg-accent text-white text-sm font-medium rounded-lg transition-all duration-200">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
