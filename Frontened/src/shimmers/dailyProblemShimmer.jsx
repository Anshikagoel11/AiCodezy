import { motion } from "framer-motion";

export default function DailyProblemShimmer() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-6 right-6 z-20 w-80"
        >
            <div className="relative bg-gray-700/20 mb-10 backdrop-blur-lg border border-gray-700 rounded-xl p-4 shadow-2xl overflow-hidden">
                {/* Animated shimmer background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                </div>
                
                {/* Decorative elements (shimmer version) */}
                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gray-600/20 blur-xl"></div>
                <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gray-600/20 blur-xl"></div>
                
                {/* Content skeleton */}
                <div className="relative z-10 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="h-6 w-32 rounded-md bg-gray-600/50"></div>
                        <div className="h-6 w-10 rounded-full bg-gray-600/50"></div>
                    </div>
                    
                    {/* Problem title */}
                    <div className="h-5 w-full rounded-md bg-gray-600/50"></div>
                    <div className="h-5 w-3/4 rounded-md bg-gray-600/50"></div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-16 rounded-md bg-gray-600/50"></div>
                        <div className="h-6 w-12 rounded-md bg-gray-600/50"></div>
                        <div className="h-6 w-14 rounded-md bg-gray-600/50"></div>
                    </div>
                    
                    {/* Difficulty and button */}
                    <div className="flex justify-between items-center">
                        <div className="h-6 w-16 rounded-full bg-gray-600/50"></div>
                        <div className="h-10 w-24 rounded-lg bg-gray-600/50"></div>
                    </div>
                </div>
            </div>
            
            {/* Add this to your globals.css */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </motion.div>
    );
}