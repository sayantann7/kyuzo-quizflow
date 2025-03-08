
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus, BarChart4 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ButtonCustom from '@/components/ui/button-custom';
import { Button } from '@/components/ui/button';
import QuizCard from '@/components/quiz/QuizCard';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/theme/theme-provider';

// Mock quiz data 
const quizzes = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    category: 'Programming',
    difficulty: 'Intermediate',
    questionCount: 15,
    completedCount: 352,
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
    description: 'Test your knowledge of JavaScript basics, including variables, functions, and control flow.',
    date: '2023-08-15'
  },
  {
    id: '2',
    title: 'World Geography',
    category: 'Education',
    difficulty: 'Easy',
    questionCount: 20,
    completedCount: 123,
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2333&q=80',
    description: 'Explore countries, capitals, and landmarks in this beginner-friendly geography quiz.',
    date: '2023-09-01'
  },
  {
    id: '3',
    title: 'MCU Trivia Challenge',
    category: 'Entertainment',
    difficulty: 'Hard',
    questionCount: 25,
    completedCount: 748,
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
    description: 'The ultimate challenge for Marvel Cinematic Universe fans. Test your knowledge of characters, plots, and easter eggs.',
    date: '2023-09-15'
  },
  {
    id: '4',
    title: 'React Hooks Deep Dive',
    category: 'Programming',
    difficulty: 'Expert',
    questionCount: 12,
    completedCount: 93,
    coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    description: 'Advanced questions about React Hooks, their usage patterns, and common pitfalls.',
    date: '2023-09-30'
  },
  {
    id: '5',
    title: 'Ancient Civilizations',
    category: 'History',
    difficulty: 'Intermediate',
    questionCount: 18,
    completedCount: 215,
    coverImage: 'https://images.unsplash.com/photo-1669651187604-f0ac9a156fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    description: 'Journey through Egypt, Greece, Rome, and more. Learn about their contributions to modern society.',
    date: '2023-10-10'
  },
  {
    id: '6',
    title: 'Music Theory Basics',
    category: 'Arts',
    difficulty: 'Easy',
    questionCount: 10,
    completedCount: 86,
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80',
    description: 'Learn about notes, scales, and basic harmony in this introductory music theory quiz.',
    date: '2023-10-20'
  }
];

// Add completed property to some quizzes
const myQuizzes = quizzes.map((quiz, index) => ({
  ...quiz,
  completed: index % 2 === 0,
  score: index % 2 === 0 ? Math.floor(Math.random() * 100) : null
}));

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { theme } = useTheme();
  
  const filteredQuizzes = myQuizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'completed') return matchesSearch && quiz.completed;
    if (activeTab === 'incomplete') return matchesSearch && !quiz.completed;
    
    return matchesSearch;
  });
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 font-calligraphy">
          <span className="text-kyuzo-gold">My</span>{" "}
          <span className="text-kyuzo-paper dark:text-kyuzo-paper light:text-kyuzo-black">Quizzes</span>
        </h1>
        <p className="text-kyuzo-paper/70 dark:text-kyuzo-paper/70 light:text-kyuzo-black/70">
          Manage and track all your created and completed quizzes
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kyuzo-paper/50" size={18} />
          <Input
            placeholder="Search quizzes..."
            className="pl-10 bg-kyuzo-black/20 border-kyuzo-gold/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="border-kyuzo-gold/30 text-kyuzo-gold">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
          
          <Link to="/create-quiz">
            <ButtonCustom 
              variant="default" 
              icon={<Plus size={16} />}
              iconPosition="left"
            >
              Create New Quiz
            </ButtonCustom>
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="bg-kyuzo-black/30 border border-kyuzo-gold/20">
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="incomplete">Not Attempted</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4 flex justify-center">
                <BarChart4 size={48} className="text-kyuzo-paper/30" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No quizzes found</h3>
              <p className="text-kyuzo-paper/60">
                {searchTerm ? "Try adjusting your search term" : "Start by creating your first quiz"}
              </p>
              {!searchTerm && (
                <div className="mt-4">
                  <Link to="/create-quiz">
                    <ButtonCustom 
                      variant="default" 
                      size="sm"
                      icon={<Plus size={16} />}
                    >
                      Create New Quiz
                    </ButtonCustom>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.map(quiz => (
                <Link to={`/attempt-quiz/${quiz.id}`} key={quiz.id}>
                  <QuizCard
                    key={quiz.id}
                    title={quiz.title}
                    description={quiz.description}
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    questionCount={quiz.questionCount}
                    completedCount={quiz.completedCount}
                    imageUrl={quiz.coverImage}
                    completed={quiz.completed}
                    score={quiz.score}
                  />
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          {/* Similar content for completed quizzes tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <Link to={`/attempt-quiz/${quiz.id}`} key={quiz.id}>
                <QuizCard
                  key={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  category={quiz.category}
                  difficulty={quiz.difficulty}
                  questionCount={quiz.questionCount}
                  completedCount={quiz.completedCount}
                  imageUrl={quiz.coverImage}
                  completed={quiz.completed}
                  score={quiz.score}
                />
              </Link>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="incomplete" className="mt-6">
          {/* Similar content for incomplete quizzes tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => (
              <Link to={`/attempt-quiz/${quiz.id}`} key={quiz.id}>
                <QuizCard
                  key={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  category={quiz.category}
                  difficulty={quiz.difficulty}
                  questionCount={quiz.questionCount}
                  completedCount={quiz.completedCount}
                  imageUrl={quiz.coverImage}
                  completed={quiz.completed}
                  score={quiz.score}
                />
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quizzes;
