import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rawUsername = req.query.username;

  if (!rawUsername || typeof rawUsername !== 'string') {
    console.log('[API] Missing or invalid username:', rawUsername);
    return res.status(400).json({ error: 'Missing or invalid username' });
  }

  const username = rawUsername.trim().toLowerCase();
  console.log('[API] Looking up username:', username);

  const { data, error } = await supabase
    .from('users')
    .select('username, wallet_address, profile_img, bio')
    .ilike('username', username)
    .single();

  if (error || !data) {
    console.log('[API] User not found or error:', error);
    return res.status(404).json({ error: 'User not found' });
  }

  console.log('[API] User found:', data.username);
  return res.status(200).json({ user: data });
}
