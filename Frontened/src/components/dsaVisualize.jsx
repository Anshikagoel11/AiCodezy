import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const algorithms = [
  {
    id: 1,
    title: "Bubble Sort",
    category: "sorting",
    color: "from-amber-400/20 to-orange-500/20",
    borderColor: "border-amber-400/30",
    array: [45, 23, 78, 12, 56, 67],
  },
  {
    id: 2,
    title: "Binary Search",
    category: "searching",
    color: "from-indigo-400/20 to-purple-500/20",
    borderColor: "border-indigo-400/30",
    array: [10, 20, 30,100,220],
    target: 70,
  },
  {
    id: 3,
    title: "Stack",
    category: "structures",
    color: "from-emerald-400/20 to-green-500/20",
    borderColor: "border-emerald-400/30",
    elements: [45, 32, 12],
  },
  {
    id: 4,
    title: "Queue",
    category: "structures",
    color: "from-cyan-400/20 to-blue-500/20",
    borderColor: "border-cyan-400/30",
    elements: [15, 28, 59],
  },
];

export default function AlgorithmVisualizationGrid({sectionRef}) {
  const [algoData, setAlgoData] = useState(
    algorithms.map(() => ({data: null }))
  );

  // Initialize animation data
  useEffect(() => {
    const initialStates = algorithms.map((algo) => {
      if (algo.category === "sorting") {
        return { data: [...algo.array] };
      } else if (algo.category === "searching") {
        return { data: { low: 0, high: algo.array.length - 1, mid: -1 } };
      } else if (algo.category === "structures") {
        return { data: [...algo.elements] };
      }
      return { data: null };
    });
    setAlgoData(initialStates);
  }, []);

  const renderAlgorithm = (algo, index) => {
    const state = algoData[index];
    
    if (algo.category === "sorting") {
      return (
        <div className="h-16 flex items-end justify-center gap-0.5">
          {state?.data?.map((value, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${value / 2}px` }}
              transition={{ duration: 0.3 }}
              className="w-3 bg-gradient-to-b from-amber-400 to-orange-500 rounded-t-sm"
              style={{ height: `${value / 2}px` }}
            />
          ))}
        </div>
      );
    } else if (algo.category === "searching") {
      return (
        <div className="h-16 flex items-center justify-center gap-1 relative">
          {algo.array.map((value, i) => {
            let bgColor = "bg-gray-700";
            if (state?.data) {
              if (i >= state.data.low && i <= state.data.high) {
                bgColor = "bg-indigo-500/30";
              }
              if (i === state.data.mid) {
                bgColor = "bg-indigo-500";
              }
              if (value === algo.target && i === state.data.mid) {
                bgColor = "bg-green-500";
              }
            }
            
            return (
              <div
                key={i}
                className={`w-6 h-6 flex items-center justify-center text-xs rounded ${bgColor} text-white transition-colors duration-300`}
              >
                {value}
              </div>
            );
          })}
        </div>
      );
    } else if (algo.category === "structures") {
      return (
        <div className="h-16 flex flex-col-reverse items-center justify-end gap-0.5">
          {state?.data?.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-20 py-1 text-center text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-sm"
            >
              {item}
            </motion.div>
          ))}
        </div>
      );
    }
  };

  return (
    <section className="py-12 px-4 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background elements matching your theme */}
      <motion.div 
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        ref={sectionRef}
        className="absolute top-10 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-xl"
      />
      
      <motion.div 
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600/10 to-transparent blur-xl"
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-indigo-500">Visualizations</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            See how different algorithms work through interactive visualizations
          </p>
        </motion.div>

        <div className="mb-6 flex justify-center">
      
            <motion.button  onClick={() => window.location.href = 'https://sortify-dsa.vercel.app/'} 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
            >
              Start Visualizations
            </motion.button>
         
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {algorithms.map((algo, index) => (
            <motion.div
              key={algo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl p-4 border ${algo.borderColor} ${algo.color} backdrop-blur-sm`}
            >
              <h3 className="text-white font-medium mb-3 text-center">
                {algo.title}
              </h3>
              
              {renderAlgorithm(algo, index)}
              
              <div className="mt-3 flex justify-center">
                <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300">
                  {algo.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-center text-xs text-gray-500"
        >
          <p>Click "Start Visualizations" to see the algorithms in action</p>
        </motion.div>
      </div>
    </section>
  );
}