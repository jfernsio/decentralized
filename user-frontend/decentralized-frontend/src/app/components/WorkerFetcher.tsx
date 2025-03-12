"use client";
import { useState, useEffect } from "react";
import { getNextTask } from "../api/actions";
import { AmountPayout } from "./AmountPayout";

interface Task {
  title: string;
  _id: string;
  signature: string;
  options: {
    image_url: string;
    _id: string;
  }[];
}

function useToken() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    };

    checkToken(); // Initial check
    const interval = setInterval(checkToken, 5000); // Check every 5s

    return () => clearInterval(interval);
  }, [token]);

  return token;
}

export function WorkerFetcher() {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const token = useToken();

  useEffect(() => {
    if (!token) {
      console.log("⏳ Waiting for token...");
      return;
    }

    console.log("🔄 Token available, fetching task...");
    setLoading(true);

    getNextTask(token)
      .then((data) => {
        console.log("✅ Fetched task:", data.task);
        const res = data.task;
        setTask(res && Array.isArray(res.options) ? res : { ...res, options: [] });
      })
      .catch((error) => {
        console.error("❌ Error fetching task:", error);
        setTask(null);
      })
      .finally(() => {
        console.log("✅ Task fetching complete.");
        setLoading(false);
      });
  }, [token, forceUpdate]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="text-2xl text-gray-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <div className="text-2xl text-gray-500">
          No pending tasks at the moment. Check back later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Task Title */}
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
        {task.title}
      </h1>

      {submitting && (
        <div className="text-center text-lg text-gray-400 pt-2">Submitting...</div>
      )}

      {/* Task Options */}
      <div className="flex justify-center flex-wrap gap-6 mt-8">
        {task.options.map((option) => (
          <Option
            onSelect={async () => {
              if (!token) return;
              setSubmitting(true);

              try {
                const response = await fetch(`process.env.NEXT_PUBLIC_API_URLapi/worker/submit`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  body: JSON.stringify({
                    taskId: task._id,
                    selection: option._id,
                    signature: task.signature,
                  }),
                });

                if (!response.ok) {
                  console.error("❌ Error submitting:", response.statusText);
                  throw new Error("Failed to submit task");
                }

                const data = await response.json();
                console.log("✅ Submission response:", data);
                <AmountPayout />;
                setTask(null);
                setForceUpdate(prev => prev + 1);
              } catch (e) {
                console.error("❌ Submission error:", e);
              } finally {
                setSubmitting(false);
                setLoading(false);
              }
            }}
            key={option._id}
            imageUrl={option.image_url}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ imageUrl, onSelect }: { imageUrl: string; onSelect: () => void }) {
  return (
    <div
      className="relative w-80 h-80 cursor-pointer transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
      onClick={onSelect}
    >
      <img
        className="w-full h-full object-cover rounded-lg border border-gray-700 shadow-md"
        src={imageUrl}
        alt="Task option"
      />
    </div>
  );
}
