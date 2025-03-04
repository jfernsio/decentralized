"use client";

import { useState, useEffect } from "react";
import { fetchDataWithToken } from "../api/actions";

interface Task {
  _id: string;
  title: string;
  user_id: string;
  signature: string;
  amount: number;
  done: boolean;
  options: {
    imageUrl: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface TaskResponse {
  success: boolean;
  tasks: Task[];
}

export default function GetUserToken() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [taskResponse, setTaskResponse] = useState<TaskResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not authorized");
      setLoading(false);
      return;
    }

    fetchDataWithToken(token)
      .then((data) => {
        setTaskResponse({
          success: true,
          tasks: data,
        });
        console.log(taskResponse);
      })
      .catch((err) => {
        setError(err.message);
        setTaskResponse(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

