import { useEffect, useState } from "react";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { isLoading } = useSessionContext();
  const user = useUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [wallet, setWallet] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isLoading && user === null) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("username, bio, wallet_address")
        .eq("id", user.id)
        .single();

      if (!data && !error) {
        await supabase.from("users").insert({
          id: user.id,
          username: "",
          bio: "",
          wallet_address: "",
        });
        return;
      }

      if (data) {
        setUsername(data.username || "");
        setBio(data.bio || "");
        setWallet(data.wallet_address || "");
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!username.match(/^[a-z0-9_]+$/)) {
      setErrorMsg("Username must be lowercase, no spaces, and only letters, numbers, or underscores.");
      return;
    }

    setSaving(true);
    setErrorMsg("");

    const { data: existing, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .neq("id", user?.id);

    if (checkError) {
      setErrorMsg("Something went wrong. Please try again.");
      setSaving(false);
      return;
    }

    if (existing && existing.length > 0) {
      setErrorMsg("This username is already taken.");
      setSaving(false);
      return;
    }

    await supabase.from("users").upsert({
      id: user?.id,
      username,
      bio,
      wallet_address: wallet,
    });

    setSaving(false);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading || user === null) return null;

  return (
    <main className="min-h-screen bg-[#1c132b] text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-xl border border-[#5D4DAA] bg-[#2C2351] text-white shadow-xl">
        <CardContent className="p-6 space-y-5">
          <h1 className="text-3xl font-bold text-[#FCD535] text-center">Creator Profile</h1>

          <div>
            <label className="text-sm font-medium text-[#FCD535]">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              readOnly={!isEditing}
            />
          </div>

          {username && !isEditing && (
            <p className="text-xs text-gray-300 text-center">
              Share this link so fans can tip you: <br />
              <code className="text-[#FCD535] font-mono">asliceofpi.app/u/{username}</code>
            </p>
          )}

          {errorMsg && <p className="text-sm text-red-400 text-center">{errorMsg}</p>}

          <div>
            <label className="text-sm font-medium text-[#FCD535]">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#FCD535]">Pi Wallet Address</label>
            <Input
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              readOnly={!isEditing}
              placeholder="Paste from Pi Wallet or Zypto"
            />
            <p className="text-xs text-gray-400 mt-1">
              This is where fans will send Pi. Use your Pi Wallet or Zypto address.
            </p>
          </div>

          {isEditing ? (
            <Button onClick={handleSave} className="w-full bg-[#FCD535] text-[#3B2F63]" disabled={saving}>
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full bg-[#FCD535] text-[#3B2F63]">
              Edit Profile
            </Button>
          )}

          <Button variant="ghost" className="w-full text-red-400 hover:text-red-300" onClick={handleLogout}>
            Log out
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
