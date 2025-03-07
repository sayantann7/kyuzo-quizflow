
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Filter, BookOpen, Clock, Search, Plus } from 'lucide-react';
import ButtonCustom from '../components/ui/button-custom';

interface QuizItem {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  questions: number;
  createdAt: string;
  tags: string[];
  lastAttempt?: string;
  bestScore?: number;
}

const Quizzes = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample quiz data
  const quizzes: QuizItem[] = [
    {
      id: 'q1',
      title: 'Japanese Feudal History',
      difficulty: 'intermediate',
      questions: 15,
      createdAt: '2023-10-12',
      tags: ['history', 'japan', 'feudal'],
      lastAttempt: '2 days ago',
      bestScore: 85
    },
    {
      id: 'q2',
      title: 'Samurai Weapons & Armor',
      difficulty: 'advanced',
      questions: 20,
      createdAt: '2023-10-08',
      tags: ['weapons', 'samurai', 'martial arts'],
      lastAttempt: '1 week ago',
      bestScore: 72
    },
    {
      id: 'q3',
      title: 'Edo Period Art & Culture',
      difficulty: 'intermediate',
      questions: 12,
      createdAt: '2023-10-02',
      tags: ['art', 'culture', 'edo'],
      lastAttempt: '3 weeks ago',
      bestScore: 90
    },
    {
      id: 'q4',
      title: 'Basic Japanese Phrases',
      difficulty: 'beginner',
      questions: 10,
      createdAt: '2023-09-25',
      tags: ['language', 'basics', 'phrases']
    },
    {
      id: 'q5',
      title: 'Meiji Restoration',
      difficulty: 'advanced',
      questions: 18,
      createdAt: '2023-09-18',
      tags: ['history', 'meiji', 'restoration'],
      lastAttempt: '1 month ago',
      bestScore: 78
    },
    {
      id: 'q6',
      title: 'Japanese Mythology',
      difficulty: 'intermediate',
      questions: 15,
      createdAt: '2023-09-10',
      tags: ['mythology', 'folklore', 'religion'],
      lastAttempt: '2 months ago',
      bestScore: 83
    },
    {
      id: 'q7',
      title: 'Modern Japan',
      difficulty: 'beginner',
      questions: 12,
      createdAt: '2023-08-30',
      tags: ['modern', 'contemporary', 'society']
    },
    {
      id: 'q8',
      title: 'Japanese Traditional Food',
      difficulty: 'beginner',
      questions: 10,
      createdAt: '2023-08-15',
      tags: ['food', 'cuisine', 'traditional'],
      lastAttempt: '3 months ago',
      bestScore: 95
    }
  ];

  // Filter and search quizzes
  const filteredQuizzes = quizzes
    .filter(quiz => {
      // Apply difficulty filter
      if (filter !== 'all' && quiz.difficulty !== filter) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          quiz.title.toLowerCase().includes(query) ||
          quiz.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });

  // Map difficulty to color
  const difficultyColor = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-orange-500/20 text-orange-400',
    master: 'bg-red-500/20 text-red-400'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kyuzo-gold mb-4 font-calligraphy">Your Quizzes</h1>
            <p className="text-kyuzo-paper/70 mb-6">
              Browse, search, and manage all your created and saved quizzes.
            </p>
            
            {/* Search and Create New */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-kyuzo-paper/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search by title or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                />
              </div>
              
              <Link to="/create-quiz">
                <ButtonCustom 
                  variant="default" 
                  size="default"
                  icon={<Plus size={18} />}
                >
                  Create New Quiz
                </ButtonCustom>
              </Link>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <ButtonCustom 
                variant={filter === 'all' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </ButtonCustom>
              <ButtonCustom 
                variant={filter === 'beginner' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('beginner')}
              >
                Beginner
              </ButtonCustom>
              <ButtonCustom 
                variant={filter === 'intermediate' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('intermediate')}
              >
                Intermediate
              </ButtonCustom>
              <ButtonCustom 
                variant={filter === 'advanced' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setFilter('advanced')}
              >
                Advanced
              </ButtonCustom>
              <ButtonCustom 
                variant="ghost" 
                size="sm"
                icon={<Filter size={14} />}
              >
                More Filters
              </ButtonCustom>
            </div>
          </div>

          {/* Quizzes Grid */}
          {filteredQuizzes.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-xl text-kyuzo-paper/60 mb-4">No quizzes found</p>
              <p className="text-kyuzo-paper/50 mb-6">Try adjusting your filters or create a new quiz.</p>
              <Link to="/create-quiz">
                <ButtonCustom 
                  variant="default" 
                  icon={<Plus size={18} />}
                >
                  Create New Quiz
                </ButtonCustom>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map((quiz) => (
                <div key={quiz.id} className="glass-card overflow-hidden flex flex-col">
                  <div className="p-5 flex-grow">
                    <h3 className="text-lg font-medium text-kyuzo-paper mb-2">{quiz.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[quiz.difficulty]}`}>
                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                      </span>
                      
                      {quiz.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-kyuzo-red/10 text-kyuzo-paper/70">
                          {tag}
                        </span>
                      ))}
                      
                      {quiz.tags.length > 2 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-kyuzo-black/40 text-kyuzo-paper/50">
                          +{quiz.tags.length - 2}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1 text-kyuzo-paper/60 text-sm">
                      <BookOpen size={14} />
                      <span>{quiz.questions} questions</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-kyuzo-paper/60 text-sm">
                      <Clock size={14} />
                      <span>Created: {new Date(quiz.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {quiz.lastAttempt && (
                      <div className="mt-3 pt-3 border-t border-kyuzo-gold/10">
                        <div className="flex justify-between">
                          <span className="text-xs text-kyuzo-paper/60">Last attempt: {quiz.lastAttempt}</span>
                          {quiz.bestScore && (
                            <span className="text-xs text-kyuzo-gold">Best: {quiz.bestScore}%</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-kyuzo-red/5 border-t border-kyuzo-gold/10 flex gap-2">
                    <Link to={`/attempt-quiz/${quiz.id}`} className="flex-1">
                      <ButtonCustom 
                        variant="default" 
                        size="sm"
                        className="w-full"
                      >
                        Take Quiz
                      </ButtonCustom>
                    </Link>
                    <ButtonCustom 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      Edit
                    </ButtonCustom>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quizzes;
