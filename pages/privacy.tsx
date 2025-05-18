import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-2xl mx-auto p-6 font-sans leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        A Slice of Pi (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, and safeguard information when you use our app.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">1. Data We Collect</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Pi Username (via Pi Browser authentication)</li>
        <li>Tip messages (optional, public)</li>
        <li>Anonymous app usage data for performance insights</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>To display usernames and messages on profile pages</li>
        <li>To operate the tipping system</li>
        <li>To improve app functionality</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-4">We do not share or sell user data to third parties.</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Security</h2>
      <p className="mb-4">Data is stored securely and encrypted where applicable.</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">You can request deletion of your tip messages by contacting us directly.</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">6. Policy Changes</h2>
      <p className="mb-4">We may update this policy from time to time. Continued use of the app implies acceptance of changes.</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">7. Contact</h2>
      <p>For questions about privacy, contact us at: <strong>support@asliceofpi.app</strong></p>
    </main>
  );
}
