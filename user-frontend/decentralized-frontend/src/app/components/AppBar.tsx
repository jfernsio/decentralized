import Link from "next/link";

export const AppBar = () => {
    return (
        <div className="flex justify-between border-b pb-2 pt-2">
        <div className="text-2xl pl-4 flex justify-center pt-3">
            Turkify
        </div>
        <div className="text-xl pr-4 pb-2">
           Connect Wallet
        </div>
        <div className="text-xl pr-4 pb-2">
            <Link href='/my-tasks'>My-Tasks</Link>
            </div>
    </div>

    );
}

