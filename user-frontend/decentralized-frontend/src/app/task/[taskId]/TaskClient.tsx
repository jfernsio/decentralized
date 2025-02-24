'use client';

import { useEffect, useState } from 'react';
// import { fetchTaskDetails } from '@/lib/api';

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
        const response = await fetch(`http://localhost:8000/api/user/tasks?taskId=${taskId}`, {
          headers: {
            "Authorization": localStorage.getItem('token') || ''
          }
        });
        if (!response.ok) throw new Error('Failed to fetch task');
        const res = await response.json();
        console.log(res)
        setResult(res.result);
        setTaskDetails(res.taskDetails);
      } catch (err) {
        setError('Failed to load task');
      }
    };
    fetchTask();
  }, [taskId]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!taskDetails.title) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{taskDetails.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        {Object.keys(result).map((key, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-102 hover:shadow-xl">
            <img 
              src={result[key].option.imageUrl} 
              alt="Task Option"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Option {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">{result[key].count}</span>
                  <span className="text-sm text-gray-500">submissions</span>
                </div>
              </div>
              <div className="mt-3 bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ 
                    width: `${(result[key].count / Math.max(...Object.values(result).map(r => r.count))) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
   
  );
}