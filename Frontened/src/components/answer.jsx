// Answer.js
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import CelebrationAnimation from "../Ui/celebrateAnimation";

export default function Answer() {
  const { submitResult, waiting } = useSelector((state) => state.submit); 
  const [showCelebration, setShowCelebration] = useState(false);
  const lastCelebratedIdRef = useRef(null);

  useEffect(() => {
    if (waiting) {
      lastCelebratedIdRef.current = null;
      setShowCelebration(false);
    }

    if (
      !waiting &&
      submitResult?.status?.toLowerCase() === "accepted" &&
      submitResult?._id &&
      lastCelebratedIdRef.current !== submitResult._id
    ) {
      setShowCelebration(true);
      lastCelebratedIdRef.current = submitResult._id;
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitResult, waiting]);

  if (!submitResult) {
    return <div className="p-4 text-gray-500">Submit your code to see results</div>;
  }

  return (
    <div className="p-4">
      {showCelebration && <CelebrationAnimation />}

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Submission Result</h2>
        <div
          className={`p-3 rounded-md ${
            submitResult.status.toLowerCase() === "accepted"
              ? "bg-gray-600/30 text-green-800 "
              : submitResult.status.toLowerCase() === "compilation error"
              ? "bg-gray-600/30 text-red-800 "
              : "bg-gray-600/30 text-orange-800"
          }`}
        >
          <strong>Status:</strong> {submitResult.status}
        </div>
      </div>

      {submitResult.errorMessage && (
        <div className="mb-4">
          <h3 className="font-bold mb-1">Error Message</h3>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-auto text-sm">
            {submitResult.errorMessage}
          </pre>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-600/30 p-3 rounded-md">
          <strong>Language:</strong> {submitResult.language}
        </div>
        <div className="bg-gray-600/30 p-3 rounded-md">
          <strong>Runtime:</strong> {submitResult.runtime} ms
        </div>
        <div className="bg-gray-600/30 p-3 rounded-md">
          <strong>Memory:</strong> {submitResult.memory} KB
        </div>
        <div className="bg-gray-600/30 p-3 rounded-md">
          <strong>Test Cases:</strong> {submitResult.testCasesPassed}/{submitResult.testcasesTotal}
        </div>
      </div>

      {submitResult.code && (
        <>
          <h3 className="font-bold mb-1">Submitted Code</h3>
          <div className="bg-gray-400/10 border border-white p-3">
            <pre className="bg-gray-900 p-3 rounded-md overflow-auto text-sm">
              {submitResult.code}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}