
import React from 'react';
import { Clock, BookOpen, Award } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

export interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  questionCount: number;
  timeEstimate: number;
  completedCount?: number;
  createdAt: Date;
  isCompleted?: boolean;
  bestScore?: number;
}

const difficultyClasses = {
  beginner: "bg-green-500/20 text-green-500",
  intermediate: "bg-blue-500/20 text-blue-500",
  advanced: "bg-yellow-500/20 text-yellow-500",
  master: "bg-kyuzo-red/20 text-kyuzo-red"
};

const QuizCard = ({ 
  id, 
  title, 
  description, 
  difficulty, 
  questionCount, 
  timeEstimate,
  completedCount = 0,
  createdAt,
  isCompleted = false,
  bestScore
}: QuizCardProps) => {
  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyClasses[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            {isCompleted && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-kyuzo-gold/20 text-kyuzo-gold">
                Completed
              </span>
            )}
          </div>
          <span className="text-xs text-kyuzo-paper/60">
            {createdAt.toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-kyuzo-paper mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-kyuzo-paper/70 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-xs text-kyuzo-paper/60 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{questionCount} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{timeEstimate} min</span>
          </div>
        </div>
        
        {isCompleted && bestScore !== undefined && (
          <div className="flex items-center gap-2 mb-4 bg-kyuzo-gold/10 p-2 rounded">
            <Award size={16} className="text-kyuzo-gold" />
            <span className="text-sm text-kyuzo-paper">Best score: {bestScore}%</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-kyuzo-paper/60">
            Taken {completedCount} {completedCount === 1 ? 'time' : 'times'}
          </span>
          <Link to={`/quiz/${id}`}>
            <Button size="sm" variant={isCompleted ? "outline" : "default"}>
              {isCompleted ? "Retake" : "Start Quiz"}
            </Button>
          </Link>
        </div>
      </div>
      
      <div 
        className="h-1 bg-gradient-to-r from-kyuzo-red via-kyuzo-gold to-kyuzo-red bg-size-200 
        transition-all duration-300 group-hover:bg-pos-100"
      ></div>
    </div>
  );
};

export default QuizCard;
