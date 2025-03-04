'use client'

import { useEffect, useState } from "react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function AmountPayout() {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAmount = async () => {
      if (!token) {
        setError('Unauthorized');
        return;
      }
      try {
        const balance = await fetch('http://localhost:8000/api/worker/balance', {
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

  return (
    <div>
      <h1>Amount Payout</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Amount: {amount.pending_amount/LAMPORTS_PER_SOL}</p>
      )}
    </div>
  );
}