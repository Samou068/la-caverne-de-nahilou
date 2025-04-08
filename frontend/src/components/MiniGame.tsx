import React from 'react';
import { motion } from 'framer-motion';

interface MiniGameProps {
  title: string;
  description: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  imageUrl?: string;
}

const MiniGame: React.FC<MiniGameProps> = ({ title, description, difficulty, imageUrl }) => {
  const difficultyColor = {
    facile: 'bg-green-500',
    moyen: 'bg-yellow-500',
    difficile: 'bg-red-500'
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">🎮</span>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className={`${difficultyColor[difficulty]} text-xs px-2 py-1 rounded-full text-white`}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-gray-200 mb-6">{description}</p>
        
        <motion.button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg"
          whileTap={{ scale: 0.95 }}
        >
          Jouer maintenant
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MiniGame;
