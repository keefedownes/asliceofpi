import { useEffect } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Login() {
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard";
    }
  }, [user]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log in to A Slice of Pi</h1>
      <p className="text-gray-600 mb-6">Sign in to claim your profile and receive tips.</p>
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        Sign in with Google
      </button>
    </main>
  );
}
