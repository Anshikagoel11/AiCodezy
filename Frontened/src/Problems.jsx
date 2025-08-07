import { useEffect, useState } from "react";
import axiosClient from "./utils/axiosClient";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Filter,
  Search,
  HardDrive,
  AlertCircle,
  Tag,
} from "react-feather";
import LoadingDots from "./Ui/loadingdots";

export default function AllProblems() {
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const algorithmCategories = [
    { name: "All", value: "all" },
    { name: "Array", value: "Array" },
    { name: "Sorting", value: "sorting" },
    { name: "Stack", value: "stack" },
    { name: "HashMap", value: "hashmap" },
    { name: "Tree", value: "tree" },
    { name: "Searching", value: "searching" },
    { name: "Binary Search", value: "binary search" },
    { name: "Sliding Window", value: "sliding window" },
  ];

  async function fetchAllProblems() {
    try {
      const data = await axiosClient.get("problem/getAllProblem");
      setProblems(data?.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching problems:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllProblems();
  }, [user]);

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDifficulty =
      selectedDifficulty === "all" ||
      problem.difficultyLevel?.toLowerCase() === selectedDifficulty;

    const matchesCategory =
      selectedCategory === "all" ||
      problem.tags?.some(
        (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
      );

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const difficultyColors = {
    easy: "bg-green-500/10 text-green-400 border-green-400/20",
    medium: "bg-yellow-500/10 text-yellow-400 border-yellow-400/20",
    hard: "bg-red-500/10 text-red-400 border-red-400/20",
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 relative overflow-hidden">
      {/* Background Animation */}
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-2 w-8 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-mono text-blue-400">PROBLEM SET</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Challenge{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
              Yourself
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Solve coding problems and improve your skills. Filter by difficulty
            or search for specific challenges.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-600/5 backdrop-blur-sm border border-gray-700 rounded-xl p-4 mb-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search problems or tags..."
                className="w-full pl-10 pr-4 py-1 bg-gray-700/2 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={17} />
              <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm focus:ring-2 focus:ring-blue-500/50"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-6 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-2 pb-2">
            {algorithmCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 mr-2  py-1 text-sm rounded border transition-all ${
                  selectedCategory === category.value
                    ? "bg-blue-500/10 text-blue-400 border-blue-400/30"
                    : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Problems List */}
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <LoadingDots />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className="bg-gray-400/5 border border-gray-700 rounded-lg px-4 py-3 shadow-lg transition-all cursor-pointer hover:border-blue-400/30"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">
                        {problem.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-gray-900 text-gray-300 border border-gray-600"
                          >
                            <Tag className="mr-1 text-purple-400" size={12} />{" "}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-3 md:mt-0">
                      <div
                        className={`text-xs font-mono px-3 py-1 rounded-full border ${
                          difficultyColors[problem.difficultyLevel?.toLowerCase()]
                        }`}
                      >
                        {problem.difficultyLevel
                          ? problem.difficultyLevel.charAt(0).toUpperCase() +
                            problem.difficultyLevel.slice(1)
                          : "Unknown"}
                      </div>
                      <button className="p-1 hover:bg-gray-700/30 rounded transition-all">
                        <ChevronRight className="text-orange-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-400/5 border border-gray-700 rounded-xl p-8 text-center"
              >
                <AlertCircle className="mx-auto text-yellow-400" size={48} />
                <h3 className="text-xl font-bold text-white mt-4">
                  No problems found
                </h3>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-400/5 border border-gray-700 rounded-xl p-4 mt-8 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-400/10 rounded-lg">
              <HardDrive className="text-blue-400" size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-400">Total Problems</div>
              <div className="text-xl font-bold text-white">{problems.length}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
