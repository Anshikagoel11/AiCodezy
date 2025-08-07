import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [symbol, setSymbol] = useState('</>');
  const [visible, setVisible] = useState(false);
  const codingSymbols = [
    '{ }', '</>', '();', '=>', '[]', 
    '/*', '*/', ':=', '++', '!=', 
    '===', '...', '${ }', '#', '::'
  ];
 

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setSymbol(codingSymbols[Math.floor(Math.random() * codingSymbols.length)]);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            x: position.x + 15,
            y: position.y + 15,
            opacity: 1
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            type: 'spring',
            damping: 20,
            stiffness: 300,
            mass: 0.5
          }}
        >
          <div className="relative">
            <motion.div
              className="w-8 h-8 bg-gray-900/50 rounded-full absolute"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-8 h-8 flex items-center justify-center text-blue-400 font-mono font-bold text-xs"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {symbol}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cursor;