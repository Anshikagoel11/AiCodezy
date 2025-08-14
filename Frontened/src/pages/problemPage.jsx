import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Description from "../components/description";
import Editorial from "../components/editorial";
import Submissions from "./submissions";
import Solutions from "./solutions";
import LoadingDots from "../Ui/loadingdots";
import { fetchProblem } from "../redux/problemSlicer";
import { submitProblem as submitProblemAction } from "../redux/submitSlicer";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "../components/codeEditor";

import {
  BookOpenIcon,
  PencilIcon,
  LightBulbIcon,
  ClockIcon,
  CodeBracketIcon,
  PlayIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function ProblemPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Description");
  const [activeTestCase, setActiveTestCase] = useState(0);
  const dispatch = useDispatch();
  const { loading : problemLoading, problem } = useSelector((state) => state.problem);
  const editorRef = useRef();
  const [language, setLanguage] = useState("cpp");
const {loading : submitLoading} = useSelector((state)=>state.submit)

  const handleSubmitProblem = () => {
    const submitCode = {
      code: editorRef.current.getValue(),
      language: language,
    };
    dispatch(submitProblemAction({submitCode, id}));
  };

  useEffect(() => {
    dispatch(fetchProblem(id));
  }, [id]);

  const tabs = [
    { name: "Description", icon: BookOpenIcon },
    { name: "Editorial", icon: PencilIcon },
    { name: "Solutions", icon: LightBulbIcon },
    { name: "Submissions", icon: ClockIcon },
  ];

  if (problemLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
        <LoadingDots size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-gray-100 overflow-hidden">
      {/* Problem Details Section */}
      <div className="w-1/2 flex flex-col border-r border-gray-800 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex bg-gray-900 border-b border-gray-800 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-5 py-3 text-base font-medium relative flex items-center space-x-2
                  ${
                    activeTab === tab.name
                      ? "text-emerald-400"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    activeTab === tab.name
                      ? "text-emerald-400"
                      : "text-gray-400"
                  }`}
                />
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
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900 p-6 bg-[#0f0f0f]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === "Description" && <Description />}
              {activeTab === "Editorial" && <Editorial />}
              {activeTab === "Solutions" && <Solutions />}
              {activeTab === "Submissions" && <Submissions />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Editor Section */}
      <div className="w-1/2 flex flex-col bg-gray-900 border-l border-gray-800">
        <div className="bg-[#0f0f0f] p-4 border-b border-gray-800 flex items-center space-x-3">
          <CodeBracketIcon className="h-6 w-6 text-emerald-400" />
          <h2 className="text-emerald-400 font-mono font-semibold text-lg">
            Code Editor
          </h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-white"
          >
            <option value="cpp" className="text-black">
              C++
            </option>
            <option value="c" className="text-black">
              C
            </option>
            <option value="java" className="text-black">
              Java
            </option>
            <option value="javascript" className="text-black">
              JavaScript
            </option>
            <option value="rust" className="text-black">
              Rust
            </option>
          </select>
        </div>

        {/* Editor Component */}
        <div className="h-[40%] bg-[#0f0f0f] overflow-hidden border-b border-gray-800">
          <CodeEditor ref={editorRef} language={language} />
        </div>

        {/* Run/Submit Buttons */}
        <div className="p-4 border-t border-gray-800 flex space-x-4 justify-end">
          <button
            onClick={() => console.log(editorRef.current.getValue())}
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
          >
            <PlayIcon className="h-4 w-4" />
            <span>Run Code</span>
          </button>
          <button
            onClick={handleSubmitProblem}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-emerald-600/20 flex items-center space-x-2"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            <span>Submit</span>
          </button>
        </div>

        {/* Test Cases */}
        <div className="flex-1 flex flex-col bg-[#0f0f0f] overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-gray-300 font-medium flex items-center">
              <ChevronDownIcon className="h-5 w-5 mr-2 text-emerald-400" />
              Test Cases
            </h3>
          </div>

          <div className="flex border-b border-gray-800">
            {problem?.visibleTestCases?.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestCase(index)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTestCase === index
                    ? "text-emerald-400 border-b-2 border-emerald-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Case {index + 1}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <h4 className="text-gray-400 text-sm mb-1">Input</h4>
              <div className="bg-gray-800 p-3 rounded-lg font-mono text-sm text-gray-200">
               
                {problem?.visibleTestCases?.[activeTestCase]?.input || ""}
              </div>
            </div>

            <div>
              <h4 className="text-gray-400 text-sm mb-1">Output</h4>
              <div className="bg-gray-800 p-3 rounded-lg font-mono text-sm text-gray-200">
                
                {problem?.visibleTestCases?.[activeTestCase]?.output || ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
