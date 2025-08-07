import { motion } from "framer-motion";
import { Code, Terminal, CheckCircle, Zap, BarChart2, Cpu, Star } from 'react-feather';
import FloatingBackground from "./Ui/floatingBg";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6 relative overflow-hidden">
        <FloatingBackground/>
      {/* Floating animated elements */}
      <motion.div 
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-yellow-400/10 blur-xl"
      />
      
      <motion.div 
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-blue-400/10 blur-xl"
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-3">
            <div className="h-2 w-8 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-mono text-blue-400">AI-POWERED CODING</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Elevate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">coding</span> potential
          </h1>
          
          <p className="text-lg text-gray-400 max-w-lg">
            The intelligent platform that helps you solve problems faster. 
            Get AI-powered solutions, real-time feedback, and competitive insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Start Solving Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gray-800/70 border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-700/50 transition-all"
            >
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - Main Stats Panel */}
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-2xl relative z-10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Terminal className="text-yellow-400" size={20} />
                <h3 className="text-white font-mono">stats@aicodezy:~</h3>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
            </div>
            
            {/* Coding Stats */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-blue-300" size={18} />
                  <span className="text-gray-400 font-mono text-sm">Problems Solved</span>
                </div>
                <span className="text-white font-bold">1,248</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Code className="text-orange-500" size={18} />
                  <span className="text-gray-400 font-mono text-sm">Submissions</span>
                </div>
                <span className="text-white font-bold">5,672</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BarChart2 className="text-purple-500" size={18} />
                  <span className="text-gray-400 font-mono text-sm">Accuracy</span>
                </div>
                <span className="text-white font-bold">92.5%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Star className="text-yellow-400" size={18} />
                  <span className="text-gray-400 font-mono text-sm">Streak</span>
                </div>
                <span className="text-white font-bold">120 days</span>
              </div>
            </div>
            
            {/* Code Preview */}
            <div className="mt-8 bg-black/70 border border-gray-800 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-500">
                <span className="text-blue-300">def</span> <span className="text-yellow-400">solve_problem</span>():
              </div>
              <div className="text-gray-300 ml-4">
                <span className="text-blue-300">return</span> <span className="text-green-400">"Success"</span>
              </div>
              <div className="mt-2 text-gray-500">
                <span className="text-yellow-400">#</span> Your next breakthrough starts here
              </div>
            </div>
          </motion.div>

        
          {/* Floating mini panel 1 */}
<motion.div
  initial={{ opacity: 0, y: 50, x: -30 }}
  animate={{ 
    opacity: 1, 
    y: 0, 
    x: -30,
    rotate: [ -3, 3, -3 ], // Gentle oscillation
  }}
  transition={{ 
    duration: 0.8, 
    delay: 0.4,
    rotate: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }}
  className="absolute -bottom-18 -left-10 bg-gray-800/80 border border-gray-700 rounded-lg p-4 w-40 shadow-lg z-0"
>
  <div className="flex items-center space-x-2">
    <Zap className="text-yellow-400" size={14} />
    <span className="text-xs text-gray-300">Active coders</span>
  </div>
  <div className="text-white font-bold text-xl mt-1">24K+</div>
</motion.div>

{/* Floating mini panel 2 */}
<motion.div
  initial={{ opacity: 0, y: 50, x: 30 }}
  animate={{ 
    opacity: 1, 
    y: 0, 
    x: 30,
    rotateY: [0, 15, 0], // 3D-like rotation
  }}
  transition={{ 
    duration: 0.8, 
    delay: 0.6,
    rotateY: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }}
  className="absolute -top-18 -right-8 bg-gray-800/80 border border-gray-700 rounded-lg p-4 w-30 shadow-lg z-0"
>
  <div className="flex items-center space-x-2">
    <Cpu className="text-red-400/80" size={14} />
    <span className="text-xs text-gray-300">AI Solutions</span>
  </div>
  <div className="text-white font-bold text-xl mt-1">1.2M+</div>
</motion.div>
        </div>
      </div>
    </div>
  );
}