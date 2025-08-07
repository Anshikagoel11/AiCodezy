import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../Ui/logo";
import SignUp from "./signUp";
import SignIn from "./signIn";
import FloatingBackground from "../Ui/floatingBg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  // const [showParticles, setShowParticles] = useState(false);

  // const handleTap = (e) => {
  //   setShowParticles(true);
  //   setTimeout(() => setShowParticles(false), 1000);
    
  // };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#0f0f0f]/100" 
      // onTouchStart={handleTap} 
      // onClick={handleTap}
    >
      {/* Particle Burst Effect */}
      {/* {showParticles && <ParticleBurst />} */}
      

      {/* Floating Background Elements */}
      <FloatingBackground/>

      {/* Logo */}
      <motion.div 
        className="mb-4 sm:mb-8 w-full max-w-xs px-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <Logo className="w-full h-auto" />
      </motion.div>

      {/* Auth container */}
      <motion.div 
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-600/60 z-10 shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Auth toggle */}
        <div className="flex flex-col sm:flex-row border-b border-gray-700/50 relative">
          
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
            initial={false}
            animate={{
              width: "50%",
              x: isLogin ? "0%" : "50%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 sm:py-4 font-medium transition-colors duration-300 ${
              isLogin
                ? 'text-blue-400 bg-[#1e1e1e]/50'
                : 'text-gray-400 hover:text-white bg-[#0f0f0f]/30'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 sm:py-4 font-medium transition-colors duration-300 ${
              !isLogin
                ? 'text-blue-400 bg-[#1e1e1e]/50'
                : 'text-gray-400 hover:text-white bg-[#0f0f0f]/30'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "signup" : "signin"}
            initial={{ opacity: 0, x: isLogin ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? -50 : 50 }}
            transition={{ 
              duration: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="p-4 sm:p-6 md:p-8"
          >
            {isLogin ? <SignUp /> : <SignIn />}
            
            {/* Bottom options*/}
            <motion.div 
              className="mt-4 sm:mt-6 text-center border-t border-gray-700/50 pt-4 sm:pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs sm:text-sm text-gray-400">
                {isLogin ? "Already have an account?" : "Don't have an account?"}{' '}
                <motion.button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </motion.button>
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}