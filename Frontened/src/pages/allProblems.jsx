import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProblemsShimmer from "../shimmers/problemsshimmer";
import { fetchSolvedProblems } from "../redux/problemSolvedslicer";
import {CheckSquare } from 'lucide-react';
import {
  ChevronRight,
  Filter,
  Search,
  HardDrive,
  AlertCircle,
  Tag,
} from "react-feather";
import { Link } from "react-router-dom";



export default function AllProblems() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const { solvedproblems } = useSelector((state) => state.solvedProblems);

  const algorithmCategories = [
    { name: "All", value: "all" },
    { name: "Array", value: "array" },
    { name: "Sorting", value: "sorting" },
    { name: "basic", value: "basic" },
    { name: "HashMap", value: "hashmap" },
    { name: "Tree", value: "tree" },
    { name: "Searching", value: "searching" },
    { name: "Binary Search", value: "binary search" },
    { name: "Sliding Window", value: "sliding window" },
    { name: "Math", value: "math" },
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
    if (isAuthenticated) {
      dispatch(fetchSolvedProblems());
    }
  }, []);

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "all" ||
      problem.difficultyLevel?.toLowerCase() === selectedDifficulty;

    const matchesCategory =
      selectedCategories.length === 0 ||
      problem.tags
        ?.map((tag) => tag.toLowerCase())
        .some((tag) => selectedCategories.includes(tag));

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const difficultyColors = {
    easy: "bg-emerald-500/10 text-emerald-400 border-emerald-400/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-400/20",
    hard: "bg-rose-500/10 text-rose-400 border-rose-400/20",
  };

  const isSolved = (problemId) => {
    return solvedproblems?.includes(problemId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-[#0f0f0f]">
        <ProblemsShimmer />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 relative overflow-hidden">
      {/* Background Animation - Match Home Page */}
      <motion.div
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-10 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-xl"
      />
      <motion.div
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-600/10 to-transparent blur-xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Match Home Page Style */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
            <span className="text-sm font-mono text-amber-300">
              PROBLEM SET
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Challenge{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">
              Yourself
            </span>
          </h1>
        </motion.div>

        {/* Search and Filter - Updated Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" backdrop-blur-sm rounded-xl p-4 mb-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-500" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search problems or tags..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/20 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" size={17} />
              <select
                className="bg-gray-400/20 border border-gray-700 rounded-lg px-3 py-2 text-black text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
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

        {/* Categories - Updated Colors */}
        <motion.div
          className="mb-6 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-4 pb-2 items-center text-center justify-center">
            {algorithmCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => {
                  if (category.value === "all") {
                    setSelectedCategories([]);
                  } else {
                    setSelectedCategories((prev) => {
                      const value = category.value.toLowerCase();
                      return prev.includes(value)
                        ? prev.filter((c) => c !== value)
                        : [...prev, value];
                    });
                  }
                }}
                className={`px-3 mr-2 py-1 text-sm border transition-all ${
                  category.value === "all" && selectedCategories.length === 0
                    ? "bg-gradient-to-r from-amber-400/10 to-indigo-500/10 text-amber-300 border-amber-400/30"
                    : category.value !== "all" &&
                      selectedCategories.includes(category.value)
                    ? "bg-gradient-to-r from-purple-400/10 to-indigo-500/10 text-purple-300 border-purple-400/30"
                    : "bg-gray-800/20 text-gray-300 border-gray-700 hover:bg-gray-700/30"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => (
              <Link to={`/problem/${problem._id}`} key={index}>
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className="bg-gray-700/20 backdrop-blur-sm border border-gray-700 rounded-xl px-5 py-4 shadow-lg transition-all cursor-pointer hover:border-amber-400/30 m-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                     <div className="flex items-center gap-5">
                       <h3 className="text-lg font-bold text-white mb-1">
                        {problem.title}
                      </h3>
                      {isAuthenticated && isSolved(problem._id) && (
                        <CheckSquare className="h-7 w-7 text-green-500" />
                      )}
                     </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {problem.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-gray-800/50 text-gray-300 border border-gray-700"
                          >
                            <Tag className="mr-1 text-purple-400" size={12} />{" "}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-3 md:mt-0">
                      <div
                        className={`text-xs font-mono px-3 py-1.5 rounded border ${
                          difficultyColors[
                            problem.difficultyLevel?.toLowerCase()
                          ]
                        }`}
                      >
                        {problem.difficultyLevel
                          ? problem.difficultyLevel.charAt(0).toUpperCase() +
                            problem.difficultyLevel.slice(1)
                          : "Unknown"}
                      </div>
                      <div className="p-1 hover:bg-gray-700/30  transition-all">
                        <ChevronRight className="text-amber-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center"
            >
              <AlertCircle className="mx-auto text-amber-400" size={48} />
              <h3 className="text-xl font-bold text-white mt-4">
                No problems found
              </h3>
              <p className="text-gray-400 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Panel - Updated Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-amber-400/10 to-indigo-500/10 border border-gray-700 rounded-xl p-4 mt-8 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-r from-amber-400/10 to-indigo-500/10 rounded-lg border border-gray-700">
              <HardDrive className="text-amber-400" size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-400">Total Problems</div>
              <div className="text-xl font-bold text-white">
                {problems.length}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
