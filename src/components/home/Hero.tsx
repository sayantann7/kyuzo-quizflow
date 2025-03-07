
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-kyuzo-black opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-asanoha-pattern bg-repeat opacity-5 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 mb-6 border border-kyuzo-gold/20 rounded-full bg-kyuzo-red/10 backdrop-blur-sm">
              <span className="text-kyuzo-gold text-sm font-medium">
                The Path to Mastery
              </span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-calligraphy mb-6 opacity-0"
            >
              <span className="block text-kyuzo-paper">Master Your Knowledge</span>
              <span className="block text-kyuzo-gold mt-2">Challenge Your Mind</span>
            </h1>
            
            <p className="text-kyuzo-paper/90 text-lg mb-8 max-w-xl animate-fade-in animate-delay-200">
              Create personalized quizzes, connect with friends, and climb the ranks. 
              Kyuzo's intelligent platform adapts to your learning style for continuous improvement.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in animate-delay-300">
              <Link to="/dashboard">
                <Button 
                  variant="default" 
                  icon={<ArrowRight size={18} />}
                  iconPosition="right"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/quizzes">
                <Button variant="outline">Explore Quizzes</Button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="glass-card p-6 md:p-8 max-w-md mx-auto animate-fade-in animate-delay-400">
              <div className="absolute -top-4 -left-4 h-16 w-16 bg-kyuzo-red rounded-lg flex items-center justify-center shadow-lg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16V14M12 12V7M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#F7F3E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-6 text-kyuzo-gold">Create a Quiz</h3>
              
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-kyuzo-paper/80">Topic</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ancient Japan History" 
                    className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-kyuzo-paper/80">Difficulty</label>
                  <select 
                    className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Master</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-kyuzo-paper/80">Number of Questions</label>
                  <input 
                    type="number" 
                    defaultValue="10" 
                    min="1"
                    max="50"
                    className="w-full bg-kyuzo-black/50 text-kyuzo-paper border border-kyuzo-gold/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-kyuzo-gold/30"
                  />
                </div>
              </div>
              
              <Button variant="default" className="w-full">
                Generate Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
