import { motion } from "framer-motion";
import { Filter, Search } from "react-feather";

export default function ProblemsShimmer() {
  return (
    <div className="fixed inset-0 bg-[#0f0f0f] overflow-y-auto z-50">
      {/* Background Animation - Exact match */}
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

      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {/* Header - Exact color match */}
        <div className="mb-6 text-center md:text-left">
          <div className="h-4 w-32 bg-gray-700/20 rounded-full mb-4 mx-auto md:mx-0 shimmer"></div>
          <div className="h-10 bg-gray-700/20 rounded-lg mb-2 mx-auto md:mx-0 shimmer"></div>
          <div className="h-6 bg-gray-700/20 rounded-lg mx-auto md:mx-0 shimmer"></div>
        </div>

        {/* Search and Filter - Exact match */}
        <div className="bg-gray-700/20 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="text-gray-500" size={18} />
              </div>
              <div className="w-full pl-10 pr-4 py-2 bg-gray-700/20 rounded-lg shimmer h-10"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={17} />
              <div className="bg-gray-700/20 rounded-lg px-3 py-2 h-10 shimmer"></div>
            </div>
          </div>
        </div>

        {/* Categories - Exact match */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-8 bg-gray-700/20 rounded-full shimmer"
              ></div>
            ))}
          </div>
        </div>

        {/* Problems List - Exact match */}
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-700/20 border border-gray-700 rounded-xl p-5 shadow-lg m-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="h-6 w-3/4 bg-gray-700/20 rounded-lg mb-4 shimmer"></div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-6 w-16 bg-gray-700/20 rounded-full shimmer"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-3 md:mt-0">
                  <div className="h-8 w-16 bg-gray-700/20 rounded-full shimmer"></div>
                  <div className="h-6 w-6 bg-gray-700/20 rounded-full shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>

      {/* Shimmer animation - Unchanged */}
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
}