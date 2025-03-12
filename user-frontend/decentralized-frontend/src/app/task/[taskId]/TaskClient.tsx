'use client';

import { useEffect, useState } from 'react';

interface TaskOption {
  count: number;
  option: {
    imageUrl: string;
  };
}

interface TaskDetails {
  title?: string;
}

export default function TaskClient({ taskId }: { taskId: string }) {
  const [result, setResult] = useState<Record<string, TaskOption>>({});
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({});
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`NEXT_PUBLIC_API_URLapi/user/tasks?taskId=${taskId}`, {
          headers: {
            "Authorization": localStorage.getItem('token') || ''
          }
        });
        if (!response.ok) throw new Error('Failed to fetch task');
        const res = await response.json();
        console.log(res);
        setResult(res.result);
        setTaskDetails(res.taskDetails);
      } catch (err) {
        setError('Failed to load task');
      }
    };
    fetchTask();
  }, [taskId]);

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!taskDetails.title) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-gray-400 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Task Title */}
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
        {taskDetails.title}
      </h1>

      {/* Task Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {Object.keys(result).map((key, index) => {
          const maxVotes = Math.max(...Object.values(result).map(r => r.count)) || 1;
          const votePercentage = (result[key].count / maxVotes) * 100;

          return (
            <div 
              key={index} 
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-blue-500/50"
            >
              {/* Task Option Image */}
              <div className="w-full h-80 flex items-center justify-center bg-black">
                <img 
                  src={result[key].option.imageUrl} 
                  alt={`Option ${index + 1}`}
                  className="w-[90%] h-[90%] object-contain rounded-md"
                />
              </div>

              {/* Option Details */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">Option {index + 1}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-400">{result[key].count}</span>
                    <span className="text-sm text-gray-400">submissions</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 bg-gray-800 h-2 rounded-full">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${votePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
