
import React from 'react';
import { Award, CheckCircle, Clock, Star, Trophy, User } from 'lucide-react';
import Button from '../ui/Button';

interface ActivityItem {
  id: string;
  type: 'quiz_completed' | 'streak' | 'achievement' | 'rank_up' | 'joined';
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
  data?: {
    quizTitle?: string;
    quizId?: string;
    streakDays?: number;
    achievement?: string;
    rankName?: string;
  };
}

interface FriendActivityProps {
  activities: ActivityItem[];
}

const FriendActivity = ({ activities }: FriendActivityProps) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'quiz_completed':
        return <CheckCircle size={16} className="text-kyuzo-gold" />;
      case 'streak':
        return <Clock size={16} className="text-kyuzo-gold" />;
      case 'achievement':
        return <Award size={16} className="text-kyuzo-gold" />;
      case 'rank_up':
        return <Trophy size={16} className="text-kyuzo-gold" />;
      case 'joined':
        return <User size={16} className="text-kyuzo-gold" />;
      default:
        return <Star size={16} className="text-kyuzo-gold" />;
    }
  };
  
  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'quiz_completed':
        return `completed the "${activity.data?.quizTitle}" quiz`;
      case 'streak':
        return `maintained a ${activity.data?.streakDays}-day learning streak`;
      case 'achievement':
        return `earned the "${activity.data?.achievement}" achievement`;
      case 'rank_up':
        return `ranked up to "${activity.data?.rankName}"`;
      case 'joined':
        return `joined Kyuzo`;
      default:
        return 'did something awesome';
    }
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMins < 60) {
      return `${diffInMins}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${diffInDays}d ago`;
    }
  };
  
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-kyuzo-gold/10">
        <h3 className="text-lg font-bold text-kyuzo-gold">Friend Activity</h3>
        <Button variant="outline" size="sm">See All</Button>
      </div>
      
      <div className="py-2">
        {activities.length === 0 ? (
          <div className="p-4 text-center text-kyuzo-paper/60">
            <p>No recent activity from your friends</p>
          </div>
        ) : (
          <div className="divide-y divide-kyuzo-gold/10">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-kyuzo-red/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-kyuzo-black/50 border border-kyuzo-gold/20 overflow-hidden flex-shrink-0">
                    {activity.user.avatar ? (
                      <img 
                        src={activity.user.avatar} 
                        alt={activity.user.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={20} className="text-kyuzo-paper/60" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-kyuzo-paper">{activity.user.name}</p>
                          <span className="inline-flex items-center">
                            {getActivityIcon(activity.type)}
                          </span>
                        </div>
                        <p className="text-sm text-kyuzo-paper/70">
                          {getActivityText(activity)}
                        </p>
                      </div>
                      <span className="text-xs text-kyuzo-paper/60 flex-shrink-0">
                        {formatTime(activity.timestamp)}
                      </span>
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

export default FriendActivity;
