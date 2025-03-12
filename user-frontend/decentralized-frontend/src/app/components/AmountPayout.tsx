'use client'

import { useEffect, useState } from "react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import toast from "react-hot-toast";

export function AmountPayout() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
const [payingout, setPayingout] = useState(false);

  useEffect(() => {
    const fetchAmount = async () => {
      if (!token) {
        setError('Unauthorized');
        return;
      }
      try {
        const balance = await fetch('NEXT_PUBLIC_API_URLapi/worker/balance', {
          method: 'GET',
          headers: {
            Authorization: token
          }
        });
        const data = await balance.json();
        setAmount(data);
        console.log(amount)
      } catch (error) {
        setError('Failed to fetch amount');
      }
    };
    fetchAmount();
  }, [token]);

  if(payingout) {
    return (
      <div>
        <h1>Processing...</h1>
      </div>
    )
  }

  return (
    <div className="text-xl pr-8 flex" >
    <button onClick={ async ()  => {
      setPayingout(true);
     const response = await  fetch('NEXT_PUBLIC_API_URLapi/worker/payout', {
        method: 'POST',
        headers: {
          Authorization: token
        }
      });
      const data = await response.json();
      console.log(data)
  if (data.error) {
  setPayingout(false);
  toast.error(data.error);
} else {
  setPayingout(false);
  toast.success(data.message);
}

    

    }} className="m-2 mr-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Pay me out ({amount.pending_amount/LAMPORTS_PER_SOL}) SOL
    </button>
   
</div>
  
  );
}