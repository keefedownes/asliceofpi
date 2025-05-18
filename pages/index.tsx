import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const code = router.query.code;
    if (code && typeof code === "string") {
      localStorage.setItem("inviteCode", code);
    }
  }, [router.query.code]);

  return (
    <main className="min-h-screen bg-[#1c132b] text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-[#FCD535] mb-4">Welcome to A Slice of Pi 🍰</h1>
        <p className="text-gray-300 text-base mb-8">
          A simple way for Pioneers to support their favorite creators with Pi tips.
        </p>

        <Link href="/login" passHref>
          <Button className="w-full max-w-xs bg-[#FCD535] text-[#3B2F63] font-semibold text-base hover:bg-yellow-300">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
