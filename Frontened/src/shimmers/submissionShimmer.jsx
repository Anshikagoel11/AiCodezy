export default function  SubmissionShimmer() {
  return (
    <div className="bg-[#0f0f0f] rounded-lg overflow-hidden border border-gray-700">
      {/* Header row shimmer */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800">
        {[...Array(5)].map((_, i) => (
          <div 
            key={`header-${i}`}
            className={`h-5 bg-gray-700 rounded animate-pulse ${
              i === 0 ? 'col-span-4' : 
              i === 4 ? 'col-span-2' : 
              'col-span-2'
            }`}
          />
        ))}
      </div>
      
      {/* Submission rows shimmer */}
      <div className="divide-y divide-gray-700">
        {[...Array(8)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-12 gap-4 p-4">
            {/* Status column */}
            <div className="col-span-4 flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-700 rounded-full animate-pulse" />
              <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />
            </div>
            
            {/* Other columns */}
            {[...Array(4)].map((_, colIndex) => (
              <div 
                key={`col-${colIndex}`} 
                className="h-5 bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};