import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import SubmissionShimmer from "../shimmers/submissionShimmer";

export default function Submissions() {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showBox, setShowBox] = useState(false);
  const [selectedCode, setSelectedCode] = useState("");
  const [isVisible, setIsVisible] = useState(false); // For fade animation

  const fetchSubmissions = async () => {
    try {
      const response = await axiosClient.get(
        `submission/ProblemSubmissonByUser/${id}`
      );
      setSubmissions(response.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching submissions", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id]);

  const openCodeBox = (code) => {
    setSelectedCode(code);
    setShowBox(true);
    setIsVisible(true);
  };

  const closeCodeBox = () => {
    setIsVisible(false);
    setTimeout(() => setShowBox(false), 300);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'accepted':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'compilation error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const CodeBox = () => {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Backdrop with fade effect */}
        <div 
          className="absolute inset-0 bg-black/5 backdrop-blur-sm"
          onClick={closeCodeBox}
        />
        
        {/* Modal container */}
        <div className={`relative bg-[#1e1e1e] rounded-lg p-4 max-w-4xl max-h-[80vh] overflow-auto border border-gray-700 transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-[#1e1e1e] py-2 z-10">
            <h3 className="text-lg font-medium text-white">Submission Code</h3>
            <button 
              onClick={closeCodeBox}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
          <pre className="bg-[#0f0f0f] p-4 rounded overflow-x-auto text-gray-300 text-sm border-2 border-yellow-400">
            <code>{selectedCode}</code>
          </pre>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Please sign in to view your submissions
      </div>
    );
  }

  if (loading) {
    return <SubmissionShimmer/>;
  }

  if (!submissions || submissions.length === 0 || submissions === 'No submissions found for this problem') {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No submissions found for this problem
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] rounded-lg overflow-hidden border border-gray-700 relative">
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-600/30 text-gray-300 font-medium">
        <div className="col-span-4">Status</div>
        <div className="col-span-2">Language</div>
        <div className="col-span-2">Runtime</div>
        <div className="col-span-2">Memory</div>
        <div className="col-span-2">Submitted</div>
      </div>
    
      <div className="divide-y divide-gray-700">
        {submissions.map((submission) => (
          <div key={submission._id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-800/50 transition-colors">
            <div className="col-span-4 flex items-center space-x-2">
              {getStatusIcon(submission.status)}
              <span className={`font-medium ${
                submission.status.toLowerCase() === 'accepted' ? 'text-green-400' :
                submission.status.toLowerCase() === 'compilation error' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {submission.status}
              </span>
            </div>
            <div className="col-span-2 text-gray-300">{submission.language}</div>
            <div className="col-span-2 text-gray-300">
              {submission.runtime ? `${submission.runtime} ms` : '-'}
            </div>
            <div className="col-span-2 text-gray-300">
              {submission.memory ? `${submission.memory} KB` : '-'}
            </div>
            <div className="col-span-2 text-gray-400 text-sm">
              {formatDate(submission.createdAt)}
            </div>
            <button 
              className="col-span-2 bg-black border-2 border-gray-600 text-yellow-500 text-xs p-2 hover:bg-gray-800 transition-colors"
              onClick={() => openCodeBox(submission.code)}
            >
              View Code
            </button>
          </div>
        ))}
      </div>
      
      {showBox && <CodeBox />}
    </div>
  );
}