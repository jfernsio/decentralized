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
  const [forceUpdate, setForceUpdate] = useState(0); // This helps trigger a re-render
  const token = useToken();

  // Fetch a new task whenever the token changes or a submission occurs
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
  }, [token, forceUpdate]); // Include `forceUpdate` to re-fetch after submission

  if (loading) {
    return (
      <div className="h-screen flex justify-center flex-col">
        <div className="w-full flex justify-center text-2xl">Loading...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="h-screen flex justify-center flex-col">
        <div className="w-full flex justify-center text-2xl">
          No pending tasks at the moment. Please check back later.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl pt-20 flex justify-center">
        {task.title}
        <div className="pl-4">{submitting && "Submitting..."}</div>
      </div>
      <div className="flex justify-center pt-8">
        {task.options.map((option) => (
          <Option
            onSelect={async () => {
              if (!token) return;
              setSubmitting(true);

              try {
                const response = await fetch(`http://localhost:8000/api/worker/submit`, {
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

                setTask(null); // Clear current task
                setForceUpdate(prev => prev + 1); // Trigger re-fetch
              } catch (e) {
                console.error("❌ Submission error:", e);
              } finally {
                setSubmitting(false);
                setLoading(false);
                AmountPayout(); // Ensure loading is reset after submission
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

function Option({
  imageUrl,
  onSelect,
}: {
  imageUrl: string;
  onSelect: () => void;
}) {
  return (
    <div>
      <img
        onClick={onSelect}
        className="p-2 w-96 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
        src={imageUrl}
        alt="Task option"
      />
    </div>
  );
}
