import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard";
    }
  }, [user]);

  const handleLogin = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1c132b] text-white px-4">
      <div className="w-full max-w-md bg-[#2C2351] p-8 rounded-lg shadow-lg border border-[#5D4DAA]">
        <h1 className="text-3xl font-bold text-[#FCD535] mb-4 text-center">Sign in to A Slice of Pi</h1>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Enter your email to receive a magic login link.
        </p>

        {sent ? (
          <p className="text-green-400 text-center">
            ✅ Check your inbox — your magic login link has been sent!
          </p>
        ) : (
          <>
            <div className="mb-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-[#3B2F63] text-white"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-[#FCD535] text-[#3B2F63] font-bold hover:bg-yellow-300"
            >
              Send Magic Link
            </Button>
            {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
          </>
        )}
      </div>
    </main>
  );
}
