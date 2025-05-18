// pages/privacy.tsx
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Privacy Policy</h1>

        <p style={styles.p}>
          A Slice of Pi ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our app.
        </p>

        <h2 style={styles.h2}>1. Data We Collect</h2>
        <ul style={styles.ul}>
          <li>Pi Username (via Pi Browser authentication)</li>
          <li>Tip messages (optional, public)</li>
          <li>Anonymous app usage data for performance insights</li>
        </ul>

        <h2 style={styles.h2}>2. How We Use Your Data</h2>
        <ul style={styles.ul}>
          <li>To display usernames and messages on profile pages</li>
          <li>To operate the tipping system</li>
          <li>To improve app functionality</li>
        </ul>

        <h2 style={styles.h2}>3. Data Sharing</h2>
        <p style={styles.p}>We do not share or sell user data to third parties.</p>

        <h2 style={styles.h2}>4. Security</h2>
        <p style={styles.p}>Data is stored securely and encrypted where applicable.</p>

        <h2 style={styles.h2}>5. Your Rights</h2>
        <p style={styles.p}>You can request deletion of your tip messages by contacting us directly.</p>

        <h2 style={styles.h2}>6. Policy Changes</h2>
        <p style={styles.p}>We may update this policy from time to time. Continued use of the app implies acceptance of changes.</p>

        <h2 style={styles.h2}>7. Contact</h2>
        <p style={styles.p}>
          For questions about privacy, contact us at: <strong>support@asliceofpi.app</strong>
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    padding: '2rem 1rem',
    backgroundColor: '#f9f9fb',
    minHeight: '100vh',
  },
  card: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
  },
  title: {
    color: '#6D28D9',
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '1rem',
  },
  h2: {
    marginTop: '1.5rem',
    color: '#4B0082',
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  p: {
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  ul: {
    paddingLeft: '1.2rem',
    lineHeight: 1.6,
  },
};
