import { useSelector } from "react-redux"
import { useState } from "react";

export default function TestCases(){
const [activeTestCase, setActiveTestCase] = useState(0);
    const {problem} = useSelector((state)=>state.problem)

    return(
         <>
              <div className="flex border-b border-gray-800">
                {problem?.visibleTestCases?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestCase(index)}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTestCase === index
                        ? "text-white"
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
                  <div className="bg-gray-600/30 p-3 rounded-lg font-mono text-sm text-gray-200">
                    {problem?.visibleTestCases?.[activeTestCase]?.input || ""}
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Expected Output</h4>
                  <div className="bg-gray-600/30 p-3 rounded-lg font-mono text-sm text-gray-200">
                    {problem?.visibleTestCases?.[activeTestCase]?.output || ""}
                  </div>
                </div>
              </div>
            </>
    )
}