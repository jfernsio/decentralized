"use client";

import { useEffect, useState } from "react";

import { useWallet } from "@solana/wallet-adapter-react"; // Assuming you're using Solana wallet adapter
import Image from "next/image";

interface Submission {
  title: string;
  amount: number;
  image: string;
}

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const { publicKey } = useWallet(); // Get connected wallet address


  useEffect(() => {
    if (!publicKey) return; // Ensure wallet is connected

    const fetchSubmissions = async () => {
      try {
        const response = await fetch('NEXT_PUBLIC_API_URLapi/worker/submissions',{
            headers:{
                "Authorization":localStorage.getItem('token')
            }
        });
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [publicKey]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        My Completed Tasks
      </h1>

      {loading ? (
        <p className="mt-4 text-gray-300">Loading tasks...</p>
      ) : submissions.length === 0 ? (
        <p className="mt-4 text-gray-300">No completed tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {submissions.map((task, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800"
            >
              <Image
                src={task.image}
                alt="Task Image"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-xl font-semibold">{task.title}</h2>
              <p className="text-blue-400 font-medium">Reward: {task.amount} SOL</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
