"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";
import GetToken from "./GetToken";
import {  usePathname } from "next/navigation";
export default function ConnectWalletButton() {
  const { publicKey, signMessage } = useWallet();
  const { connection } = useConnection();
  
  const [balance, setBalance] = useState<number>(0);
  const [signature, setSignature] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Determine if we're in user or worker route
  // This will extract the first segment of the path
  const userType = pathname?.split('/')?.[1] || 'smthg';
  console.log(userType)
  useEffect(() => {
    if (publicKey) {
      // ✅ Corrected: Use setInterval & clear it on unmount
      const intervalId = setInterval(async () => {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [publicKey, connection]);

  const hashedSigned = useRef(false);
  if (localStorage.getItem('token')) {
    hashedSigned.current = true;
  }

  useEffect(() => {
    if (publicKey && signMessage && !hashedSigned.current) {
      hashedSigned.current = true;
      (async () => {
        try {
          const message = new TextEncoder().encode("Sign into mechanical turks");
          const signatureResponse = await signMessage(message);
          console.log(`Signature response ${signatureResponse}`)
          setSignature(Buffer.from(signatureResponse).toString("base64")); // ✅ Convert signature to a usable format
        } catch (error) {
          console.error("Signing failed", error);
        }
      })();
    }
  }, [publicKey, signMessage]);

  return (
    <div className="border hover:border-slate-900 rounded p-1">
      {publicKey ? (
        <div>
         <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-md shadow-sm border border-green-500/40">
         Balance : {balance.toFixed(2)} SOL
</div>

          <WalletDisconnectButton />
        </div>
      ) : (
        <WalletMultiButton />
      )}

      {/* ✅ Render GetToken only when publicKey & signature are available */}
      {publicKey && signature && <GetToken publicKeyProp={publicKey.toString()} signatureProp={signature} type={userType} />}
    </div>
  );
}
