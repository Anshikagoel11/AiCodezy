import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../Ui/logo";
import SignUp from "./SignUp";
import SignIn from "./signIn";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#0f0f0f]/100">
     
      {/* Logo */}
      <motion.div 
        className="mb-4 sm:mb-8 w-full max-w-xs px-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo className="w-full h-auto" />
      </motion.div>

      {/* Auth container */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 z-10 shadow-xl">
        {/* Auth toggle */}
        <div className="flex flex-col sm:flex-row border-b border-gray-700/50">
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
        </div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "signup" : "signin"}
            initial={{ opacity: 0, x: isLogin ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? -20 : 20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 md:p-8"
          >
            {isLogin ? <SignUp /> : <SignIn />}
            
            {/* Bottom options*/}
            <div className="mt-4 sm:mt-6 text-center border-t border-gray-700/50 pt-4 sm:pt-6">
              <p className="text-xs sm:text-sm text-gray-400">
                {isLogin ? "Already have an account?" : "Don't have an account?"}{' '}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}