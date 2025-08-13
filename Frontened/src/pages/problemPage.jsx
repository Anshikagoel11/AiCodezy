import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Description from "../components/description";
import Editorial from "../components/editorial";
import Submissions from "./submissions";
import Solutions from "./solutions";
import LoadingDots from "../Ui/loadingdots";
import { fetchProblem } from "../redux/problemSlicer";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "../components/codeEditor";

import {
  BookOpenIcon,
  PencilIcon,
  LightBulbIcon,
  ClockIcon,
  CodeBracketIcon,
  PlayIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";

export default function ProblemPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Description");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.problem);

  useEffect(() => {
    dispatch(fetchProblem(id));
  }, [id]);

  const tabs = [
    { name: "Description", icon: BookOpenIcon },
    { name: "Editorial", icon: PencilIcon },
    { name: "Solutions", icon: LightBulbIcon },
    { name: "Submissions", icon: ClockIcon }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingDots size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Problem Details Section */}
      <div className="w-1/2 flex flex-col border-r border-gray-700 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex bg-gray-800 border-b border-gray-700 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-5 py-3 text-base font-medium relative flex items-center space-x-2
                  ${activeTab === tab.name ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <Icon className={`h-5 w-5 ${activeTab === tab.name ? 'text-emerald-400' : 'text-gray-400'}`} />
                <span>{tab.name}</span>
                {activeTab === tab.name && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                    layoutId="underline"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'Description' && <Description />}
              {activeTab === 'Editorial' && <Editorial />}
              {activeTab === 'Solutions' && <Solutions />}
              {activeTab === 'Submissions' && <Submissions />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Editor Section */}
      <div className="w-1/2 flex flex-col bg-gray-800 border-l border-gray-700">
        <div className="bg-gray-900 p-4 border-b border-gray-700 flex items-center space-x-3">
          <CodeBracketIcon className="h-6 w-6 text-emerald-400" />
          <h2 className="text-emerald-400 font-mono font-semibold text-lg">Code Editor</h2>
        </div>
        
        {/* Editor Placeholder */}
        <div className="flex-1 bg-gray-900 p-4 overflow-auto">
          <div className="h-full border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center p-6">
              <CodeEditor/>
            </div>
          </div>
        </div>
        
        {/* Run/Submit Buttons */}
        <div className="bg-gray-800 p-4 border-t border-gray-700 flex space-x-4 justify-end">
          <button className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2">
            <PlayIcon className="h-4 w-4" />
            <span>Run Code</span>
          </button>
          <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-emerald-600/20 flex items-center space-x-2">
            <PaperAirplaneIcon className="h-4 w-4" />
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}