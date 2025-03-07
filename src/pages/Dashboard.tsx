
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import QuizCard, { QuizCardProps } from '../components/quiz/QuizCard';
import { BookOpen, Calendar, ChevronRight, Clock, Plus, SquareStack, Target } from 'lucide-react';
import FriendActivity from '../components/social/FriendActivity';
import Leaderboard from '../components/social/Leaderboard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [recentQuizzes, setRecentQuizzes] = useState<QuizCardProps[]>([
    {
      id: '1',
      title: 'Japanese Feudal System',
      description: 'Learn about the structure and hierarchy of feudal Japan, including the roles of samurai, daimyo, and peasants.',
      difficulty: 'intermediate',
      questionCount: 15,
      timeEstimate: 20,
      completedCount: 2,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isCompleted: true,
      bestScore: 85
    },
    {
      id: '2',
      title: 'Samurai Code of Bushido',
      description: 'Explore the moral code and way of life of the samurai warriors, including honor, loyalty, and discipline.',
      difficulty: 'advanced',
      questionCount: 12,
      timeEstimate: 15,
      completedCount: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      isCompleted: true,
      bestScore: 92
    },
    {
      id: '3',
      title: 'Japanese Art History',
      description: 'Discover the rich tradition of Japanese art, from ancient pottery to modern manga and everything in between.',
      difficulty: 'beginner',
      questionCount: 10,
      timeEstimate: 12,
      completedCount: 0,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) // 1 day ago
    }
  ]);
  
  const friendActivities = [
    {
      id: '1',
      type: 'quiz_completed' as const,
      user: {
        id: 'user1',
        name: 'Hiroshi Tanaka',
        avatar: ''
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      data: {
        quizTitle: 'Advanced Kanji Characters',
        quizId: 'quiz1'
      }
    },
    {
      id: '2',
      type: 'streak' as const,
      user: {
        id: 'user2',
        name: 'Alex Wong',
        avatar: ''
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      data: {
        streakDays: 7
      }
    },
    {
      id: '3',
      type: 'achievement' as const,
      user: {
        id: 'user3',
        name: 'Sarah Johnson',
        avatar: ''
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      data: {
        achievement: 'Knowledge Samurai'
      }
    },
    {
      id: '4',
      type: 'rank_up' as const,
      user: {
        id: 'user4',
        name: 'David Kim',
        avatar: ''
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      data: {
        rankName: 'Master Strategist'
      }
    }
  ];
  
  const leaderboardUsers = [
    {
      id: 'user1',
      name: 'Yuki Nakamura',
      points: 4650,
      rank: 1,
      change: 'same' as const
    },
    {
      id: 'user2',
      name: 'Alexander Chen',
      points: 4320,
      rank: 2,
      change: 'up' as const
    },
    {
      id: 'current',
      name: 'You',
      points: 3890,
      rank: 3,
      isCurrentUser: true,
      change: 'up' as const
    },
    {
      id: 'user3',
      name: 'Emma Wilson',
      points: 3550,
      rank: 4,
      change: 'down' as const
    },
    {
      id: 'user4',
      name: 'Ryu Tanaka',
      points: 3210,
      rank: 5,
      change: 'same' as const
    }
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-kyuzo-paper mb-2">
              Welcome back, <span className="text-kyuzo-gold">Learner</span>
            </h1>
            <p className="text-kyuzo-paper/70">Continue your journey to knowledge mastery</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-kyuzo-red/20 p-3 rounded-lg">
                  <Calendar size={24} className="text-kyuzo-gold" />
                </div>
                <span className="text-xs text-kyuzo-paper/60">Current</span>
              </div>
              <p className="text-sm text-kyuzo-paper/70 mb-1">Daily Streak</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-kyuzo-paper">7 days</p>
                <span className="text-xs text-green-400">▲ 2</span>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-kyuzo-red/20 p-3 rounded-lg">
                  <Target size={24} className="text-kyuzo-gold" />
                </div>
                <span className="text-xs text-kyuzo-paper/60">Total</span>
              </div>
              <p className="text-sm text-kyuzo-paper/70 mb-1">Points Earned</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-kyuzo-paper">3,890</p>
                <span className="text-xs text-green-400">▲ 145</span>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-kyuzo-red/20 p-3 rounded-lg">
                  <SquareStack size={24} className="text-kyuzo-gold" />
                </div>
                <span className="text-xs text-kyuzo-paper/60">Total</span>
              </div>
              <p className="text-sm text-kyuzo-paper/70 mb-1">Quizzes Completed</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-kyuzo-paper">24</p>
                <span className="text-xs text-green-400">▲ 3</span>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-kyuzo-red/20 p-3 rounded-lg">
                  <Clock size={24} className="text-kyuzo-gold" />
                </div>
                <span className="text-xs text-kyuzo-paper/60">Total</span>
              </div>
              <p className="text-sm text-kyuzo-paper/70 mb-1">Study Time</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-kyuzo-paper">14.5 hrs</p>
                <span className="text-xs text-green-400">▲ 2.3</span>
              </div>
            </div>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quiz Section */}
            <div className="lg:col-span-2">
              {/* Recent Quizzes */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-kyuzo-gold">Recent Quizzes</h2>
                  <Link to="/quizzes">
                    <Button variant="outline" size="sm" icon={<ChevronRight size={16} />} iconPosition="right">
                      View All
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} {...quiz} />
                  ))}
                </div>
              </div>
              
              {/* Create New Quiz */}
              <div className="glass-card p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-kyuzo-gold">Create New Quiz</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link to="/quizzes/create" className="border border-kyuzo-gold/20 rounded-lg p-6 hover:bg-kyuzo-red/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-kyuzo-red/20 p-3 rounded-lg">
                        <BookOpen size={24} className="text-kyuzo-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium text-kyuzo-paper mb-1">AI-Generated Quiz</h3>
                        <p className="text-sm text-kyuzo-paper/70">Create a custom quiz using AI</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/quizzes/create-manual" className="border border-kyuzo-gold/20 rounded-lg p-6 hover:bg-kyuzo-red/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-kyuzo-red/20 p-3 rounded-lg">
                        <Plus size={24} className="text-kyuzo-gold" />
                      </div>
                      <div>
                        <h3 className="font-medium text-kyuzo-paper mb-1">Create Manually</h3>
                        <p className="text-sm text-kyuzo-paper/70">Build your own custom quiz</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column - Social Feed & Leaderboard */}
            <div>
              <div className="space-y-8">
                <FriendActivity activities={friendActivities} />
                <Leaderboard users={leaderboardUsers} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
