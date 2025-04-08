import React from 'react';
import { motion } from 'framer-motion';

interface StoryProps {
  title: string;
  preview: string;
  coverImage?: string;
  tags: string[];
}

const InteractiveStory: React.FC<StoryProps> = ({ title, preview, coverImage, tags }) => {
  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        {coverImage ? (
          <img src={coverImage} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">📚</span>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-600/50 text-xs px-2 py-1 rounded-full text-white">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-gray-200 mb-6">{preview}</p>
        
        <motion.button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
          whileTap={{ scale: 0.95 }}
        >
          Commencer l'histoire
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InteractiveStory;
