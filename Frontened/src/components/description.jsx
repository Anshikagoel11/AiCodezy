import { useSelector } from "react-redux";
import { ClipboardDocumentIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Description() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const { problem, loading, error } = useSelector((state) => state.problem);

  // Color scheme matching the ProblemPage
  const bgColor = "bg-[#1a1a1a]";
  const borderColor = "border-[#2d3748]";
  const textColor = "text-gray-200";

  const difficultyLevelColor = (level) => {
    if (level === 'easy') return 'bg-emerald-500/20 text-emerald-400 border-emerald-400/50';
    if (level === 'medium') return 'bg-amber-500/20 text-amber-400 border-amber-400/50';
    if (level === 'hard') return 'bg-rose-500/20 text-rose-400 border-rose-400/50';
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) return (
    <div className="p-6 space-y-4">
      <div className="animate-pulse h-8 w-3/4 bg-[#2d3748] rounded"></div>
      <div className="animate-pulse h-4 w-full bg-[#2d3748] rounded"></div>
      <div className="animate-pulse h-4 w-5/6 bg-[#2d3748] rounded"></div>
    </div>
  );

  if (error) return (
    <div className="p-6">
      <div className="bg-rose-900/30 border border-rose-700 text-rose-400 p-4 rounded-lg">
        Error loading problem: {error}
      </div>
    </div>
  );

  return (
    <div className={`p-6 space-y-8 ${textColor}`}>
      {/* Problem Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold ">
            {problem?.title}
          </h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${difficultyLevelColor(problem?.difficultyLevel)}`}>
            {problem?.difficultyLevel?.charAt(0).toUpperCase() + problem?.difficultyLevel?.slice(1)}
          </span>
        </div>

        {/* Problem Description */}
        <div className="prose prose-invert max-w-none">
          <div className={`${textColor}/90 leading-relaxed space-y-4`}>
            {problem?.description?.split('\n').map((paragraph, idx) => (
              <p key={idx} className={`${textColor}/90`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Examples Section */}
      {problem?.examples?.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-100">
            Examples
          </h2>
          
          {problem.examples.map((example, index) => (
            <div key={index} className={`bg-gray-700/20 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden`}>
              {/* Example Header */}
              <div className={`flex items-center justify-between ${bgColor} px-4 py-3 border-b ${borderColor}`}>
                <div className="flex items-center gap-2">
                  <span className="bg-[#2d3748] rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium">Example</span>
                </div>
              </div>

              {/* Example Content */}
              <div className="p-4 space-y-4">
                {/* Input */}
                <div>
                  <div className="flex items-center justify-between mb-2 ">
                    <span className="text-sm font-mono text-gray-400">Input</span>
                    <button 
                      onClick={() => copyToClipboard(example.input, `input-${index}`)}
                      className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-xs"
                    >
                      {copiedIndex === `input-${index}` ? (
                        <>
                          <CheckIcon className="h-3 w-3 text-amber-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <ClipboardDocumentIcon className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="font-mono text-sm text-gray-100 bg-gray-600/30 p-3 rounded overflow-x-auto">
                    <code>{example.input}</code>
                  </pre>
                </div>

                {/* Output */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-gray-400">Output</span>
                    <button 
                      onClick={() => copyToClipboard(example.output, `output-${index}`)}
                      className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-xs"
                    >
                      {copiedIndex === `output-${index}` ? (
                        <>
                          <CheckIcon className="h-3 w-3 text-amber-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <ClipboardDocumentIcon className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="font-mono text-sm text-gray-100 bg-gray-600/30 p-3 rounded overflow-x-auto">
                    <code>{example.output}</code>
                  </pre>
                </div>

                {/* Explanation (if exists) */}
                {example.explanation && (
                  <div className={`${bgColor} p-3 rounded`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                      <h3 className="text-sm font-medium text-amber-400">Explanation</h3>
                    </div>
                    <p className={`${textColor}/90 text-sm`}>{example.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hint Section - Collapsible */}
      {problem?.hint && (
        <div className={`${bgColor} rounded-lg overflow-hidden border ${borderColor}`}>
          <button 
            onClick={() => setShowHint(!showHint)}
            className={`w-full flex items-center justify-between ${bgColor} px-4 py-3 hover:bg-gray-600/30 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div className="bg-amber-400/10 p-1.5 rounded-full">
                <span className="text-amber-400">💡</span>
              </div>
              <span className="font-medium text-amber-400">Hint</span>
            </div>
            {showHint ? (
              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            )}
          </button>
          
          {showHint && (
            <div className="p-4">
              <p className={`${textColor}/90`}>{problem.hint}</p>
            </div>
          )}
        </div>
      )}

      {/* Constraints Section */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Constraints
        </h2>
        <ul className="space-y-2">
          {problem?.constraints?.split('\n').map((constraint, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2"></div>
              <span className="font-mono text-sm text-gray-300/90">{constraint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}