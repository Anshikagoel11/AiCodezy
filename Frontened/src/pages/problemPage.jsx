import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Description from "../components/description";
import Editorial from "../components/editorial";
import Submissions from "../components/submissions";
import Solutions from "../components/solutions";
import Answer from "../components/answer";
import { fetchProblem } from "../redux/problemSlicer";
import { submitProblem as submitProblemAction } from "../redux/submitSlicer";
import { resetRunState, runProblem as runProblemAction } from "../redux/runsSlicer";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "../components/codeEditor";
import AskAi from "../components/askAI";
import { resetSubmitState } from "../redux/submitSlicer";
import toast from "react-hot-toast";
import TestCaseResults from "../components/testCaseResults";
import TestCases from "../components/testCases";
import { ProblemPageShimmer } from "../shimmers/ProblemPageShimmer";
import {
  BookOpenIcon,
  PencilIcon,
  LightBulbIcon,
  ClockIcon,
  CodeBracketIcon,
  PlayIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";
import { Bot } from "lucide-react";

export default function ProblemPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Description");
  const [activeTestCaseTab, setActiveTestCaseTab] = useState("Test Cases");
  const [isMobileEditorOpen, setIsMobileEditorOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading: problemLoading } = useSelector((state) => state.problem);
  const { loading: submitLoading, waiting: submitWaiting } = useSelector((state) => state.submit);
  const { loading: runLoading, waiting: runWaiting } = useSelector((state) => state.run);
  const editorRef = useRef();
  const [language, setLanguage] = useState("java");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const bgColor = "bg-[#0f0f0f]";
  const secondaryBg = "bg-[#0f0f0f]";
  const accentColor = "text-[#EA763F]";
  const accentBorder = "border-amber-400";
  const buttonGradient = "bg-gradient-to-r from-orange-400 to-orange-500";
  const hoverGradient = "hover:from-amber-500 hover:to-orange-600";


  const borderColor = "border-[#2d3748]";
  const textColor = "text-gray-100";

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRunCode = () => {
    const code = editorRef.current?.getValue();

    const runCode = {
      code: code,
      language: language.toLocaleLowerCase(),
    };

    dispatch(runProblemAction({ runCode, id }));
  };

  const handleSubmitProblem = () => {
    if (!isAuthenticated) {
      toast.error("You need to sign in/sign up to submit your code");
      return;
    }

    const code = editorRef.current?.getValue();
    if (!code || code.trim() === "") {
      toast.error("Please write some code before submitting");
      return;
    }

    const submitCode = {
      code: code,
      language: language,
    };
    dispatch(submitProblemAction({ submitCode, id }));
  };

  useEffect(() => {
    dispatch(fetchProblem(id));
    dispatch(resetSubmitState());
    dispatch(resetRunState());
  }, [id]);

  useEffect(() => {
    if (!submitWaiting) setActiveTab("Answer");
  }, [submitWaiting]);

  useEffect(() => {
    if (!runWaiting) setActiveTestCaseTab("Test Results");
  }, [runWaiting]);

  useEffect(() => {
    setActiveTab("Description");
    setActiveTestCaseTab("Test Cases");
  }, [id]);

  const tabs = [
    { name: "Description", icon: BookOpenIcon },
    { name: "Submissions", icon: ClockIcon },
    { name: "Answer", icon: DocumentTextIcon },
    { name: "AskAi", icon: Bot }
  ];

  if (problemLoading) {
    return (
      <div className={`${bgColor}`}>
       <ProblemPageShimmer/>
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen ${bgColor} ${textColor} overflow-hidden`}>
      {/* Left Panel - Problem Content */}
      <div className={`w-full lg:w-1/2 flex flex-col border-b lg:border-r ${borderColor} overflow-hidden ${secondaryBg}`}>
        {/* Tab Navigation */}
        <div className={`flex ${secondaryBg} px-2 border-b ${borderColor} overflow-x-auto scrollbar-hide`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-2 py-3 lg:px-3 lg:py-3 text-xs relative flex items-center whitespace-nowrap
                  ${
                    activeTab === tab.name
                      ? `${accentColor}`
                      : `text-gray-400 hover:text-gray-200`
                  }`}
              >
                <Icon
                  className={`h-4 w-4 lg:h-5 lg:w-5 mr-1 ${
                    activeTab === tab.name
                      ? `${accentColor}`
                      : `text-gray-400`
                  }`}
                />
                <span className="hidden sm:inline">{tab.name}</span>
                {activeTab === tab.name && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${buttonGradient}`}
                    layoutId="underline"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2d3748] scrollbar-track-[#1a1a1a] p-4 lg:p-6 ${secondaryBg}`}>
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
              {activeTab === "Submissions" && <Submissions />}
              {activeTab === "Answer" && <Answer />}
              {activeTab === "AskAi" && <AskAi />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Editor Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileEditorOpen(!isMobileEditorOpen)}
          className={`lg:hidden flex items-center justify-between w-full p-4 ${bgColor} border-b ${borderColor}`}
        >
          <div className="flex items-center">
            <CodeBracketIcon className="h-5 w-5 mr-2 text-amber-400" />
            <span className="font-medium">Code Editor</span>
          </div>
          {isMobileEditorOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      )}

      {/* Right Panel - Code Editor (visible on desktop, conditionally on mobile) */}
      <div className={`w-full lg:w-1/2 flex flex-col ${secondaryBg} ${isMobile && !isMobileEditorOpen ? 'hidden' : 'flex'} ${isMobile ? 'h-[70vh]' : ''}`}>
        {/* Editor Header */}
        <div className={`p-3 lg:p-4 border-b ${borderColor} flex items-center justify-between ${bgColor}`}>
          <div className="flex items-center space-x-3">
            <CodeBracketIcon className={`h-5 w-5 lg:h-6 lg:w-6 ${accentColor}`} />
            <h2 className={`font-mono font-semibold text-base lg:text-xl`}>
              Code Editor
            </h2>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value.toLowerCase())}
            className={`bg-[#1a1a1a] border ${borderColor} text-gray-200 rounded px-2 py-1 text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent`}
          >
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        {/* Code Editor Area */}
        <div className={`flex-1 lg:h-[40%] overflow-hidden border-2 border-gray-700 m-1`}>
          <CodeEditor ref={editorRef} language={language} />
        </div>

        {/* Action Buttons */}
        <div className={`p-3 lg:p-4 flex flex-col sm:flex-row gap-2 lg:gap-3 justify-end ${bgColor} border-t ${borderColor}`}>
          <motion.button
            onClick={handleRunCode}
            disabled={runLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 lg:px-5 lg:py-2.5 bg-[#1e293b] hover:bg-[#2d3748] text-gray-200 rounded-lg text-xs lg:text-sm font-medium transition-all flex items-center justify-center space-x-2 disabled:opacity-70 border border-[#4a5568] hover:border-amber-400 shadow`}
          >
            <PlayIcon className="h-4 w-4" />
            <span>{runLoading ? 'Running...' : 'Run Code'}</span>
          </motion.button>
          <motion.button
            onClick={handleSubmitProblem}
            disabled={submitLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 lg:px-5 lg:py-2.5 ${buttonGradient} ${hoverGradient} text-white rounded-lg text-xs lg:text-sm font-bold transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70`}
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            <span>{submitLoading ? 'Submitting...' : 'Submit'}</span>
          </motion.button>
        </div>

        {/* Test Cases Section */}
        <div className={`flex-1 flex flex-col bg-[#0f0f0f] overflow-hidden`}>
          {/* Test Case Tabs */}
          <div className={`flex border-b ${borderColor} bg-[#1a1a1a]`}>
            <button
              onClick={() => setActiveTestCaseTab("Test Cases")}
              className={`px-3 py-2 lg:px-6 lg:py-3 text-xs lg:text-base font-medium ${
                activeTestCaseTab === "Test Cases"
                  ? `${accentColor} border-b-2 ${accentBorder}`
                  : `text-gray-400 hover:text-gray-200`
              }`}
            >
              Test Cases
            </button>
            <button
              onClick={() => setActiveTestCaseTab("Test Results")}
              className={`px-3 py-2 lg:px-6 lg:py-3 text-xs lg:text-base font-medium ${
                activeTestCaseTab === "Test Results"
                  ? `${accentColor} border-b-2 ${accentBorder}`
                  : `text-gray-400 hover:text-gray-200`
              }`}
            >
              Test Results
            </button>
          </div>

          {/* Test Case Content */}
          <div className="flex-1 overflow-auto">
            {activeTestCaseTab === "Test Cases" ? (
              <TestCases />
            ) : (
              <TestCaseResults />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}