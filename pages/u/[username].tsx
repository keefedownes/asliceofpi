import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  wallet_address: string;
  profile_img?: string;
  bio?: string;
}

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (router.query.amount) setAmount(router.query.amount as string);
    if (router.query.msg) setMessage(router.query.msg as string);
  }, [router.query]);

  useEffect(() => {
    if (!username || typeof username !== "string") return;
    fetch(`/api/getUser?username=${username}`)
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, [username]);

  const copyToClipboard = async () => {
    if (!user?.wallet_address) return;

    await navigator.clipboard.writeText(user.wallet_address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    confetti();
    setSuccess(true);
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-[#1c132b] text-white flex items-center justify-center">
        <p className="text-lg text-gray-300">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1c132b] text-white px-4 py-12">
      <div className="max-w-md mx-auto bg-[#2C2351] p-6 rounded-lg shadow-lg border border-[#5D4DAA] text-center">
        <img
          src={user.profile_img || "/default-avatar.png"}
          alt="avatar"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-avatar.png";
          }}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-yellow-400"
        />

        <h1 className="text-2xl font-bold text-[#FCD535]">@{user.username}</h1>
        <p className="text-sm text-gray-300 mb-6">{user.bio || "No bio yet."}</p>

        <h2 className="text-lg font-semibold mb-3 text-purple-200">🍰 Send a slice of Pi</h2>

        <div className="flex justify-center flex-wrap gap-2 mb-4">
          {[1, 3.14, 5, 10].map((amt) => (
            <Button
              key={amt}
              variant={amount === String(amt) ? "default" : "outline"}
              className={`rounded-full px-5 py-2 ${
                amount === String(amt)
                  ? "bg-purple-600 text-white"
                  : "border-purple-600 text-purple-200 hover:bg-purple-800"
              }`}
              onClick={() => setAmount(String(amt))}
            >
              {amt} π
            </Button>
          ))}
        </div>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a message (optional)"
          className="bg-[#3B2F63] text-white mb-3"
        />

        <Button
          onClick={copyToClipboard}
          className="w-full bg-[#FCD535] text-[#3B2F63] hover:bg-yellow-300 font-bold"
        >
          Copy Wallet: {user.wallet_address.slice(0, 6)}...
        </Button>

        {copied && <p className="text-green-400 mt-2">✔ Copied to clipboard!</p>}
        {success && (
          <p className="text-green-500 mt-2 font-medium">
            🎉 Thanks for supporting @{user.username}!
          </p>
        )}
      </div>
    </main>
  );
}
