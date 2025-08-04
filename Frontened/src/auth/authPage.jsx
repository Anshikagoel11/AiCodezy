import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Ui/logo';

const SignupSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^(?=.*[A-Za-z])[A-Za-z0-9_]+$/, "Must contain letters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Requires uppercase letter")
    .regex(/[a-z]/, "Requires lowercase letter")
    .regex(/\d/, "Requires number")
    .regex(/[!@#$%^&*]/, "Requires special character")
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isLogin ? LoginSchema : SignupSchema)
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  const onSubmit = (data) => {
    console.log(isLogin ? "Login Data" : "Signup Data", data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#111111]">
    

      {/* Logo*/}
      <div className="mb-4 sm:mb-8 w-full max-w-xs px-4">
        <Logo/>
      </div>

     
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 z-10">
      
        {/* Auth toggle */}
        <div className="flex flex-col sm:flex-row border-b border-gray-700/50">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 sm:py-4 font-medium transition-colors duration-300 ${
              isLogin 
                ? 'text-blue-400 bg-[#1e1e1e]/50' 
                : 'text-gray-400 hover:text-white bg-[#0f0f0f]/30'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 sm:py-4 font-medium transition-colors duration-300 ${
              !isLogin 
                ? 'text-blue-400 bg-[#1e1e1e]/50' 
                : 'text-gray-400 hover:text-white bg-[#0f0f0f]/30'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-blue-400/90 mb-1 sm:mb-2">Username</label>
                    <input
                      {...register('username')}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm sm:text-base"
                      placeholder="username"
                    />
                    {errors.username && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.username.message?.toString()}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-blue-400/90 mb-1 sm:mb-2">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm sm:text-base"
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email.message?.toString()}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-400/90 mb-1 sm:mb-2">Password</label>
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-[#1a1a1a]/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm sm:text-base"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <div className="mt-1 text-xs sm:text-sm text-red-500 space-y-1">
                      {errors.password.message?.toString().split('\n').map((line, i) => (
                        <p key={i} className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <a href="#" className="text-xs sm:text-sm text-blue-400 hover:text-blue-300">
                      Forgot password?
                    </a>
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-lg relative overflow-hidden group text-sm sm:text-base"
                >
                  <span className="relative z-10">{isLogin ? "Sign In" : "Sign Up"}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-700 to-blue-900 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </form>

              <div className="mt-4 sm:mt-6 text-center border-t border-gray-700/50 pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm text-gray-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button 
                    onClick={toggleAuthMode}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}