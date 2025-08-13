import { motion } from "framer-motion";
import { Code, Terminal, CheckCircle, Zap, BarChart2, Cpu, Star } from 'react-feather';
import FloatingBackground from "../Ui/floatingBg";
import { useState, useEffect } from "react";

const rotatingWords = ["coding", "problem-solving", "development", "algorithms"];
const rotatingColors = ["text-amber-400", "text-indigo-400", "text-purple-400", "text-emerald-400"];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => 
        prevIndex === rotatingWords.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6 relative overflow-hidden">
      <FloatingBackground/>
      
      {/* Floating animated elements */}
      <motion.div 
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-10 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-xl"
      />
      
      <motion.div 
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-600/10 to-transparent blur-xl"
      />

      <div className="max-w-4xl w-full flex flex-col items-center justify-center text-center z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 w-full"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Transform your{' '}
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`inline-block ${rotatingColors[currentWordIndex]}`}
            >
              {rotatingWords[currentWordIndex]}
            </motion.span>{' '}
            <span className="text-gray-300">skills with</span>{' '}
            <br className="md:hidden"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-indigo-500">
              intelligent solutions
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The platform that helps you <span className="text-green-300">solve problems</span>. 
            Get <span className="text-indigo-400">AI-powered assistance</span>, different language support, 
            and <span className="text-purple-400">competitive insights</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Solving Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gray-800/70 border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-700/50 transition-all"
            >
              Explore
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}