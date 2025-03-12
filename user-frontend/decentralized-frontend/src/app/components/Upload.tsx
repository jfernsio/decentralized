"use client";
import { useState } from "react";
import { UploadImage } from "./UploadImage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Transaction, SystemProgram, PublicKey } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export const Upload = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();

  
   //const receiver = new PublicKey("9AbMAYTcz7iSDNkDFSxWVzFa7YZuinPX5NsMcYx31BLz");

  async function onSubmit() {
    const res = await fetch("process.env.NEXT_PUBLIC_API_URLapi/user/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify({
        options: images.map((image) => ({
          imageUrl: image,
        })),
        title,
        signature: txSignature,
      }),
    });
    const data = await res.json();
    console.log(data);
    try {
      setIsSubmitted(true);
      if (data.success) {
        toast.success("Task submitted successfully");
        console.log(data.task);
        await router.push(`/task/${data.task._id}`);
      } else {
        toast.error("Error submitting task");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Error navigating to task page");
    } finally {
      setIsSubmitted(false);
    }
  }

  const makePayment = async () => {
    if (!publicKey) {
      console.error("Wallet not connected!");
      return;
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey("9AbMAYTcz7iSDNkDFSxWVzFa7YZuinPX5NsMcYx31BLz"),
        lamports: 100_000_000, // 0.1 SOL
      })
    );

    try {
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      console.log(`Signature: ${signature}`);

      // Check confirmation manually
      let isConfirmed = false;
      while (!isConfirmed) {
        const status = await connection.getSignatureStatus(signature, {
          searchTransactionHistory: true,
        });
        if (status?.value?.confirmationStatus === "finalized") {
          isConfirmed = true;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s before retrying
      }

      console.log("Transaction finalized!");
      toast.success("Transaction successful!!");
      setTxSignature(signature);
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
        Welcome to TaskChain!
      </h1>

      {/* Balance Display */}
      <div className="mt-4 text-lg text-gray-300">
      <span className="text-blue-400">Your one stop destination to getting your data labelled</span> {/* TODO: Fetch user balance */}
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 p-6 rounded-lg shadow-lg mt-6">
        {/* Task Title Input */}
        <label className="block text-md font-medium text-gray-400">
          Task Title
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full mt-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
          placeholder="What is your task?"
          required
        />

        {/* Image Upload Section */}
        <label className="block mt-6 text-md font-medium text-gray-400">
          Add Images
        </label>
        <div className="flex flex-wrap gap-4 mt-3">
          {images.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover rounded-lg border border-gray-600 shadow-md"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <UploadImage
            onImageAdded={(imageUrl) => setImages((prev) => [...prev, imageUrl])}
          />
        </div>

        {/* Pay and Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={txSignature ? onSubmit : makePayment}
            className="text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-6 py-3 transition-all shadow-md"
          >
            {txSignature ? "Submit Task" : "Pay 0.1 SOL"}
          </button>
        </div>
      </div>
    </div>
  );
};
