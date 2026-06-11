import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppStore } from '../store/appStore';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const getLinkClass = (path) => {
    return router.pathname === path ? "active" : "";
  };

  const { isOffline, toggleOfflineMode, offlineRequests } = useAppStore();

  return (
    <>
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>🚨 RESCUE-MESH</div>
          <div className="nav-links">
            <Link href="/" className={getLinkClass('/')}>Submit SOS</Link>
            <Link href="/status" className={getLinkClass('/status')}>Check Status</Link>
            <Link href="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
            <Link href="/map" className={getLinkClass('/map')}>Map View</Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isOffline && (
            <span style={{ color: 'var(--high)', fontSize: '14px', fontWeight: 'bold' }}>
              ⚠️ OFFLINE ({offlineRequests.length} pending)
            </span>
          )}
          <button 
            onClick={toggleOfflineMode}
            style={{
              padding: '6px 12px',
              backgroundColor: isOffline ? 'var(--high)' : 'var(--low)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px'
            }}
          >
            {isOffline ? 'Sync to Network' : 'Go Offline'}
          </button>
        </div>
      </nav>
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
