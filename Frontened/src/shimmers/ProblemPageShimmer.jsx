import { motion } from "framer-motion";

export const ProblemPageShimmer = () => {
  return (
    <div className="fixed inset-0 bg-[#0f0f0f] overflow-y-auto z-50">
      {/* Background Animation */}
      <motion.div 
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-10 left-20 w-32 h-32 rounded-full bg-gray-700/20 blur-xl"
      />
      <motion.div 
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gray-700/20 blur-xl"
      />

      <div className="max-w-4xl mx-auto p-4 relative z-10 animate-pulse">
        {/* Title Section */}
        <div className="mb-6">
          <div className="h-8 bg-gray-700/20 rounded w-3/4 mb-4 shimmer"></div>
          <div className="h-4 bg-gray-700/20 rounded w-1/2 shimmer"></div>
        </div>
        {/* Code Editor Section */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="h-6 bg-gray-700/20 rounded w-16 mr-4 shimmer"></div>
            <div className="h-6 bg-gray-700/20 rounded w-24 shimmer"></div>
          </div>
          <div className="bg-gray-700/20 rounded-lg h-64 w-full shimmer"></div>
        </div>

        {/* Test Cases Section */}
        <div>
          <div className="h-6 bg-gray-700/20 rounded w-1/4 mb-4 shimmer"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-gray-700 rounded p-4 bg-gray-700/10"
              >
                <div className="h-5 bg-gray-700/20 rounded w-1/6 mb-3 shimmer"></div>
                <div className="h-4 bg-gray-700/20 rounded w-1/3 mb-2 shimmer"></div>
                <div className="h-4 bg-gray-700/20 rounded w-1/4 shimmer"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Shimmer animation */}
      <style jsx>{`
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};