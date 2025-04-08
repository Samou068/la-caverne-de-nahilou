import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MagicLightEffectProps {
  color?: string;
  size?: number;
  intensity?: number;
}

const MagicLightEffect: React.FC<MagicLightEffectProps> = ({ 
  color = '#8b5cf6', 
  size = 300, 
  intensity = 0.7 
}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    // Animation de pulsation continue
    const animate = async () => {
      await controls.start({
        scale: [1, 1.2, 1],
        opacity: [intensity, intensity * 0.8, intensity],
        filter: ['blur(40px)', 'blur(60px)', 'blur(40px)'],
        transition: {
          duration: 4,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };
    
    animate();
  }, [controls, intensity]);
  
  // Suivre la position de la souris
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <motion.div
      className="fixed pointer-events-none z-10"
      animate={controls}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        left: mousePosition.x - size / 2,
        top: mousePosition.y - size / 2,
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default MagicLightEffect;
