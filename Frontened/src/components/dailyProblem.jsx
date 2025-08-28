import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DailyProblem() {
    const { dailyProblem } = useSelector((state) => state.dailyProblem);
    const problemId = dailyProblem?._id;

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
        >
            <div className="relative bg-gray-700/20 backdrop-blur-lg border border-gray-700 rounded-xl p-4 shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-transparent blur-xl"></div>
                <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600/20 to-transparent blur-xl"></div>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-2 relative z-10">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                        Daily Challenge
                    </h2>
                    <div className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700/50 text-gray-300">
                        New
                    </div>
                </div>
                
                {/* Problem title */}
                <motion.h3 
                    whileHover={{ scale: 1.02 }}
                    className="text-lg font-semibold text-white mb-2 cursor-default relative z-10 line-clamp-2"
                >
                    {dailyProblem?.title}
                </motion.h3>
                
                {/* Tags and difficulty */}
                <div className="flex flex-wrap gap-2 mb-3 relative z-10">
                    {dailyProblem?.tags?.slice(0, 2).map((tag) => (
                        <span 
                            key={tag}
                            className="px-2 py-1 text-xs rounded-md bg-gray-700/50 text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {dailyProblem?.tags?.length > 2 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-gray-700/50 text-gray-300">
                            +{dailyProblem.tags.length - 2} more
                        </span>
                    )}
                </div>
                
                <div className="flex justify-between items-center relative z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        dailyProblem?.difficultyLevel === 'easy' 
                            ? 'bg-green-900/50 text-green-400' 
                            : dailyProblem?.difficultyLevel === 'medium' 
                                ? 'bg-yellow-900/50 text-yellow-400' 
                                : 'bg-red-900/50 text-red-400'
                    }`}>
                        {dailyProblem?.difficultyLevel}
                    </span>
                    
                    <Link to={`/problem/${problemId}`}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium rounded-lg text-sm shadow-lg hover:shadow-amber-500/30 transition-all"
                        >
                            Solve Now →
                        </motion.button>
                    </Link>
                </div>
                
                {/* Animated border */}
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                />
            </div>
        </motion.div>
    );
}