
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ButtonCustom from '../components/ui/button-custom';
import { useToast } from "@/hooks/use-toast";

// Mock quiz data
const mockQuizData = {
  id: 'q1',
  title: 'Japanese Feudal History',
  description: 'Test your knowledge about Japanese feudal era',
  questions: [
    {
      id: '1',
      question: 'Which period in Japanese history is known as the "Warring States" period?',
      options: ['Heian period', 'Sengoku period', 'Edo period', 'Meiji period'],
      correctAnswer: 1
    },
    {
      id: '2',
      question: 'Who was the first shogun of the Tokugawa shogunate?',
      options: ['Oda Nobunaga', 'Toyotomi Hideyoshi', 'Tokugawa Ieyasu', 'Minamoto no Yoritomo'],
      correctAnswer: 2
    },
    {
      id: '3',
      question: 'What was the social class system called during the Edo period?',
      options: ['Bakufu', 'Shinokosho', 'Daimyo', 'Bushido'],
      correctAnswer: 1
    },
    {
      id: '4',
      question: 'Which of these weapons was most associated with the samurai?',
      options: ['Yumi (bow)', 'Katana', 'Naginata', 'Kanabo'],
      correctAnswer: 1
    },
    {
      id: '5',
      question: 'Which clan ruled Japan during the Edo period?',
      options: ['Oda', 'Toyotomi', 'Tokugawa', 'Taira'],
      correctAnswer: 2
    }
  ]
};

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock loading state
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);
  
  // Quiz attempt state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load quiz data
  useEffect(() => {
    // In a real app, this would fetch the quiz from an API
    setTimeout(() => {
      setQuiz(mockQuizData);
      setSelectedAnswers(new Array(mockQuizData.questions.length).fill(-1));
      setIsLoading(false);
    }, 1000);
  }, [quizId]);
  
  // Handle timer
  useEffect(() => {
    if (isLoading || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit when time runs out
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isLoading, timeRemaining]);
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    // Check if all questions have been answered
    if (selectedAnswers.includes(-1)) {
      toast({
        title: "Incomplete quiz",
        description: "Please answer all questions before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Calculate score
    const score = selectedAnswers.reduce((acc, answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    // In a real app, this would send the results to an API
    setTimeout(() => {
      navigate(`/quiz-results/${quizId}`, { 
        state: { 
          score,
          total: quiz.questions.length,
          percentage,
          selectedAnswers,
          quizTitle: quiz.title
        } 
      });
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 px-6 md:px-12 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-kyuzo-gold/20 border-t-kyuzo-gold rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-kyuzo-paper">Loading quiz...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-kyuzo-paper mb-2">
              {quiz.title}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-kyuzo-paper/70">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
              <div className="flex items-center gap-2 bg-kyuzo-red/10 px-3 py-1 rounded-full">
                <Clock size={16} className="text-kyuzo-gold" />
                <span className="text-kyuzo-gold font-medium">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-medium text-kyuzo-paper mb-6">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option: string, index: number) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestionIndex] === index 
                      ? 'bg-kyuzo-red/20 border-kyuzo-red' 
                      : 'bg-kyuzo-black/50 border-kyuzo-gold/20 hover:bg-kyuzo-black/70'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedAnswers[currentQuestionIndex] === index 
                        ? 'bg-kyuzo-red text-kyuzo-paper' 
                        : 'bg-kyuzo-black/70 text-kyuzo-paper/70'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-kyuzo-paper">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <ButtonCustom
              variant="outline"
              icon={<ArrowLeft size={18} />}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </ButtonCustom>
            
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <ButtonCustom
                variant="default"
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </ButtonCustom>
            ) : (
              <ButtonCustom
                variant="default"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                onClick={handleNextQuestion}
              >
                Next
              </ButtonCustom>
            )}
          </div>
          
          {/* Quiz progress */}
          <div className="mt-8">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {quiz.questions.map((_: any, index: number) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                    index === currentQuestionIndex
                      ? 'bg-kyuzo-gold text-kyuzo-black'
                      : selectedAnswers[index] !== -1
                        ? 'bg-kyuzo-red/20 text-kyuzo-paper border border-kyuzo-red'
                        : 'bg-kyuzo-black/50 text-kyuzo-paper/70 border border-kyuzo-gold/20'
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AttemptQuiz;
