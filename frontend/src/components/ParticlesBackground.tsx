import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Composant pour les particules animées
const ParticlesBackground = () => {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; color: string; speed: number }[]>([]);

  useEffect(() => {
    // Créer des particules aléatoires
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 255, ${Math.random() * 0.5 + 0.2})`,
      speed: Math.random() * 2 + 0.5
    }));
    
    setParticles(newParticles);
    
    // Animation des particules
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y > 100 ? 0 : particle.y + particle.speed * 0.1,
          x: particle.x + (Math.random() - 0.5) * 0.2
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
