import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Code, Globe, Cpu, Users, ChevronRight} from "react-feather";

const features = [
  {
    id: 1,
    title: "Topic-wise Practice",
    description: "Master specific data structures and algorithms systematically with curated problem sets.",
    icon: <Globe className="text-orange-400" size={20} />,
    difficulty: "Beginner to Advanced",
    color: "from-indigo-500/20 to-purple-600/20",
    borderColor: "border-indigo-500/30",
    ui: "topics"
  },
  {
    id: 2,
    title: "Multi-Language Support",
    description: "Solve problems in your preferred programming language with our extensive language support.",
    icon: <Globe className="text-emerald-400" size={20} />,
    difficulty: "All Levels",
    color: "from-emerald-500/20 to-green-600/20",
    borderColor: "border-emerald-500/30",
    ui: "languages"
  },
  {
    id: 3,
    title: "AI-Powered Solutions",
    description: "Get intelligent hints and explanations with our advanced AI assistance technology.",
     icon: <Globe className="text-blue-400" size={20} />,
    difficulty: "All Levels",
    color: "from-amber-500/20 to-orange-600/20",
    borderColor: "border-amber-500/30",
    ui: "ai"
  },
  {
    id: 4,
    title: "Real-world Projects",
    description: "Apply your skills to practical projects that simulate real development scenarios.",
    icon: <Cpu className="text-purple-400" size={20} />,
    difficulty: "Intermediate to Advanced",
    color: "from-purple-500/20 to-pink-600/20",
    borderColor: "border-purple-500/30",
    ui: "projects"
  }
];

// UI Components for the right side
const TopicsUI = () => {
  const topics = ["Arrays", "Trees", "Dynamic Programming", "Graphs"];
  const [activeTopic, setActiveTopic] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTopic((prev) => (prev + 1) % topics.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-sm"
    >
      <div className="text-white font-medium mb-3">Practice Topics</div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {topics.map((topic, i) => (
          <motion.div
            key={i}
            animate={{ 
              backgroundColor: i === activeTopic ? "rgba(139, 92, 246, 0.2)" : "rgba(30, 30, 30, 0.5)",
              borderColor: i === activeTopic ? "rgba(167, 139, 250, 0.5)" : "rgba(75, 85, 99, 0.5)",
              scale: i === activeTopic ? 1.05 : 1
            }}
            className="border rounded-lg px-3 py-2 text-center cursor-pointer transition-all"
          >
            <span className={i === activeTopic ? "text-purple-300 font-medium" : "text-gray-300"}>{topic}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg text-xs flex items-center transition-colors">
          Start Practice <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

const LanguagesUI = () => {
  const languages = ["Python", "JavaScript", "Java", "C++"];
  const [currentLang, setCurrentLang] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % languages.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-sm"
    >
      <div className="text-white font-medium mb-3">Supported Languages</div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {languages.map((lang, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: i === currentLang ? 1.1 : 1,
              backgroundColor: i === currentLang ? "rgba(16, 185, 129, 0.2)" : "rgba(30, 30, 30, 0.5)",
              borderColor: i === currentLang ? "rgba(110, 231, 183, 0.3)" : "rgba(75, 85, 99, 0.5)"
            }}
            className="px-3 py-2 rounded-lg border text-center transition-all"
          >
            <span className={i === currentLang ? "text-emerald-300 font-medium" : "text-gray-300"}>{lang}</span>
          </motion.div>
        ))}
      </div>
      <div className="text-gray-400 text-xs text-center">+8 more languages supported</div>
    </motion.div>
  );
};

const AIUI = () => {
  const aiFeatures = ["Code Explanation", "Intelligent Hints", "Solution Analysis", "Bug Detection"];
  const [currentFeature, setCurrentFeature] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % aiFeatures.length);
    }, 1800);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-sm"
    >
      <div className="text-white font-medium mb-3">AI-Powered Assistance</div>
      <div className="mb-3">
        {aiFeatures.map((feature, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: i === currentFeature ? 1 : 0.6,
              x: i === currentFeature ? 0 : 10
            }}
            className="py-2 border-b border-gray-700/50 last:border-b-0 transition-all"
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${i === currentFeature ? 'bg-amber-400' : 'bg-gray-600'}`}></div>
              <span className={i === currentFeature ? "text-amber-300" : "text-gray-400"}>{feature}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-lg text-xs flex items-center transition-colors">
          Try AI Assist <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

const ProjectsUI = () => {
  const projects = ["E-commerce API", "Task Manager", "Pathfinding Visualizer"];
  const [currentProject, setCurrentProject] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-sm"
    >
      <div className="text-white font-medium mb-3">Project Challenges</div>
      <div className="mb-3">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: i === currentProject ? 1 : 0.6,
              x: i === currentProject ? 0 : 10
            }}
            className="py-2 border-b border-gray-700/50 last:border-b-0 transition-all"
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${i === currentProject ? 'bg-purple-400' : 'bg-gray-600'}`}></div>
              <span className={i === currentProject ? "text-purple-300" : "text-gray-400"}>{project}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg text-xs flex items-center transition-colors">
          View Projects <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const renderUI = (type) => {
    switch(type) {
      case "topics": return <TopicsUI />;
      case "languages": return <LanguagesUI />;
      case "ai": return <AIUI />;
      case "projects": return <ProjectsUI />;
      default: return <TopicsUI />;
    }
  };

  return (
    <section className="py-16 px-4 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background elements matching Hero component */}
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-sm font-mono text-amber-300 tracking-wider">PLATFORM FEATURES</span>
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-indigo-500">AiCodezy</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Our platform offers intelligent tools and resources to enhance your coding skills with AI-powered assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => setActiveFeature(index)}
                className={`rounded-xl p-5 border cursor-pointer transition-all ${
                  activeFeature === index 
                    ? `bg-gradient-to-r ${feature.color} border-transparent shadow-lg` 
                    : "bg-gray-900/40 border-gray-800/50 hover:border-gray-700"
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    activeFeature === index ? "bg-white/5" : "bg-gray-800/50"
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-3">
                      {feature.description}
                    </p>
                    <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-800/50 text-gray-300">
                      {feature.difficulty}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - UI elements */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="sticky top-24 flex items-center justify-center lg:mt-10"
          >
            <div className="w-full max-w-md">
              {renderUI(features[activeFeature].ui)}
            </div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gradient-to-r from-amber-400/10 to-indigo-500/10 border border-gray-700 rounded-xl p-6 mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-xs text-gray-400">Coding Problems</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12+</div>
              <div className="text-xs text-gray-400">Programming Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-xs text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-xs text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}