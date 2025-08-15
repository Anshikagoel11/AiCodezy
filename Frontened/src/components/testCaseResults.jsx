import { useSelector } from 'react-redux';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function TestCaseResults() {
  const { runResult } = useSelector((state) => state.run);
  
  if (!runResult) {
    return (
      <div className="p-4 text-gray-400">
        Run your code to see test results
      </div>
    );
  }

  const allPassed = runResult.testCasesPassed === runResult.testcasesTotal;

  return (
    <div className="p-4">
      {allPassed ? (
        <div className="flex flex-col items-center justify-center h-full space-y-2 text-[#EA763F]">
          <CheckCircleIcon className="h-12 w-12" />
          <p className="text-xl font-semibold">All test cases passed!</p>
          <p className="text-sm">{`${runResult.testCasesPassed}/${runResult.testcasesTotal} passed`}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-600/30 rounded-lg">
            <div className="flex items-center space-x-2 text-red-700">
              <XCircleIcon className="h-5 w-5" />
              <span className="font-medium">{runResult.status}</span>
            </div>
            <p className="text-red-600 font-medium">
              {`${runResult.testCasesPassed}/${runResult.testcasesTotal} passed`}
            </p>
          </div>

          {runResult.errorMessage && (
            <div className="bg-gray-600/30 p-3 rounded-lg">
              <h4 className="text-gray-400 text-sm mb-1">Error Message</h4>
              <pre className="text-red-400 text-sm whitespace-pre-wrap overflow-auto">
                {runResult.errorMessage}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}