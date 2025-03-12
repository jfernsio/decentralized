"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AmountPayout } from "./AmountPayout";
import ConnectWalletButton from "./ConnectWalletButton";

export const AppBar = ({ balance }: { balance?: number }) => {
  const pathname = usePathname();
  const isWorkerRoute = pathname === "/worker";

  return (
    <div className="flex items-center justify-between bg-black px-6 py-4 border-b border-white/10 shadow-lg">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
        TaskChain
      </Link>

      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <Link
          href={isWorkerRoute ? "/worker/submissions" : "/my-tasks"}
          className={`font-medium transition-colors ${
            pathname === "/worker/submissions" || pathname === "/my-tasks"
              ? "text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {isWorkerRoute ? "My Submissions" : "My Tasks"}
        </Link>
        
        {/* Preserve spacing for consistency */}
        {isWorkerRoute ? <AmountPayout /> : <div className="w-[120px]" />} 
        
        <ConnectWalletButton />
      </div>
    </div>
  );
};
