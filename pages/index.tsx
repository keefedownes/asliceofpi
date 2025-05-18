import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const code = router.query.code;
    if (code && typeof code === "string") {
      localStorage.setItem("inviteCode", code);
    }
  }, [router.query.code]);

  return (
    <main className="flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to A Slice of Pi 🍰</h1>
      <p className="mb-6 text-gray-700">
        A simple way for Pioneers to support their favorite creators with Pi tips.
      </p>

      <Link href="/login" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
        Get Started
      </Link>
    </main>
  );
}
