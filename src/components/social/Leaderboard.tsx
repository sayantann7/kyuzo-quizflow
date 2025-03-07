
import React, { useState } from 'react';
import { Medal, Users } from 'lucide-react';
import Button from '../ui/Button';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  rank: number;
  isCurrentUser?: boolean;
  change?: 'up' | 'down' | 'same';
}

interface LeaderboardProps {
  users: LeaderboardUser[];
  title?: string;
  period?: 'day' | 'week' | 'month' | 'all-time';
}

const Leaderboard = ({ 
  users, 
  title = "Leaderboard", 
  period = 'week' 
}: LeaderboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'all-time'>(period);
  
  const getChangeIndicator = (change?: 'up' | 'down' | 'same') => {
    if (!change || change === 'same') return null;
    
    return (
      <span 
        className={`text-xs ${change === 'up' ? 'text-green-400' : 'text-red-400'} ml-1`}
      >
        {change === 'up' ? '▲' : '▼'}
      </span>
    );
  };
  
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-300';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-kyuzo-paper/40';
    }
  };
  
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-kyuzo-gold/10">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-kyuzo-gold" />
          <h3 className="text-lg font-bold text-kyuzo-gold">{title}</h3>
        </div>
        <Button variant="outline" size="sm">View Full</Button>
      </div>
      
      <div className="p-4 border-b border-kyuzo-gold/10">
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant={selectedPeriod === 'day' ? 'default' : 'ghost'}
            onClick={() => setSelectedPeriod('day')}
          >
            Today
          </Button>
          <Button 
            size="sm" 
            variant={selectedPeriod === 'week' ? 'default' : 'ghost'}
            onClick={() => setSelectedPeriod('week')}
          >
            This Week
          </Button>
          <Button 
            size="sm" 
            variant={selectedPeriod === 'month' ? 'default' : 'ghost'}
            onClick={() => setSelectedPeriod('month')}
          >
            This Month
          </Button>
          <Button 
            size="sm" 
            variant={selectedPeriod === 'all-time' ? 'default' : 'ghost'}
            onClick={() => setSelectedPeriod('all-time')}
          >
            All Time
          </Button>
        </div>
      </div>
      
      <div className="py-2">
        {users.length === 0 ? (
          <div className="p-4 text-center text-kyuzo-paper/60">
            <p>No data available for this period</p>
          </div>
        ) : (
          <div className="divide-y divide-kyuzo-gold/10">
            {users.map((user) => (
              <div 
                key={user.id} 
                className={`p-4 transition-colors
                  ${user.isCurrentUser ? 'bg-kyuzo-red/10' : 'hover:bg-kyuzo-red/5'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 flex items-center justify-center">
                    {user.rank <= 3 ? (
                      <Medal size={20} className={getMedalColor(user.rank)} />
                    ) : (
                      <span className="text-sm text-kyuzo-paper/60">{user.rank}</span>
                    )}
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-kyuzo-black/50 border border-kyuzo-gold/20 overflow-hidden flex-shrink-0">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users size={18} className="text-kyuzo-paper/60" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${user.isCurrentUser ? 'text-kyuzo-gold' : 'text-kyuzo-paper'}`}>
                          {user.name}
                          {user.isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-kyuzo-paper">{user.points.toLocaleString()} XP</span>
                        {getChangeIndicator(user.change)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Trophy = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default Leaderboard;
