'use client';

import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HostLoginPage() {
  const [pin, setPin] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const nextPath = useMemo(() => params.get('next') || '/host', [params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        setErr('Wrong PIN. Try again.');
        setLoading(false);
        return;
      }
      router.push(nextPath);
    } catch (e) {
      setErr('Network error. Try again.');
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="card" style={{ padding: 22, maxWidth: 520, margin: '0 auto' }}>
        <div className="badge">🔒 Host Login</div>
        <h1 className="h1" style={{ marginTop: 10 }}>Enter your host PIN</h1>
        <p className="p">Set <span className="kbd">HOST_PIN</span> in Vercel env vars (or it defaults to <span className="kbd">ENC2025</span>).</p>

        <form onSubmit={onSubmit} style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Host PIN"
            autoFocus
          />
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Checking…' : 'Unlock Host Mode'}
          </button>
          {err ? <div className="small" style={{ color: 'var(--danger)' }}>{err}</div> : null}
        </form>

        <div className="hr" />
        <div className="row">
          <Link className="btn" href="/display">Open Display</Link>
          <Link className="btn" href="/">Home</Link>
        </div>
      </div>
    </main>
  );
}
