import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  // Effet de lumière scintillante
  const [lights, setLights] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Créer des points de lumière aléatoires
    const newLights = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 5
    }));
    
    setLights(newLights);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Couche de fond - la plus éloignée */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-purple-900 via-blue-800 to-indigo-900"
        style={{ opacity }}
      />
      
      {/* Couche de cristaux lointains */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y1 }}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <div 
            key={`crystal-far-${index}`}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </motion.div>
      
      {/* Couche de cristaux intermédiaires */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div 
            key={`crystal-mid-${index}`}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </motion.div>
      
      {/* Couche de cristaux proches */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y3 }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div 
            key={`crystal-near-${index}`}
            className="absolute rounded-full bg-white/30 backdrop-blur-md"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </motion.div>
      
      {/* Points de lumière scintillants */}
      {lights.map((light, index) => (
        <motion.div
          key={`light-${index}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: `${light.size}px`,
            height: `${light.size}px`,
            filter: 'blur(5px)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: light.delay,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;
