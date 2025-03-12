"use client";

import { useEffect, useState } from "react";
import ClientFetcher from "../components/ClientFetcher";
import GetUserToken from "./getTask";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TaskOption {
  image_url: string;
  submissions: number;
}

interface UserTasks {
  title: string;
  amount: number;
  options: TaskOption[];
}

export default function Home() {
  const [tasks, setTasks] = useState<UserTasks[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/user/all/tasks/user", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        const result = await response.json();
        setTasks(Array.isArray(result.tasks) ? result.tasks : []);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
        My Tasks
      </h1>
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <Card key={index} className="bg-white/5 border border-white/10 p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <CardContent>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-md mb-2">
                {task.title}
              </h2>
              <p className="text-gray-400 mb-4">
                Reward: <span className="text-blue-400 font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-md">{task.amount} SOL</span>
              </p>
              <div className="space-y-4">
                {task.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-4">
                    <img
                      src={option.image_url}
                      alt={`Option ${optionIndex}`}
                      className="w-16 h-16 rounded-lg object-cover border border-white/10 shadow-md"
                    />
                    <div className="flex-1">
                      <p className="text-gray-300">Submissions: {option.submissions}</p>
                      <Progress
                        value={option.submissions * 10}
                        className="bg-gray-700 h-2 rounded-full overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${option.submissions * 10}%` }}></div>
                      </Progress>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
