import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

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
      <main className="p-6 text-center">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-lg mx-auto text-center">
      <img
        src={user.profile_img || "/default-avatar.png"}
        alt="avatar"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/default-avatar.png";
        }}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />

      <h1 className="text-xl font-bold">@{user.username}</h1>
      <p className="text-gray-600 mb-6">{user.bio || "No bio yet."}</p>

      <h2 className="text-lg font-semibold mb-2">🍰 Send a slice of Pi</h2>

      <div className="flex justify-center gap-2 flex-wrap mb-4">
        {[1, 3.14, 5, 10].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(String(amt))}
            className={`px-4 py-2 rounded-full border text-sm font-medium ${
              amount === String(amt)
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
          >
            {amt} π
          </button>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Add a message (optional)"
        className="w-full border rounded p-2 mb-3"
      />

      <button
        onClick={copyToClipboard}
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Copy Wallet: {user.wallet_address.slice(0, 6)}...
      </button>

      {copied && <p className="text-green-600 mt-2">✔ Copied to clipboard!</p>}
      {success && (
        <p className="text-green-700 mt-2 font-medium">
          🎉 Thanks for supporting @{user.username}!
        </p>
      )}
    </main>
  );
}
