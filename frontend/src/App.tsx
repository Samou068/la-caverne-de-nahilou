import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import ParallaxBackground from './components/ParallaxBackground';
import MagicLightEffect from './components/MagicLightEffect';
import FloatingElement from './components/FloatingElement';
import PageTransition from './components/PageTransition';
import Chatbot from './components/Chatbot';
import MiniGame from './components/MiniGame';
import InteractiveStory from './components/InteractiveStory';
import CreativeSpace from './components/CreativeSpace';
import Quiz from './components/Quiz';

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [pageVisible, setPageVisible] = useState(true);
  
  // Données d'exemple pour les mini-jeux
  const miniGames = [
    {
      title: "Puzzle des nombres",
      description: "Apprends à compter en t'amusant avec ce puzzle coloré !",
      difficulty: "facile" as const
    },
    {
      title: "Mémoire des animaux",
      description: "Retrouve les paires d'animaux et améliore ta mémoire !",
      difficulty: "moyen" as const
    },
    {
      title: "Labyrinthe magique",
      description: "Trouve ton chemin à travers ce labyrinthe enchanté !",
      difficulty: "difficile" as const
    }
  ];
  
  // Données d'exemple pour les histoires
  const stories = [
    {
      title: "La forêt enchantée",
      preview: "Découvre les secrets d'une forêt magique où les arbres parlent et les animaux ont des pouvoirs...",
      tags: ["Aventure", "Magie", "Nature"]
    },
    {
      title: "Le trésor du pirate",
      preview: "Pars à la recherche d'un trésor caché par le célèbre pirate Barbe-Rouge...",
      tags: ["Pirates", "Aventure", "Océan"]
    }
  ];
  
  // Données d'exemple pour le quiz
  const sampleQuiz = {
    title: "Quiz sur les animaux",
    category: "Nature",
    questions: [
      {
        question: "Quel animal est le plus grand du monde ?",
        options: ["Éléphant", "Girafe", "Baleine bleue", "Dinosaure"],
        correctAnswer: 2
      },
      {
        question: "Combien de pattes a une araignée ?",
        options: ["4", "6", "8", "10"],
        correctAnswer: 2
      },
      {
        question: "Quel animal peut voler ?",
        options: ["Pingouin", "Autruche", "Chauve-souris", "Poisson"],
        correctAnswer: 2
      }
    ]
  };
  
  const handleSaveDrawing = (imageData: string) => {
    console.log("Dessin sauvegardé :", imageData.substring(0, 50) + "...");
    // Ici, on pourrait envoyer l'image au backend ou l'afficher
  };

  const changePage = (page: string) => {
    setPageVisible(false);
    setTimeout(() => {
      setCurrentPage(page);
      setPageVisible(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-800 to-indigo-900 text-white relative overflow-x-hidden">
      {/* Fond avec effet parallaxe */}
      <ParallaxBackground />
      
      {/* Effet de lumière magique suivant la souris */}
      <MagicLightEffect color="#9c27b0" size={250} intensity={0.5} />
      
      <header className="container mx-auto py-6 px-4 relative z-10">
        <FloatingElement amplitude={5} duration={6} className="text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            La caverne de Nahilou
          </motion.h1>
        </FloatingElement>
        <motion.p 
          className="text-xl md:text-2xl text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          L'aventure commence ici !
        </motion.p>
        
        {/* Navigation */}
        <motion.nav 
          className="mt-8 flex justify-center space-x-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button 
            className={`px-4 py-2 rounded-full ${currentPage === 'home' ? 'bg-purple-600' : 'bg-purple-800/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePage('home')}
          >
            Accueil
          </motion.button>
          <motion.button 
            className={`px-4 py-2 rounded-full ${currentPage === 'games' ? 'bg-purple-600' : 'bg-purple-800/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePage('games')}
          >
            Mini-jeux
          </motion.button>
          <motion.button 
            className={`px-4 py-2 rounded-full ${currentPage === 'stories' ? 'bg-purple-600' : 'bg-purple-800/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePage('stories')}
          >
            Histoires
          </motion.button>
          <motion.button 
            className={`px-4 py-2 rounded-full ${currentPage === 'creative' ? 'bg-purple-600' : 'bg-purple-800/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePage('creative')}
          >
            Espace créatif
          </motion.button>
          <motion.button 
            className={`px-4 py-2 rounded-full ${currentPage === 'quiz' ? 'bg-purple-600' : 'bg-purple-800/50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePage('quiz')}
          >
            Quiz
          </motion.button>
        </motion.nav>
      </header>
      
      <main className="container mx-auto py-8 px-4 relative z-10">
        <PageTransition isVisible={pageVisible}>
          {currentPage === 'home' && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Carte Mini-jeux */}
              <FloatingElement delay={0.1} amplitude={8} duration={5}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Mini-jeux éducatifs</h2>
                  <p className="mb-4">Découvre des puzzles, casse-têtes et jeux de mémoire amusants qui te feront apprendre tout en t'amusant !</p>
                  <button 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => changePage('games')}
                  >
                    Jouer maintenant
                  </button>
                </motion.div>
              </FloatingElement>
              
              {/* Carte Histoires interactives */}
              <FloatingElement delay={0.2} amplitude={8} duration={5.5}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Histoires interactives</h2>
                  <p className="mb-4">Plonge dans des aventures passionnantes où tu pourras choisir ta propre histoire et vivre des expériences uniques !</p>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => changePage('stories')}
                  >
                    Commencer une histoire
                  </button>
                </motion.div>
              </FloatingElement>
              
              {/* Carte Chatbot */}
              <FloatingElement delay={0.3} amplitude={8} duration={6}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Chatbot "Ami"</h2>
                  <p className="mb-4">Discute avec ton nouvel ami virtuel qui répondra à toutes tes questions et t'aidera dans tes aventures !</p>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => setChatbotOpen(true)}
                  >
                    Parler à mon ami
                  </button>
                </motion.div>
              </FloatingElement>
              
              {/* Carte Espace créatif */}
              <FloatingElement delay={0.4} amplitude={8} duration={5.2}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Espace créatif</h2>
                  <p className="mb-4">Dessine, colorie et crée des œuvres d'art magnifiques que tu pourras partager avec tes amis !</p>
                  <button 
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => changePage('creative')}
                  >
                    Créer maintenant
                  </button>
                </motion.div>
              </FloatingElement>
              
              {/* Carte Quiz */}
              <FloatingElement delay={0.5} amplitude={8} duration={5.7}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Quiz intelligents</h2>
                  <p className="mb-4">Teste tes connaissances avec des quiz sur les sciences, les animaux, le monde et bien plus encore !</p>
                  <button 
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => changePage('quiz')}
                  >
                    Commencer un quiz
                  </button>
                </motion.div>
              </FloatingElement>
              
              {/* Carte Contrôle parental */}
              <FloatingElement delay={0.6} amplitude={8} duration={5.4}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Espace parents</h2>
                  <p className="mb-4">Un espace dédié aux parents pour suivre les progrès de leurs enfants et gérer les paramètres de sécurité.</p>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                    Accéder à l'espace parents
                  </button>
                </motion.div>
              </FloatingElement>
            </section>
          )}
          
          {currentPage === 'games' && (
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Mini-jeux éducatifs
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {miniGames.map((game, index) => (
                  <FloatingElement key={index} delay={index * 0.1} amplitude={5} duration={5 + index}>
                    <MiniGame 
                      title={game.title}
                      description={game.description}
                      difficulty={game.difficulty}
                    />
                  </FloatingElement>
                ))}
              </div>
            </section>
          )}
          
          {currentPage === 'stories' && (
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Histoires interactives
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stories.map((story, index) => (
                  <FloatingElement key={index} delay={index * 0.2} amplitude={6} duration={5 + index * 0.5}>
                    <InteractiveStory 
                      title={story.title}
                      preview={story.preview}
                      tags={story.tags}
                    />
                  </FloatingElement>
                ))}
              </div>
            </section>
          )}
          
          {currentPage === 'creative' && (
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Espace créatif
              </motion.h2>
              <CreativeSpace onSave={handleSaveDrawing} />
            </section>
          )}
          
          {currentPage === 'quiz' && (
            <section>
              <motion.h2 
                className="text-3xl font-bold mb-6 text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Quiz intelligents
              </motion.h2>
              <Quiz 
                title={sampleQuiz.title}
                category={sampleQuiz.category}
                questions={sampleQuiz.questions}
              />
            </section>
          )}
        </PageTransition>
      </main>
      
      {/* Bouton flottant pour le chatbot */}
      <motion.div
        className="fixed bottom-6 right-6 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold p-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setChatbotOpen(true)}
        >
          <span className="text-2xl">💬</span>
        </button>
      </motion.div>
      
      {/* Chatbot */}
      <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      
      <footer className="container mx-auto py-6 px-4 text-center relative z-10">
        <p>© 2025 La caverne de Nahilou - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default App;
