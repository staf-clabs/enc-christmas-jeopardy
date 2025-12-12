import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <div className="card" style={{padding: 22}}>
        <div className="badge">🎄 Bible • Christmas • ENC NYC</div>
        <h1 className="h1" style={{marginTop: 10}}>Christmas Bible Jeopardy</h1>
        <p className="p">
          Use <span className="kbd">/host</span> to run the game (protected by your PIN). Open <span className="kbd">/display</span> on the projector for a clean audience view.
        </p>
        <div className="hr" />
        <div className="row">
          <Link className="btn primary" href="/host">Go to Host (requires PIN)</Link>
          <Link className="btn" href="/display">Open Display (audience view)</Link>
        </div>
        <div className="footerlinks">
          <a className="btn" href="https://vercel.com/docs" target="_blank" rel="noreferrer">Vercel Docs</a>
          <a className="btn" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">Next.js Docs</a>
        </div>
      </div>

      <div style={{height: 16}} />

      <div className="row">
        <div className="card" style={{padding: 18, flex: '1 1 420px'}}>
          <h2 className="h2">Quick setup</h2>
          <ol className="p" style={{marginTop: 0, paddingLeft: 18}}>
            <li>Set env var <span className="kbd">HOST_PIN</span> (e.g., <span className="kbd">ENC-Christmas</span>).</li>
            <li>Deploy to Vercel.</li>
            <li>Open <span className="kbd">/host</span> on your laptop and <span className="kbd">/display</span> on the projector.</li>
          </ol>
        </div>

        <div className="card" style={{padding: 18, flex: '1 1 420px'}}>
          <h2 className="h2">How it works</h2>
          <p className="p" style={{marginTop: 0}}>
            The host controls the board, clue reveals, and scoring. State is stored in the browser and synced across tabs
            using BroadcastChannel + localStorage (so it works great with a “host tab” + “projector tab” on the same machine).
          </p>
        </div>
      </div>
    </main>
  );
}
