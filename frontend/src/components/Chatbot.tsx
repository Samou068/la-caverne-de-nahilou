import React from 'react';
import { motion } from 'framer-motion';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState<{text: string, sender: 'user' | 'bot'}[]>([
    { text: "Bonjour ! Je suis Nahilou, ton ami virtuel. Comment puis-je t'aider aujourd'hui ?", sender: 'bot' }
  ]);
  const [input, setInput] = React.useState('');
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Ajouter le message de l'utilisateur
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    
    // Simuler une réponse du chatbot (à remplacer par l'API DeepSeek)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Je suis désolé, je suis encore en train d'apprendre. L'intégration avec DeepSeek sera bientôt disponible !", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <motion.div 
      className={`fixed bottom-0 right-0 w-full md:w-96 h-96 bg-indigo-900 rounded-t-xl shadow-xl z-50 ${!isOpen && 'hidden'}`}
      initial={{ y: 400 }}
      animate={{ y: isOpen ? 0 : 400 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-between items-center p-4 border-b border-indigo-700">
        <h3 className="text-xl font-bold text-white">Chat avec Nahilou</h3>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-300"
        >
          ✕
        </button>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 flex flex-col space-y-2">
        {messages.map((message, index) => (
          <motion.div 
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              message.sender === 'user' 
                ? 'bg-purple-600 text-white self-end' 
                : 'bg-indigo-700 text-white self-start'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message.text}
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 border-t border-indigo-700 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Tape ton message ici..."
          className="flex-1 p-2 rounded-l-lg focus:outline-none text-gray-800"
        />
        <button
          onClick={handleSendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-r-lg"
        >
          Envoyer
        </button>
      </div>
    </motion.div>
  );
};

export default Chatbot;
