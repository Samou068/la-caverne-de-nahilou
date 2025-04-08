import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  onAnimationComplete?: () => void;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    }
  }
};

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  isVisible, 
  onAnimationComplete 
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="page-content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          onAnimationComplete={onAnimationComplete}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
