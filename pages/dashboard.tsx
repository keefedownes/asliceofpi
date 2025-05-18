import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Dashboard() {
  const user = useUser();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [wallet, setWallet] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user === null) router.push("/login");
  }, [user]);
  if (user === null) return null;

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("users")
        .select("username, bio, wallet_address")
        .eq("id", user.id)
        .single();
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

    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .neq("id", user?.id);

    if (existing.length > 0) {
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

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Creator Profile</h1>

      <label className="block mb-2">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value.toLowerCase())}
        readOnly={!isEditing}
        className="w-full border rounded p-2 mb-1"
      />
      {username && !isEditing && (
        <p className="text-sm text-gray-600 mb-4">
          Share this link so fans can tip you: <br />
          <code className="font-mono">asliceofpi.app/u/{username}</code>
        </p>
      )}
      {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

      <label className="block mb-2">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        readOnly={!isEditing}
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-2">Your Pi Wallet Address</label>
      <input
        type="text"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        readOnly={!isEditing}
        placeholder="Paste from Pi Wallet or Zypto app"
        className="w-full border rounded p-2 mb-2"
      />
      <p className="text-xs text-gray-500 mb-4">
        This is where fans will send Pi. You can get your wallet address from the Pi Wallet app or Zypto.
      </p>

      {isEditing ? (
        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2 rounded"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      )}

      <button
        onClick={handleLogout}
        className="text-sm text-red-500 mt-6 underline"
      >
        Log out
      </button>
    </main>
  );
}