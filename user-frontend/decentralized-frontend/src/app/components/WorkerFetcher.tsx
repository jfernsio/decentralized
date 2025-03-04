"use client";

import Image from "next/image";
import { getNextTask } from "../api/actions";
import { useState, useEffect } from "react";

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
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for token every 1 second
    const checkTokenInterval = setInterval(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken && storedToken !== token) {
        setToken(storedToken);
      }
    }, 5000);
    
    return () => clearInterval(checkTokenInterval);
  }, [token]);
  
  return token;
}
export function WorkerFetcher() {
  // const [token, setToken] = useState<string | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const token = useToken();

  useEffect(()=>{
     // Skip if no token available
     if (!token) {
      console.log("Waiting for token...");
      return;
    }
    
    console.log("Token available, fetching task...");
    setLoading(true);
    
    getNextTask(token)
      .then((data) => {
        console.log("Fetched task:", data.task);
        const res = data.task;
        setTask(
          res && Array.isArray(res.options) ? res : { ...res, options: [] }
        );
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
        setTask(null);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [token]);
  

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
          Please check back in some time, there are no pending tasks at the
          momebt
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
        {task?.options?.map((option) => (
          <Option
            onSelect={async () => {
              setSubmitting(true);
              try {
                const response = await fetch(
                  `http://localhost:8000/api/worker/submit`,
                  {
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
                  }
                );
                const data = await response.json();
                 console.log('response',response)
                console.log("data",data)
                const nextTask = data;
                console.log(nextTask)
                if (nextTask) {
                  setTask(nextTask);
                } else {
                  setTask(null);
                }
                // refresh the user balance in the appbar
              } catch (e) {
                console.log(e);
              }
              setSubmitting(false);
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
        className={"p-2 w-96 rounded-md"}
        src={imageUrl}
      />
    </div>
  );
}
