
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Award, BarChart, ArrowRight, Home, RotateCcw } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ButtonCustom from '../components/ui/button-custom';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, percentage, quizTitle } = location.state || { 
    score: 0, 
    total: 0, 
    percentage: 0,
    quizTitle: 'Quiz'
  };
  
  // Determine feedback based on percentage
  const getFeedback = () => {
    if (percentage >= 90) {
      return {
        message: "Outstanding! You've mastered this material.",
        tips: [
          "Challenge yourself with more advanced quizzes",
          "Consider creating your own quizzes to share knowledge",
          "Help others by explaining these concepts to friends"
        ],
        color: "text-green-400"
      };
    } else if (percentage >= 70) {
      return {
        message: "Great job! You have a solid understanding of the material.",
        tips: [
          "Review the few questions you missed",
          "Try taking the quiz again to achieve mastery",
          "Explore related topics to deepen your knowledge"
        ],
        color: "text-blue-400"
      };
    } else if (percentage >= 50) {
      return {
        message: "Good effort! You're on the right track but need more practice.",
        tips: [
          "Focus on the specific areas where you made mistakes",
          "Take notes on the correct answers",
          "Try similar quizzes to reinforce your learning"
        ],
        color: "text-yellow-400"
      };
    } else {
      return {
        message: "Keep going! This topic needs more study time.",
        tips: [
          "Review the fundamentals of this topic before retrying",
          "Break down the material into smaller chunks",
          "Consider finding additional learning resources"
        ],
        color: "text-red-400"
      };
    }
  };
  
  const feedback = getFeedback();
  
  // XP earned calculation (simple formula for frontend demo)
  const xpEarned = Math.floor(percentage * 2);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-6 md:px-12 bg-kyuzo-black">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-kyuzo-paper mb-2">
              Quiz Results
            </h1>
            <p className="text-kyuzo-paper/70">
              {quizTitle}
            </p>
          </div>
          
          <div className="glass-card p-8 mb-8">
            <div className="flex flex-col items-center">
              {/* Score circle */}
              <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-kyuzo-black/20" 
                    strokeWidth="8"
                    stroke="currentColor" 
                    fill="transparent" 
                    r="44" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="text-kyuzo-gold" 
                    strokeWidth="8" 
                    strokeDasharray={276.46}
                    strokeDashoffset={276.46 * (1 - percentage / 100)} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="44" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-4xl font-bold text-kyuzo-paper">{percentage}%</span>
                </div>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-kyuzo-paper mb-1">
                  {score} out of {total} correct
                </h2>
                <p className={`text-lg font-medium mb-4 ${feedback.color}`}>
                  {feedback.message}
                </p>
                
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Award size={20} className="text-kyuzo-gold" />
                  <span className="text-kyuzo-gold font-medium">+{xpEarned} XP earned</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-kyuzo-gold/20 pt-6 mt-6">
              <h3 className="text-lg font-bold text-kyuzo-paper mb-4">
                Feedback & Suggestions
              </h3>
              
              <ul className="space-y-3 mb-6">
                {feedback.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight size={18} className="text-kyuzo-gold mt-0.5 flex-shrink-0" />
                    <span className="text-kyuzo-paper">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ButtonCustom 
              variant="outline"
              icon={<RotateCcw size={18} />}
              onClick={() => navigate(-2)} // Go back to the quiz page
            >
              Try Again
            </ButtonCustom>
            
            <ButtonCustom 
              variant="default"
              icon={<BarChart size={18} />}
              onClick={() => navigate('/dashboard')}
            >
              View Dashboard
            </ButtonCustom>
            
            <ButtonCustom 
              variant="outline"
              icon={<Home size={18} />}
              onClick={() => navigate('/')}
            >
              Return Home
            </ButtonCustom>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizResults;
