
import React from 'react';
import { Search, UserPlus, UserCheck, Clock, Award } from 'lucide-react';
import ButtonCustom from '../ui/button-custom';

interface FriendProps {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastActive?: string;
  quizCount: number;
  xp: number;
  streak: number;
}

const Friends = () => {
  // Mock data for friends
  const friends: FriendProps[] = [
    {
      id: 1,
      name: "Kazuo Nakamura",
      avatar: "https://ui-avatars.com/api/?name=Kazuo+Nakamura&background=A63A50&color=F7F3E9",
      status: 'online',
      quizCount: 42,
      xp: 2350,
      streak: 7
    },
    {
      id: 2,
      name: "Mei Lin",
      avatar: "https://ui-avatars.com/api/?name=Mei+Lin&background=A63A50&color=F7F3E9",
      status: 'offline',
      lastActive: '2 hours ago',
      quizCount: 36,
      xp: 1850,
      streak: 3
    },
    {
      id: 3,
      name: "Takashi Mori",
      avatar: "https://ui-avatars.com/api/?name=Takashi+Mori&background=A63A50&color=F7F3E9",
      status: 'online',
      quizCount: 28,
      xp: 1420,
      streak: 5
    }
  ];
  
  // Mock data for friend requests
  const friendRequests = [
    {
      id: 4,
      name: "Akiko Tanaka",
      avatar: "https://ui-avatars.com/api/?name=Akiko+Tanaka&background=A63A50&color=F7F3E9",
      mutualFriends: 2
    },
    {
      id: 5,
      name: "Haruto Sato",
      avatar: "https://ui-avatars.com/api/?name=Haruto+Sato&background=A63A50&color=F7F3E9",
      mutualFriends: 1
    }
  ];
  
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-kyuzo-gold font-calligraphy">Friends & Rivals</h2>
        <ButtonCustom 
          variant="outline" 
          size="sm"
          icon={<UserPlus size={16} />}
        >
          Add Friend
        </ButtonCustom>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kyuzo-paper/60" />
      </div>
      
      {/* Friend List */}
      <div className="space-y-5">
        <h3 className="text-sm font-medium text-kyuzo-paper/80">Your Friends</h3>
        
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-4 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5 hover:bg-kyuzo-red/10 transition-colors">
            <div className="relative">
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="w-12 h-12 rounded-full"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-kyuzo-paper">{friend.name}</p>
                {friend.status === 'offline' && friend.lastActive && (
                  <p className="text-xs text-kyuzo-paper/60 flex items-center gap-1">
                    <Clock size={12} /> {friend.lastActive}
                  </p>
                )}
              </div>
              <div className="flex gap-3 text-xs text-kyuzo-paper/60 mt-1">
                <span>{friend.quizCount} quizzes</span>
                <span>{friend.xp} XP</span>
                <span className="flex items-center gap-1">
                  <Award size={12} className="text-kyuzo-gold" />
                  {friend.streak} day streak
                </span>
              </div>
            </div>
            
            <ButtonCustom variant="ghost" size="sm">Challenge</ButtonCustom>
          </div>
        ))}
      </div>
      
      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div className="mt-8 space-y-5">
          <h3 className="text-sm font-medium text-kyuzo-paper/80">Friend Requests</h3>
          
          {friendRequests.map((request) => (
            <div key={request.id} className="flex items-center gap-4 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
              <img 
                src={request.avatar} 
                alt={request.name} 
                className="w-12 h-12 rounded-full"
              />
              
              <div className="flex-1">
                <p className="font-medium text-kyuzo-paper">{request.name}</p>
                <p className="text-xs text-kyuzo-paper/60">{request.mutualFriends} mutual friends</p>
              </div>
              
              <div className="flex gap-2">
                <ButtonCustom 
                  variant="default" 
                  size="sm"
                  icon={<UserCheck size={16} />}
                >
                  Accept
                </ButtonCustom>
                <ButtonCustom variant="ghost" size="sm">Decline</ButtonCustom>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Friend Suggestions */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-kyuzo-paper/80 mb-3">Find More Friends</h3>
        <ButtonCustom variant="outline" className="w-full">
          Browse Community
        </ButtonCustom>
      </div>
    </div>
  );
};

export default Friends;
