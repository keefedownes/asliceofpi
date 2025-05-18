// pages/terms.tsx
import React from 'react';

export default function TermsOfService() {
  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Terms of Service</h1>

        <p style={styles.p}>
          By using A Slice of Pi ("the App"), you agree to the following terms and conditions:
        </p>

        <h2 style={styles.h2}>1. Use of the App</h2>
        <p style={styles.p}>
          You may use the App to view profiles and send voluntary tips in Pi cryptocurrency to creators and users. You agree not to misuse the platform or submit harmful content.
        </p>

        <h2 style={styles.h2}>2. Tipping and Fees</h2>
        <p style={styles.p}>
          All tips are voluntary and final. A 10% fee is applied to all tips, which goes to support the ongoing development and maintenance of the A Slice of Pi platform.
        </p>

        <h2 style={styles.h2}>3. Responsibility for Transactions</h2>
        <p style={styles.p}>
          Tipping is performed manually by the user using their Pi Wallet. The App does not process Pi payments directly and is not responsible for lost, delayed, or misdirected transactions.
        </p>

        <h2 style={styles.h2}>4. Content Guidelines</h2>
        <p style={styles.p}>
          Users must not submit messages or content that are abusive, illegal, or violate community guidelines. We reserve the right to remove any content at our discretion.
        </p>

        <h2 style={styles.h2}>5. Service Availability</h2>
        <p style={styles.p}>
          The App is provided "as is" without guarantees of uptime or uninterrupted access.
        </p>

        <h2 style={styles.h2}>6. Changes to These Terms</h2>
        <p style={styles.p}>
          We may update these terms over time. By continuing to use the App, you accept any future changes.
        </p>

        <h2 style={styles.h2}>7. Contact</h2>
        <p style={styles.p}>
          For questions or concerns, reach out to us at: <strong>support@asliceofpi.app</strong>
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
};
