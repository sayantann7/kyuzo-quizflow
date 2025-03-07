
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  User, Mail, Calendar, Edit, Award, BookOpen, 
  Trophy, TrendingUp, BarChart, Users, Settings 
} from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';

const Profile = () => {
  // Mock user data
  const user = {
    name: "Akira Tanaka",
    username: "akira_t",
    email: "akira@example.com",
    joined: "October 2023",
    avatar: "https://ui-avatars.com/api/?name=Akira+Tanaka&background=A63A50&color=F7F3E9",
    level: 15,
    xp: 3750,
    totalQuizzes: 42,
    averageScore: 78,
    streak: 7,
    achievements: [
      { name: "Early Bird", description: "Joined during beta", icon: Award },
      { name: "Quiz Master", description: "Completed 10 quizzes with > 80% score", icon: BookOpen },
      { name: "Social Butterfly", description: "Connected with 5 friends", icon: Users },
      { name: "Streak Keeper", description: "Maintained a 7-day streak", icon: TrendingUp }
    ],
    stats: [
      { label: "Quizzes Taken", value: 42, icon: BookOpen },
      { label: "Average Score", value: "78%", icon: BarChart },
      { label: "Current Streak", value: "7 days", icon: TrendingUp },
      { label: "Best Rank", value: "#8", icon: Trophy }
    ]
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="relative glass-card p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-kyuzo-gold/30"
                />
                <button className="absolute bottom-0 right-0 p-1 bg-kyuzo-red rounded-full text-kyuzo-paper">
                  <Edit size={16} />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-kyuzo-paper mb-1">{user.name}</h1>
                    <p className="text-kyuzo-paper/60">@{user.username}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex gap-3">
                    <ButtonCustom variant="outline" size="sm" icon={<Settings size={16} />}>
                      Edit Profile
                    </ButtonCustom>
                    <ButtonCustom variant="default" size="sm" icon={<Users size={16} />}>
                      Add Friend
                    </ButtonCustom>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-kyuzo-paper/70">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-kyuzo-paper/70">
                    <Calendar size={16} />
                    <span>Joined {user.joined}</span>
                  </div>
                  <div className="flex items-center gap-2 text-kyuzo-gold">
                    <User size={16} />
                    <span>Level {user.level}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* XP Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-kyuzo-paper/70">XP: {user.xp}</span>
                <span className="text-sm text-kyuzo-paper/70">Next Level: {4000 - user.xp} XP remaining</span>
              </div>
              <div className="w-full h-2 bg-kyuzo-black/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-kyuzo-gold rounded-full" 
                  style={{ width: `${(user.xp % 1000) / 10}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-kyuzo-gold mb-6 font-calligraphy">Stats</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {user.stats.map((stat, index) => (
                  <div key={index} className="glass-card p-4 text-center">
                    <div className="mx-auto mb-2 p-2 rounded-full bg-kyuzo-red/10 w-10 h-10 flex items-center justify-center">
                      <stat.icon size={18} className="text-kyuzo-gold" />
                    </div>
                    <p className="text-2xl font-bold text-kyuzo-paper">{stat.value}</p>
                    <p className="text-sm text-kyuzo-paper/60">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <ButtonCustom variant="ghost">View Detailed Stats</ButtonCustom>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-kyuzo-gold mb-6 font-calligraphy">Achievements</h2>
              
              <div className="space-y-4">
                {user.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                    <div className="p-2 rounded-full bg-kyuzo-red/20">
                      <achievement.icon size={18} className="text-kyuzo-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-kyuzo-paper">{achievement.name}</p>
                      <p className="text-xs text-kyuzo-paper/60">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <ButtonCustom variant="ghost">View All Achievements</ButtonCustom>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-kyuzo-gold mb-6 font-calligraphy">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                  <BookOpen size={16} className="text-kyuzo-gold" />
                  <div className="flex-1">
                    <p className="text-sm text-kyuzo-paper">Completed "Japanese Feudal History" quiz</p>
                    <p className="text-xs text-kyuzo-paper/60">2 hours ago • Score: 85%</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                  <Award size={16} className="text-kyuzo-gold" />
                  <div className="flex-1">
                    <p className="text-sm text-kyuzo-paper">Unlocked "Quiz Master" achievement</p>
                    <p className="text-xs text-kyuzo-paper/60">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                  <TrendingUp size={16} className="text-kyuzo-gold" />
                  <div className="flex-1">
                    <p className="text-sm text-kyuzo-paper">Reached a 7-day streak</p>
                    <p className="text-xs text-kyuzo-paper/60">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-kyuzo-gold/20 rounded-md bg-kyuzo-red/5">
                  <BookOpen size={16} className="text-kyuzo-gold" />
                  <div className="flex-1">
                    <p className="text-sm text-kyuzo-paper">Created "Edo Period Art & Culture" quiz</p>
                    <p className="text-xs text-kyuzo-paper/60">3 days ago</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <ButtonCustom variant="ghost">View Full Activity</ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
