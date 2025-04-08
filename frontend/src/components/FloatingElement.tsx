import React, { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  amplitude?: number;
  duration?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  delay = 0, 
  amplitude = 10, 
  duration = 4,
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, amplitude, 0, -amplitude, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatType: "loop",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
