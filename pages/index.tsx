import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">A Slice of Pi</h1>
      <p className="mb-6 text-center max-w-md">
        Tip your favourite creators with Pi Coin. Simple. Fast. Borderless.
      </p>
      {user ? (
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Go to Dashboard
        </button>
      ) : (
        <Link
          href="/login"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Log In
        </Link>
      )}
    </main>
  );
}