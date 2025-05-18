import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import confetti from 'canvas-confetti';
import styles from './username.module.css'; // Make sure to create this file

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (router.query.amount) setAmount(router.query.amount as string);
    if (router.query.msg) setMessage(router.query.msg as string);
  }, [router.query]);

  useEffect(() => {
    if (!username) return;
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

  if (!user) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <img
        src={user.profile_img || '/default-avatar.png'}
        alt="avatar"
        className={styles.avatar}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/default-avatar.png';
        }}
      />
      <h1 className={styles.username}>@{user.username}</h1>
      <p className={styles.bio}>{user.bio || 'No bio yet.'}</p>

      <h2 className={styles.heading}>🍰 Send a slice of Pi</h2>

      <div className={styles.amountButtons}>
        {[1, 3.14, 5, 10].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(String(amt))}
            className={`${styles.amountButton} ${amount === String(amt) ? styles.selected : ''}`}
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
        className={styles.messageInput}
      />

      <button onClick={copyToClipboard} className={styles.copyButton}>
        Copy Wallet: {user.wallet_address.slice(0, 6)}...
      </button>

      {copied && <p className={styles.copied}>✔ Copied to clipboard!</p>}
      {success && <p className={styles.success}>🎉 Tip sent successfully!</p>}
    </div>
  );
}
