import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const getLinkClass = (path) => {
    return router.pathname === path ? "active" : "";
  };

  return (
    <>
      <nav className="navbar">
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>🚨 RESCUE-MESH</div>
        <div className="nav-links">
          <Link href="/" className={getLinkClass('/')}>Submit SOS</Link>
          <Link href="/status" className={getLinkClass('/status')}>Check Status</Link>
          <Link href="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
          <Link href="/map" className={getLinkClass('/map')}>Map View</Link>
        </div>
      </nav>
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
