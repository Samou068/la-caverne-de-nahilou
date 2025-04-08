import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  title: string;
  category: string;
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ title, category, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  
  const handleOptionClick = (optionIndex: number) => {
    if (answered) return;
    
    setSelectedOption(optionIndex);
    setAnswered(true);
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setAnswered(false);
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <span className="bg-blue-600/50 text-xs px-3 py-1 rounded-full text-white">
          {category}
        </span>
      </div>
      
      {!showResult ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white mb-2">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <motion.div 
            className="bg-indigo-800/50 p-4 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={currentQuestion}
          >
            <p className="text-white text-lg mb-4">{questions[currentQuestion].question}</p>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-3 rounded-lg ${
                    selectedOption === index 
                      ? index === questions[currentQuestion].correctAnswer 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  onClick={() => handleOptionClick(index)}
                  whileHover={{ scale: answered ? 1 : 1.02 }}
                  whileTap={{ scale: answered ? 1 : 0.98 }}
                  disabled={answered}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Quiz terminé !</h3>
          <p className="text-xl text-white mb-6">
            Ton score: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
          </p>
          
          {score === questions.length ? (
            <p className="text-green-400 text-lg mb-8">Parfait ! Tu as tout bon !</p>
          ) : score >= questions.length / 2 ? (
            <p className="text-yellow-400 text-lg mb-8">Bien joué ! Continue à t'entraîner !</p>
          ) : (
            <p className="text-red-400 text-lg mb-8">Continue à apprendre, tu vas t'améliorer !</p>
          )}
          
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            onClick={resetQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Recommencer le quiz
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
