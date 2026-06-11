import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppStore } from '../store/appStore';
import Head from 'next/head';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const getLinkClass = (path) => router.pathname === path ? 'active' : '';
  const { isOffline, toggleOfflineMode, offlineRequests } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Author: Benadic - Ensure mobile menu closes on route change
  useState(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, []);

  return (
    <>
      <Head>
        {/* Author: Benadic - Setting the main application head properties */}
        <title>RESCUE-MESH | Disaster Response Network</title>
      </Head>
      <nav className="navbar">
        <div className="navbar-top">
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#e5534b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e5534b' }} />
            RESCUE-MESH
          </div>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/" className={getLinkClass('/')} onClick={() => setIsMenuOpen(false)}>Submit SOS</Link>
          <Link href="/status" className={getLinkClass('/status')} onClick={() => setIsMenuOpen(false)}>Check Status</Link>
          <Link href="/dashboard" className={getLinkClass('/dashboard')} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link href="/map" className={getLinkClass('/map')} onClick={() => setIsMenuOpen(false)}>Map View</Link>
        </div>

        <div className={`navbar-controls ${isMenuOpen ? 'open' : ''}`}>
          {isOffline && (
            <span style={{
              color: '#e5534b',
              fontSize: '12px',
              fontWeight: '600',
              padding: '4px 10px',
              background: 'rgba(229, 83, 75, 0.1)',
              borderRadius: '4px',
              border: '1px solid rgba(229, 83, 75, 0.3)'
            }}>
              OFFLINE · {offlineRequests.length} pending
            </span>
          )}
          <button
            onClick={toggleOfflineMode}
            style={{
              padding: '6px 14px',
              background: isOffline ? '#e5534b' : '#46954a',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}
          >
            {isOffline ? 'Sync Online' : 'Go Offline'}
          </button>
        </div>
      </nav>
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
